import { useState } from "react";
import Container from "../components/container/container";
import { MdCameraAlt } from "react-icons/md";
import PopUp from "../components/PopUp";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function User() {
  const [modelOpen, setMdelOpen] = useState(false);
  const { prefs, name, email } = useSelector((state) => state.auth.user);

  const isDp = prefs.profilePhoto
    ? appwriteService.getProfilePreview(prefs.profilePhoto)
    : "/images/defaultProfilePic.png";
  return (
    <div className="w-full">
      <main className="">
        <div className="border-2 border-red-600 max-h-[20rem] h-[20rem] overflow-hidden">
          <img
            src="/images/user-cover.jpg"
            alt="userCover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="-translate-y-32 w-10/12 bg-slate-600 h-[25rem] py-2 px-8 rounded-lg shadow-[0px_3px_21px_3px_black] flex items-center relative justify-center">
            <div className="absolute left-1/2 -top-16 -translate-x-1/2 w-44 h-44 rounded-full border-4 border-slate-400 overflow-hidden bg-slate-300">
              <img
                src={isDp}
                alt="userProfile"
                className="w-full h-full object-cover rounded-full"
              />
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-slate-50 text-[1.5rem] py-1 px-16 bg-black opacity-70 cursor-pointer hover:opacity-100 transition-all duration-300 ease-in-out "
                title="Change Picture"
                onClick={() => setMdelOpen(true)}
              >
                <MdCameraAlt />
                {modelOpen && (
                  <div>
                    <PopUp setMdelOpen={setMdelOpen}></PopUp>
                  </div>
                )}
              </div>
            </div>
            <div className="w-5/6 bg-slate-50 p-4">
              <div>
                <strong>Name :</strong> {name}
              </div>
              <div>
                <strong>Email :</strong> {email}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default User;
