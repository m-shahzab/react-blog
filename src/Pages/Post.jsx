import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "..//components/index";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../reducer/slice/postSlice";
import useGetPosts from "../hooks/useGetPosts";
import { PulseLoader } from "react-spinners";

export default function Post() {
  console.log("post");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const filterPost = useGetPosts(slug);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (filterPost) {
      setPost(filterPost);
    }
    // if (slug) {
    //   appwriteService.getPost(slug).then((post) => {
    //     if (post) setPost(post);
    //     else navigate("/");
    //   });
    //   if (filterPost) setPost(filterPost);
    // } else navigate("/");
  }, [filterPost, navigate, slug]);

  const deleteHa = () => {
    setLoading(true);
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        dispatch(deletePost(post.$id));
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3 mb-2">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deleteHa}>
                {loading ? (
                  <PulseLoader color="cadetblue" loading={loading} />
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          )}
        </div>
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}
