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
                console.log()
                if (dbPost) navigate(`/post/${dbPost.$id}`)
                databaseService.getFilepreview(dbPost.featuredImage)
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
        <form className="flex border-2 rounded-lg border-white-400" onSubmit={handleSubmit(submit)} >
            <div className="w-full text-left m-2 px-6 py-5">
                <Input className="mb-4 w-full rounded-lg text-xl p-1 pl-2 text-black" placeholder='Title' label="Title" {...register("title", { required: true })} />
                <Input className="mb-4 w-full rounded-lg text-xl p-1 text-black" label="Slug" {...register("slug", { required: true })}
                    onInput={() => { setValue("slug", slugTransform(value.title), { shouldValidate: true }) }} />
                <Input className="mb-4 w-full rounded-lg text-xl p-1 pl-2" type="file" label="Featured Image" accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })} />
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                {post && (
                    <div className="w-full mb-4 p-1">
                        <img className="rounded-lg" src={databaseService.getFilepreview(post.featuredImage)} alt={post.title} />
                    </div>
                )}
                <Select className="m-4  p-1 ml-3 rounded-lg text-lg text-black" options={["Active", "Inactive"]}
                    label="status"
                    {...register("status", { required: true })}
                />

                <Button type="submit" className={` bg-blue-500 bgColor={${post} ? " bg-green-500" : ${undefined}} `} >{post ? "Update" : "Submit"}</Button>
            </div>
        </form >
    )

}

export default PostForm