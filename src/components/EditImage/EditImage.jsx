import { useState } from "react";
import PropTypes from "prop-types";
import { LuEraser, LuUserSquare } from "react-icons/lu";

import lang from "~/assets/language";
import Loading from "~/components/Loading";
import MoveImage from "../MoveImage";

function EditImage({ removeImage, originalImage, loading ,platform}) {
  const [remove, setRemove] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [listBackgroundImage, setListBackgroundImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageList = (e) => {
    setBackgroundImage(e.target.files[0]);
    setListBackgroundImage((prev) => [...prev, e.target.files[0]]);
  };

  const handleImageClick = (index, image) => {
    setSelectedImage(index);
    setBackgroundImage(image);
  };

  return (
    <div className="min-h-[100vh] w-full flex items-center bg-neutral-200 relative">
      <div className="flex flex-col w-full 2xl:h-full rounded-xl mx-4 py-10 2xl:mx-52 bg-white">
        <div className="w-full flex justify-center items-start">
          <div className="flex border w-[342px] h-16 rounded-full bg-gray-200 my-10">
            <button
              onClick={() => setRemove(false)}
              className={`text-2xl px-10 rounded-full flex items-center ${
                !remove ? "bg-gray-800 text-white" : ""
              }`}
            >
              <LuUserSquare className="mr-2" size={20} />
              {lang.titleBtnOriginal}
            </button>
            <button
              onClick={() => setRemove(true)}
              className={`text-2xl px-10 rounded-full flex items-center ${
                remove ? "bg-gray-800 text-white" : ""
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
            />
          </div>
          <div className="w-full 2xl:w-1/2 m-6">
            <div className="flex justify-center w-full">
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
                    : null,
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
                  backgroundImage: "url('/src/assets/img/transparent.png')",
                }}
                onClick={() => setBackgroundColor(null)}
              ></button>
            </div>

            <div className="flex mt-6">
              <label htmlFor="BG">
                <p className="w-full h-full flex justify-center items-center p-5 bg-green-200 rounded-3xl text-2xl font-semibold">
                  {lang.titleButtonUpload}
                </p>
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
                  backgroundImage: "url('/src/assets/img/transparent.png')",
                  backgroundRepeat: "repeat",
                  cursor: "pointer",
                  borderRadius: 10
                }}
                onClick={() => {
                  setBackgroundImage(null);
                  handleImageClick("");
                }}
              ></span>
              {listBackgroundImage &&
                listBackgroundImage.map((image, index) => {
                  const convertURL = URL.createObjectURL(image);
                  return (
                    <img
                      key={index}
                      src={convertURL}
                      alt={`Image ${index + 1}`}
                      onClick={() => {
                        handleImageClick(index, image);
                        setBackgroundColor(null);
                      }}
                      className="w-40 h-40 object-top object-cover mx-4 rounded-2xl"
                      style={{
                        border:
                          selectedImage === index ? "2px solid green" : "none",
                        cursor: "pointer",
                      }}
                    />
                  );
                })}
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
  platform: PropTypes.string
};

export default EditImage;
