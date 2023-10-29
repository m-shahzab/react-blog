import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../reducer/slice/authSlice";
import { emptyPost } from "../../reducer/slice/postSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutH = () => {
    authService.logout().then(() => {
      dispatch(logout());
      dispatch(emptyPost());
      navigate(0);
    });
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutH}
    >
      LogoutBtn
    </button>
  );
}

export default LogoutBtn;
