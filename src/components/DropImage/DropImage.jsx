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
    <div className="w-full flex justify-center">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive && platform == "true" && (
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
          className=" mt-20 flex flex-row justify-center items-center h-[52px] md:w-[200px] w-[200px]
          text-2xl font-bold my-4 rounded-full bg-gradient-to-r-from-[#01dbaf]-to-[#002fe9] cursor-pointer"
        >
          <MdOutlineFileUpload size={30} />
          {lang.titleButtonUpload}
        </div>
        <div className="text-xl">
          {platform == "true" && lang.titleDropImage.Click}
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
