import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import useGetPosts from "../hooks/useGetPosts";

function AllPosts() {
  console.log("all post");
  const posts = useGetPosts();
  // useEffect(() => {
  // appwriteService.getPosts([]).then((post) => {
  //   if (post) setPosts(post.documents);
  // });
  // }, []);

  if (posts.length === 0) {
    return (
      <div className="py-8 w-full">
        <Container>
          <p className="text-center text-2xl p-[11rem]">No posts found</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div cclassName="">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
