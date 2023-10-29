import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import DpSelect from "./DpSelect";
import { Button } from "../components/index";
import appwriteService from "../appwrite/config";
import appwriteAuth from "../appwrite/auth";
import { updateAuth } from "../reducer/slice/authSlice";
import { useDispatch } from "react-redux";

function PopUp({ setMdelOpen }) {
  const [img, setImg] = useState(null);
  let [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  function closeModal() {
    setIsOpen(false);
    setMdelOpen(false);
  }
  const imgU = async () => {
    if (img) {
      const file = await appwriteService.profileUpload(img.img);
      if (file) {
        const as = await appwriteAuth.updateUser({ profilePhoto: file.$id });
        dispatch(updateAuth(as));
        setMdelOpen(false);
        console.log("profile uploaded on server");
      }
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center bg-black/[.54]">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-gray-500">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Upload Profile Picture
                  </Dialog.Title>
                  <div>
                    <DpSelect img={img} setImg={setImg}></DpSelect>
                  </div>

                  <div className="mt-4">
                    <Button onClick={closeModal} className="mr-2">
                      Cancel
                    </Button>
                    <Button onClick={imgU}>Save</Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default PopUp;
