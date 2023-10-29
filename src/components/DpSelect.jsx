import { MdCloudUpload } from "react-icons/md";

function DpSelect({ img, setImg }) {
  const inputH = (e) => {
    console.log(e.target.files);
    // setImg(URL.createObjectURL(e.target.files[0]));
    setImg({
      img: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center py-4">
        <input
          id="input-file"
          className="w-0 h-0"
          aria-hidden="true"
          type="file"
          onChange={inputH}
        />
        <label htmlFor="input-file" className="cursor-pointer text-2xl">
          <MdCloudUpload />
          <span className="">Upload</span>
        </label>
      </div>
      {img && <img src={img.url} alt="" />}
    </div>
  );
}

export default DpSelect;
