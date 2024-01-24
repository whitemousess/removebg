import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import lang from "~/assets/language.js";

function DropImage({ onDrop }) {
  const platform = localStorage.getItem("window");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  return (
    <div className="w-full flex justify-center items-center">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive && platform === "true" && (
          <div
            className="
              w-full 
              flex
              justify-center
              items-center
              absolute
              top-0
              bottom-0
              left-0
              right-0
              bg-neutral-500/[.5]
              text-white
              text-4xl
              font-bold
                "
          >
            {lang.titleDropImage.Move}
          </div>
        )}
        <div
          className="my-10 flex flex-col justify-center items-center md:w-[200px] w-[200px]
          text-2xl font-bold rounded-full cursor-pointer "
        >
          <MdOutlineFileUpload size={64} />
          <div className=" text-white bg-[#471aff] py-5 px-10 rounded-2xl">
            {lang.titleButtonUpload}
          </div>
        </div>
        <div className="text-xl">
          {platform === "true" && lang.titleDropImage.Click}
        </div>
      </div>
    </div>
  );
}

DropImage.propTypes = {
  onDrop: PropTypes.func,
  images: PropTypes.string,
  platform: PropTypes.bool,
};

export default DropImage;
