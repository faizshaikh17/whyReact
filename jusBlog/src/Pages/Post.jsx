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
        <div className="py-8">
            <div className="w-full flex justify-center mb-4 relative  rounded-xl p-2">
                <img
                    src={databaseService.getFilepreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl w-2/3 border"
                />

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button className="mr-3 bg-green-500">
                                Edit
                            </Button>
                        </Link>
                        <Button className="mr-3 bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-4">
                <h1 className="text-xl text-[#FCFCFF] font-bold">{post.title}</h1>
            </div>
            <div className="browser-css text-base text-[#FCFCFF]">
                {parse(post.content)}
            </div>
        </div>
    ) : null;
}