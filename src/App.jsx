import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import appwriteService from "./appwrite/config";
import { login, logout } from "./reducer/slice/authSlice";
import { uploadPost } from "./reducer/slice/postSlice";
import { Footer, Header } from "./components/";
import { Outlet } from "react-router-dom";
import useFetchPost from "./hooks/useFetchPost";
import Loader from "./components/Loader";

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const fetchPosts = useFetchPost();

  const isLogin = async () => {
    const acc = await authService.getCurrentUser();
    if (acc) {
      dispatch(login(acc));
      fetchPosts();
    } else {
      dispatch(logout());
    }
    setLoading(false);
  };
  // const fetchPosts = async () => {
  //   appwriteService.getPosts().then((posts) => {
  //     if (posts.documents.length !== 0) {
  //       posts.documents.map((post) => {
  //         dispatch(uploadPost(post));
  //       });
  //     }
  //   });
  // };
  useEffect(() => {
    isLogin();
  }, []);

  return (
    <div className="bg-slate-700">
      {!loading ? (
        <div>
          <Header></Header>
          <Outlet />
          <Footer></Footer>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
