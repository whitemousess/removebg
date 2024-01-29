import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";

import ImageMerge from "~/components/ImageMerge";
import transparentImg from "~/assets/img/transparent.png";

function MoveImage({
  removeImage,
  originalImage,
  remove,
  backgroundImage,
  backgroundColor,
  platform,
  isDownload,
}) {
  const removeRef = useRef(null);
  const backgroundRef = useRef(null);

  const [imageBackground, setImageBackground] = useState(null);
  const [imageRemoveBG, setImageRemoveBG] = useState(null);
  const [isMoveableVisibleRM, setMoveableVisibleRM] = useState(false);
  const [isMoveableVisibleBG, setMoveableVisibleBG] = useState(false);
  const [location, setLocation] = useState({
    remove: { x: 0, y: 0 },
    background: { x: 0, y: 0 },
  });
  const [rotation, setRotation] = useState({ remove: 0, background: 0 });
  const [zoom, setZoom] = useState({
    remove: { width: 0, height: 0 },
    background: { width: 0, height: 0 },
  });
  const [size, setSize] = useState({
    remove: { width: 0, height: 0 },
  });

  useEffect(() => {
    const originalUrl = URL.createObjectURL(originalImage);
    setImageRemoveBG(originalUrl);
    return () => URL.revokeObjectURL(originalUrl);
  }, [originalImage]);

  useEffect(() => {
    if (backgroundImage) {
      const imageUrl = URL.createObjectURL(backgroundImage);
      setImageBackground(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    } else {
      setImageBackground("");
    }
  }, [backgroundImage]);

  const handleLoad = (e) => {
    const imgWidth = e.target.width;
    const imgHeight = e.target.height;
    setSize((pre) => ({
      ...pre,
      background: { width: imgWidth, height: imgHeight },
    }));
  };

  const getDimensions = () => {
    const imgElement = document.getElementById("remove");
    const width = imgElement.width;
    const height = imgElement.height;
    setSize((pre) => ({ ...pre, remove: { width: width, height: height } }));
  };

  const handleFocusRM = () => {
    setMoveableVisibleRM(true);
  };

  const handleBlurRM = () => {
    setMoveableVisibleRM(false);
  };

  const handleFocusBG = () => {
    setMoveableVisibleBG(true);
  };

  const handleBlurBG = () => {
    setMoveableVisibleBG(false);
  };

  return (
    <div>
      <div className="w-full">
        <div
          style={{
            backgroundImage: `url(${transparentImg})`,
            backgroundRepeat: "repeat",
            overflow: "hidden",
            width:
              platform == "true" ? size.remove.width : size.remove.width * 0.6,
            height: platform == "true" ? 500 : 500 * 0.6,
            border: "1px solid #333",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              transform: platform == "true" ? "scale(1)" : `scale(0.6)`,
            }}
          >
            <img
              id="background"
              ref={backgroundRef}
              src={imageBackground}
              className="target"
              onLoad={handleLoad}
              style={{
                width: "auto",
                height: 500,
                overflow: "hidden",
                cursor: "pointer",
                userSelect: "none",
                position: "absolute",
              }}
              onFocus={handleFocusBG}
              onBlur={handleBlurBG}
              tabIndex="0"
            />
          </div>

          {isMoveableVisibleBG && (
            <Moveable
              target={backgroundRef}
              draggable={true}
              resizable={true}
              rotationPosition={"top"}
              rotatable={true}
              renderDirections={["nw", "ne", "sw", "se"]}
              onDrag={(e) => {
                e.target.style.transform = e.transform;
                setLocation({
                  ...location,
                  background: { x: e.translate[0], y: e.translate[1] },
                });
              }}
              onRotate={(e) => {
                e.target.style.transform = e.drag.transform;
                setRotation({
                  ...rotation,
                  background: e.rotation,
                });
              }}
              onResize={(e) => {
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = e.drag.transform;
                setZoom({
                  ...zoom,
                  background: {
                    width: e.offsetWidth,
                    height: e.offsetHeight,
                  },
                });
                const transformValue = e.target.style.transform;
                const regex = /-?\d+(\.\d+)?/g;
                const matches = transformValue.match(regex);
                setLocation({
                  ...location,
                  background: {
                    x: parseInt(matches[0]),
                    y: parseInt(matches[1]),
                  },
                });
              }}
            />
          )}

          {backgroundColor && (
            <div
              className={` absolute top-0 left-0 right-0 bottom-0`}
              style={{ backgroundColor: backgroundColor }}
            ></div>
          )}

          <div
            style={{
              position: "absolute",
              transform: platform == "true" ? "scale(1)" : `scale(0.6)`,
            }}
          >
            <img
              ref={removeRef}
              src={removeImage}
              className="target"
              style={{
                width: "auto",
                height: 500,
                overflow: "hidden",
                cursor: "pointer",
                position: "absolute",
                userSelect: "none",
              }}
              onFocus={handleFocusRM}
              onBlur={handleBlurRM}
              tabIndex="0"
            />
          </div>

          {isMoveableVisibleRM && (
            <Moveable
              target={removeRef}
              draggable={true}
              resizable={true}
              keepRatio={false}
              rotationPosition={"top"}
              rotatable={true}
              renderDirections={["nw", "ne", "sw", "se"]}
              onDrag={(e) => {
                e.target.style.transform = e.transform;
                setLocation({
                  ...location,
                  remove: { x: e.translate[0], y: e.translate[1] },
                });
              }}
              onRotate={(e) => {
                e.target.style.transform = e.drag.transform;
                setRotation({ ...rotation, remove: e.rotation });
              }}
              onResize={(e) => {
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = e.drag.transform;
                setZoom({
                  ...zoom,
                  remove: {
                    width: e.width,
                    height: e.height,
                  },
                });

                const transformValue = e.target.style.transform;
                const regex = /-?\d+(\.\d+)?/g;
                const matches = transformValue.match(regex);
                setLocation({
                  ...location,
                  remove: {
                    x: parseInt(matches[0]),
                    y: parseInt(matches[1]),
                  },
                });
              }}
            />
          )}

          {!removeImage && (
            <div
              style={{
                position: "absolute",
                transform: platform == "true" ? "scale(1)" : `scale(0.6)`,
              }}
            >
              <img
                id="remove"
                src={imageRemoveBG}
                onLoad={getDimensions}
                style={{
                  width: "auto",
                  height: 500,
                  userSelect: "none",
                  position: "absolute",
                }}
              />
            </div>
          )}

          {!remove && (
            <div
              style={{
                position: "absolute",
                transform: platform == "true" ? "scale(1)" : `scale(0.6)`,
              }}
            >
              <img
                id="remove"
                src={imageRemoveBG}
                onLoad={getDimensions}
                style={{
                  width: "auto",
                  height: 500,
                  userSelect: "none",
                  position: "absolute",
                }}
              />
            </div>
          )}
        </div>
        <ImageMerge
          isDownload={isDownload}
          location={location}
          rotation={rotation}
          zoom={zoom}
          size={size}
          removeImage={removeImage}
          imageBackground={imageBackground}
          backgroundColor={backgroundColor}
        />
      </div>
    </div>
  );
}

MoveImage.propTypes = {
  removeImage: PropTypes.string,
  originalImage: PropTypes.object,
  remove: PropTypes.bool,
  backgroundImage: PropTypes.object,
  backgroundColor: PropTypes.string,
  platform: PropTypes.string,
};

export default MoveImage;
