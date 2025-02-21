import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import databaseService from '../../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
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
    const { userData } = useSelector((state) => state.auth)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null
            const fileId = file.$id

            if (file) {
                await databaseService.deleteFile(fileId)
            }
            console.log(post)
            const dbPost = await databaseService.updatePost(post.$id, { ...data, featuredImage: fileId ? fileId : undefined });
            console.log(dbPost)
            if (dbPost) navigate(`/post/${dbPost.$id}`)


        }
        else {
            const file = await databaseService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                console.log(userData)
                const dbPost = await databaseService.createPost({ ...data, userid: userData.$id })
                if (dbPost) navigate(`/post/${dbPost.$id}`)
                databaseService.getFilePreview(dbPost.featuredImage)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d]+/g, "-").slice(0, 30)

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
        <form className="flex border-[0.01rem] border-white-400 gap-5 text-[#FCFCFF]" onSubmit={handleSubmit(submit)} >
            <div className="w-full text-left m-2 px-6 py-5">
                <Input className="mb-4 w-full rounded-lg text-xl p-1 pl-2 text-black" placeholder='Title' label="Title" {...register("title", { required: true })} />
                <Input className="mb-4 w-full rounded-lg text-xl p-1 text-black" label="Slug" {...register("slug", { required: true })}
                    onInput={() => { setValue("slug", slugTransform(value.title), { shouldValidate: true }) }} />
                <Input className="mb-4 w-full rounded-lg text-xl p-1 pl-2" type="file" label="Featured Image" accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })} />
                {post && (
                    <div className="w-2/3 text-center h-96 mb-4 p-1">
                        <img className="rounded-lg" src={databaseService.getFilePreview(post.featuredImage)} alt={post.title} />
                    </div>
                )}
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                <Select className="m-4  p-1 ml-3 rounded-lg text-lg text-black" options={["Active", "Inactive"]}
                    label="status"
                    {...register("status", { required: true })}
                />

                <Button type="submit" onclick={() => { console.log(17) }} className={` right-[100] text-base active:bg-blue-200 bg-blue-500 bgColor={${post} ? " bg-green-500" : ${undefined}}`} >{post ? "Update" : "Submit"}</Button>
            </div>
        </form >
    )

}

export default PostForm