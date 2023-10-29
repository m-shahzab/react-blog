import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteservice from "../appwrite/config";
import { Container } from "../components/index";
import { PostForm } from "../components/index";
import useGetPosts from "../hooks/useGetPosts";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const filterPost = useGetPosts(slug);
  useEffect(() => {
    if (slug && filterPost) {
      setPost(filterPost);
      // appwriteservice.getPost(slug).then((post) => {
      //   if (post) {
      //     setPost(post);
      //   } else {
      //     navigate("/");
      //   }
      // });
    }
  }, [slug, navigate, filterPost]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
