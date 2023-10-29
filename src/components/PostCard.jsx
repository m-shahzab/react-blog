import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  console.log("postcard");
  // const {  } = post;
  // <img
  //                 role="presentation"
  //                 className="object-cover w-full rounded h-44 dark:bg-gray-500"
  //                 src="https://source.unsplash.com/random/480x360?1"
  //               />
  //               <div className="p-6 space-y-2">
  //                 <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
  //                   In usu laoreet repudiare legendos
  //                 </h3>
  //                 <span className="text-xs dark:text-gray-400">
  //                   January 21, 2021
  //                 </span>
  //                 <p>
  //                   Mei ex aliquid eleifend forensibus, quo ad dicta apeirian
  //                   neglegentur, ex has tantas percipit perfecto. At per tempor
  //                   albucius perfecto, ei probatus consulatu patrioque mea, ei
  //                   vocent delicata indoctum pri.
  //                 </p>
  //               </div>
  return (
    <Link to={`post/${$id}`} className="group max-w-sm mx-auto block">
      <img
        role="presentation"
        className="object-cover w-full rounded-t-lg h-44 dark:bg-gray-500"
        src={appwriteService.getFilePreview(featuredImage)}
      />
      <div className="rounded-b-lg p-6 space-y-2 dark:bg-gray-900 bg-gray-900 dark:text-gray-100">
        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {title}
        </h3>
        <span className="text-xs dark:text-gray-400">January 21, 2021</span>
        <p>
          Mei ex aliquid eleifend forensibus, quo ad dicta apeirian
          neglegentur...
        </p>
      </div>
    </Link>
  );
}

// <Link to={`post/${$id}`}>
//   <div className="w-full bg-gray-100 rounded-xl p-4">
//     <div className="w-full justify-center mb-4">
//       <img
//         src={appwriteService.getFilePreview(featuredImage)}
//         alt={title}
//         className="rounded-xl"
//       />
//     </div>

//     <h2 className="text-xl font-bold">{title}</h2>
//   </div>
// </Link>
export default PostCard;
