import { useDispatch } from "react-redux";
import appwriteService from "../appwrite/config";
import { uploadPost } from "../reducer/slice/postSlice";

function useFetchPost() {
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    appwriteService.getPosts().then((posts) => {
      if (posts.documents.length !== 0) {
        posts.documents.map((post) => {
          dispatch(uploadPost(post));
        });
      }
    });
  };

  return fetchPosts;
}

export default useFetchPost;
