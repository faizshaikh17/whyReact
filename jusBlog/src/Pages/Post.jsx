import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                databaseService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };


    return post ? (
        <div className=" w-full flex-col py-8">
            <div className="w-full flex justify-center mb-4 relative p-2">
                <div className="w-2/3 text-center h-96"
                // style={{
                //     backgroundImage: `url(${post.featuredImage})`,
                //     backgroundRepeat: "no-repeat",
                //     backgroundSize: "cover",
                //     backgroundPosition: "center",
                //     boxSizing: "border-box",
                // }}
                >
                    {post && post.featuredImage && (
                        <div className="w-[90%] text-[#FCFCFF] mb-4 p-1">
                            <img className=" rounded-lg" src={databaseService.getFilePreview(post.featuredImage)} alt={post.title} />
                        </div>
                    )}
                </div>
            </div>

            {isAuthor && (
                <div className="flex justify-between px-10 relative items-center">
                    <div className="text-[#FCFCFF]">By:Faiz</div>
                    <div className="">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button className=" bg-slate-50">
                                Edit
                            </Button>
                        </Link>
                        <Button className=" bg-slate-50" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                </div>
            )}
            <div className="w-full pt-10 px-10 mb-4">
                <h1 className="text-xl text-[#FCFCFF] font-bold">{post.title}</h1>
            </div>
            <div className="w-full pt-4 px-10 text-base text-[#FCFCFF]">
                <p>{parse(post.content)}</p>
            </div>
        </div>
    ) : null;
}