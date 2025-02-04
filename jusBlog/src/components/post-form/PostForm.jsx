import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import databaseService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { Input, Select, Button, RTE } from '../index'


function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || ""
        }
    })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null
            if (file) {
                await databaseService.deleteFile(post.featuredImage)
            }
            const dbPost = await databaseService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined });
            if (dbPost) navigate(`/post/${dbPost.$id}`)
        }
        else {
            const file = await databaseService.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId
                const dbPost = await databaseService.createPost({ ...data, userid: userData.$id })
                console.log(userData)
                if (dbPost) navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d]+/g, "-")

        return ""

    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe()
    }
        , [watch, setValue, slugTransform])


    return (
        <form className="flex flex-wrap" onSubmit={handleSubmit(submit)} >
            <div className="w-2/3 px-2">
                <Input className="mb-4" placeholder='Title' label="Title :" {...register("title", { required: true })} />
                <Input className="mb-4" placeholder='Slug' label="Slug :" {...register("slug", { required: true })}
                    onInput={() => { setValue("slug", slugTransform(value.title), { shouldValidate: true }) }} />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input className="mb-4" type="file" label="Featured Image :" accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })} />
                {post && (
                    <div className="w-full mb-4">
                        <img className="rounded-lg" src={databaseService.getFilePreview(post.featuredImage)} alt={post.title} />
                    </div>
                )}
                <Select className="mb-4" options={["active", "inactive"]}
                    label="status"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" >{post ? "Update" : "Submit"}</Button>
            </div>
        </form>
    )

}

export default PostForm