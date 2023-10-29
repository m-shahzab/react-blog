import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useGetPosts(slug) {
  const postSlice = useSelector((state) => state.posts.post);
  const [post, setPost] = useState(postSlice);
  useEffect(() => {
    setPost(postSlice);
  }, [slug, postSlice]);

  if (slug && post) {
    const filterPost = post.filter((post) => post.$id === slug);
    return filterPost[0];
  } else {
    return post;
  }
}

export default useGetPosts;
