import { useState } from "react";
import PropTypes from "prop-types";
import { LuEraser, LuUserSquare } from "react-icons/lu";
import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import { CiSaveDown2 } from "react-icons/ci";

import lang from "~/assets/language";
import Loading from "~/components/Loading";
import MoveImage from "../MoveImage";
import transparentImg from "~/assets/img/transparent.png";

function EditImage({ removeImage, originalImage, loading, platform }) {
  const [remove, setRemove] = useState(true);
  const [isDownload, setIsDownload] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [listBackgroundImage, setListBackgroundImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [toggleEdit, setToggleEdit] = useState(false);
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
            {!toggleEdit ? (
              <>
                <div className="w-full">
                  <p className="text-xl font-bold">{lang.titleEdit}</p>
                  <div className="flex ml-10 my-4">
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
                    <button
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 9999,
                        border: "none",
                        cursor: "pointer",
                        margin: 4,
                        backgroundImage: `url(${transparentImg})`,
                      }}
                    ></button>
                  </div>
                </div>
                <div className="flex justify-center text-blue-500">
                  <span
                    className="text-2xl py-2 px-4 cursor-pointer border-0 border-b-2 border-blue-500 border-dashed"
                    onClick={() => setToggleEdit(!toggleEdit)}
                  >
                    {lang.buttonEdit}
                  </span>
                </div>
                <div className="w-full flex justify-center mt-5">
                  <span
                    className="lg:w-[200px] font-bold w-full rounded-2xl cursor-pointer flex justify-center items-center px-6 py-4 border shadow shadow-[#0159ec] hover:shadow-inner"
                    onClick={onDownload}
                  >
                    <CiSaveDown2 size={32} className="mr-2" />
                    {lang.buttonDownload}
                  </span>
                </div>
              </>
            ) : (
              <>
                <span
                  className="inline-flex cursor-pointer rounded-full shadow-lg hover:shadow-inner p-4"
                  onClick={() => setToggleEdit(!toggleEdit)}
                >
                  <IoMdArrowRoundBack size={24} />
                </span>

                <div className=" flex justify-center md:justify-start">
                  <div className="flex border h-16 rounded-full bg-gray-200 my-10">
                    <button
                      onClick={() => setToggleEditColor(true)}
                      className={`text-2xl px-10 border-none rounded-full flex items-center cursor-pointer ${
                        toggleEditColor
                          ? "bg-gray-800 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {lang.buttonImg}
                    </button>
                    <button
                      onClick={() => setToggleEditColor(false)}
                      className={`text-2xl px-10 border-none rounded-full flex items-center cursor-pointer ${
                        !toggleEditColor
                          ? "bg-gray-800 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {lang.buttonColor}
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
                    <span
                      style={{
                        width: "10rem",
                        height: "10rem",
                        marginLeft: "1rem",
                        marginRight: "1rem",
                        backgroundImage: `url(${transparentImg})`,
                        backgroundRepeat: "repeat",
                        cursor: "pointer",
                        borderRadius: 10,
                      }}
                      onClick={transparent}
                    ></span>
                    {listBackgroundImage &&
                      listBackgroundImage.map((image, index) => {
                        const convertURL = URL.createObjectURL(image);
                        return (
                          <div
                            key={index}
                            className="my-2 mx-4 rounded-2xl overflow-hidden"
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
                  <div className="flex ml-10 my-4">
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
                    <button
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 9999,
                        border: "none",
                        cursor: "pointer",
                        margin: 4,
                        backgroundImage: `url(${transparentImg})`,
                      }}
                      onClick={transparent}
                    ></button>
                  </div>
                )}
              </>
            )}
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
};

export default EditImage;
