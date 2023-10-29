import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  console.log("home");
  const { post: postSlice } = useSelector((state) => state.posts);
  const [post, setPost] = useState([]);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (postSlice) {
      setPost(postSlice);
    }
  }, [postSlice]);
  if (status && post.length === 0) {
    return (
      <div className="py-8 w-full">
        <Container>
          <p className="text-center text-2xl p-[11rem]">No posts found</p>
        </Container>
      </div>
    );
  }
  console.log("post :::", post);
  return (
    <div className="py-8 w-full">
      <Container>
        {post.length === 0 ? (
          <p className="text-center text-2xl p-[11rem]">Login to read posts</p>
        ) : (
          <div className="space-y-6 sm:space-y-12">
            <Link
              to={`post/${post[0].$id}`}
              rel="noopener noreferrer"
              className="block mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12  dark:text-gray-100"
            >
              <img
                src={appwriteService.getFilePreview(post[0].featuredImage)}
                alt=""
                className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
              />
              <div className="p-6 space-y-2 lg:col-span-5 dark:bg-gray-900">
                <h3 className="text-2xl font-semibold sm:text-4xl hover:underline ">
                  {post[0].title}
                </h3>
                <span className="text-xs dark:text-gray-400">
                  February 19, 2021
                </span>
                <p>
                  Ei delenit sensibus liberavisse pri. Quod suscipit no nam. Est
                  in graece fuisset, eos affert putent doctus id.
                </p>
              </div>
            </Link>
            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {post.map((post) => (
                <div className="rounded-xl" key={post.$id}>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
