import { useState } from "react";
import PropTypes from "prop-types";
import { LuEraser, LuUserSquare } from "react-icons/lu";
import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";

import lang from "~/assets/language";
import Loading from "~/components/Loading";
import MoveImage from "../MoveImage";
import transparentImg from "~/assets/img/transparent.png";

const COLOR_DEFAULT = [
  "#000",
  "#FF5733",
  "#3498db",
  "#e74c3c",
  "#2ecc71",
  "#f39c12",
  "#9b59b6",
];

function EditImage({
  removeImage,
  originalImage,
  loading,
  platform,
  onChangeImage,
}) {
  const [remove, setRemove] = useState(true);
  const [isDownload, setIsDownload] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [listBackgroundImage, setListBackgroundImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [toggleEditColor, setToggleEditColor] = useState(true);

  const handleImageList = (e) => {
    if (e.target.files.length > 0) {
      setBackgroundImage(e.target.files[0]);
      setBackgroundColor(null);
      setListBackgroundImage((prev) => [...prev, e.target.files[0]]);
    }
  };

  const handleImageClick = (index, image) => {
    setSelectedImage(index);
    setBackgroundImage(image);
    setBackgroundColor(null);
  };

  const transparent = () => {
    setBackgroundColor(null);
    setBackgroundImage(null);
  };

  const onDownload = () => {
    setIsDownload(true);
    setTimeout(() => {
      setIsDownload(false);
    }, 0);
  };

  return (
    <div className="min-h-[100vh] w-full flex items-center bg-neutral-200">
      <div className="flex flex-col w-full 2xl:h-full rounded-xl mx-4 py-10 2xl:mx-52 bg-white relative">
        <div className="w-full flex justify-center items-start">
          <div className="flex border h-16 rounded-full bg-gray-200 my-10">
            <button
              onClick={() => setRemove(false)}
              className={`text-2xl px-10 border-none cursor-pointer rounded-full flex items-center ${
                !remove ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              <LuUserSquare className="mr-2" size={20} />
              {lang.titleBtnOriginal}
            </button>
            <button
              onClick={() => setRemove(true)}
              className={`text-2xl px-10 border-none cursor-pointer rounded-full flex items-center ${
                remove ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              <LuEraser className="mr-2" size={20} />
              {lang.titleBtnRemove}
            </button>
          </div>
        </div>

        <div className="flex 2xl:flex-row flex-col">
          <div className="flex justify-center items-center 2xl:w-1/2">
            <MoveImage
              removeImage={removeImage}
              originalImage={originalImage}
              remove={remove}
              backgroundImage={backgroundImage}
              backgroundColor={backgroundColor}
              platform={platform}
              isDownload={isDownload}
            />
          </div>
          <div className="2xl:w-1/2 m-6">
            <div className=" flex justify-center items-center md:justify-start">
              <div className="flex border h-16 rounded-full bg-gray-200 my-10">
                <button
                  onClick={() => setToggleEditColor(true)}
                  className={`text-2xl px-10 border-none rounded-full flex items-center cursor-pointer ${
                    toggleEditColor ? "bg-gray-800 text-white" : "bg-gray-200"
                  }`}
                >
                  {lang.buttonImg}
                </button>
                <button
                  onClick={() => setToggleEditColor(false)}
                  className={`text-2xl px-10 border-none rounded-full flex items-center cursor-pointer ${
                    !toggleEditColor ? "bg-gray-800 text-white" : "bg-gray-200"
                  }`}
                >
                  {lang.buttonColor}
                </button>
                <button
                  className="w-[60px] h-[40px] rounded-full cursor-pointer border bg-gray-200"
                  onClick={transparent}
                >
                  {lang.buttonClear}
                </button>
              </div>
            </div>

            {toggleEditColor ? (
              <div className="flex flex-wrap my-6">
                <label htmlFor="BG">
                  <span className="w-[10rem] h-[10rem] mx-4 flex justify-center items-center p-5 shadow-lg hover:shadow-inner rounded-3xl text-2xl font-semibold cursor-pointer">
                    <IoMdAdd size={30} />
                  </span>
                </label>
                <input
                  id="BG"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    handleImageList(e);
                  }}
                />
                {listBackgroundImage &&
                  listBackgroundImage.map((image, index) => {
                    const convertURL = URL.createObjectURL(image);
                    return (
                      <div
                        key={index}
                        className="mx-4 rounded-2xl overflow-hidden"
                      >
                        <img
                          src={convertURL}
                          alt={`Image ${index + 1}`}
                          onClick={() => {
                            handleImageClick(index, image);
                            setBackgroundColor(null);
                          }}
                          className="w-40 h-40 object-top object-cover"
                          style={{
                            border:
                              selectedImage === index
                                ? "2px solid green"
                                : "none",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="flex flex-wrap w-[200px] ml-4">
                <label
                  htmlFor="color"
                  style={{
                    width: 40,
                    height: 40,
                    cursor: "pointer",
                    borderRadius: 9999,
                    margin: 4,
                    border: "1px solid #333",
                    background: !backgroundColor
                      ? "conic-gradient(from 180deg at 50% 50%,#ff7a00 0deg,#fff500 61.87deg,#0eed82 123.75deg,#06f 179.22deg,#bd00ff 243.75deg,red 309.38deg,#ff7a00 1turn)"
                      : backgroundColor,
                  }}
                >
                  <input
                    id="color"
                    type="color"
                    style={{
                      opacity: 0,
                      width: 0,
                      height: 0,
                    }}
                    onChange={(e) => {
                      setBackgroundColor(e.target.value);
                      setBackgroundImage(null);
                    }}
                  />
                </label>
                {COLOR_DEFAULT.map((color) => (
                  <span
                    key={color}
                    className={`w-[40px] h-[40px] cursor-pointer rounded-full m-[4px] border border-gray-600`}
                    style={{ background: color }}
                    onClick={() => {
                      setBackgroundColor(color);
                      setBackgroundImage(null);
                    }}
                  ></span>
                ))}
              </div>
            )}
            <div className="w-full flex justify-center mt-5">
              <span
                className="lg:w-[200px] font-bold w-full rounded-2xl cursor-pointer flex justify-center items-center px-6 py-4 border shadow shadow-[#0159ec] hover:shadow-inner"
                onClick={onDownload}
              >
                <CiSaveDown2 size={32} className="mr-2" />
                {lang.buttonDownload}
              </span>
            </div>

            <div className="w-full flex justify-center mt-5">
              <label htmlFor="changeImg">
                <span className="lg:w-[200px] font-bold w-full rounded-2xl cursor-pointer flex justify-center items-center px-6 py-4 border shadow shadow-[#0159ec] hover:shadow-inner">
                  <MdOutlineFileUpload size={32} className="mr-2" />
                  {lang.buttonChangeImg}
                </span>
              </label>
              <input
                type="file"
                className="hidden"
                id="changeImg"
                accept="image/*"
                onChange={(e) => onChangeImage(e)}
              />
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </div>
  );
}

EditImage.propTypes = {
  removeImage: PropTypes.string,
  originalImage: PropTypes.object,
  loading: PropTypes.bool,
  platform: PropTypes.string,
  onChangeImage: PropTypes.func,
};

export default EditImage;
