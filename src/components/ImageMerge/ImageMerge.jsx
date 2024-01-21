import PropTypes from "prop-types";
import { useRef } from "react";
import { CiSaveDown2 } from "react-icons/ci";

function ImageMerge({
  location,
  rotation,
  zoom,
  removeImage,
  imageBackground,
  backgroundColor,
}) {
  const canvasRef = useRef(null);

  const download = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image1Path = imageBackground;
    const image2Path = removeImage;

    const image1 = new Image();
    const image2 = new Image();

    image1.setAttribute("crossorigin", "anonymous");
    image2.setAttribute("crossorigin", "anonymous");
    image1.src = image1Path;
    image2.src = image2Path;

    image2.onload = () => {
      const ratioHeightRM = image2.height / 500;
      const ratioWidthRM =
        image2.width / (500 * (image2.width / image2.height));

      const x1 = location.background.x * ratioWidthRM || 0;
      const y1 = location.background.y * ratioHeightRM || 0;
      const w1 =
        zoom.background.width * ratioWidthRM ||
        ratioWidthRM * (500 * (image1.width / image1.height));
      const h1 =
        ((zoom.background.height * (image1.height / 500)) /
          (image1.height / 500)) *
          ratioHeightRM || 500 * ratioHeightRM;

      const x2 = location.remove.x * ratioWidthRM || 0;
      const y2 = location.remove.y * ratioHeightRM || 0;
      const w2 =
        zoom.remove.width * ratioWidthRM ||
        ratioWidthRM * (500 * (image2.width / image2.height));
      const h2 =
        ((zoom.remove.height * (image2.height / 500)) / (image2.height / 500)) *
          ratioHeightRM || 500 * ratioHeightRM;

      canvas.width = image2.width;
      canvas.height = image2.height;

      if (imageBackground) {
        context.save();
        context.translate(x1 + w1 / 2, y1 + h1 / 2);
        context.rotate((Math.PI / 180) * rotation.background);
        context.drawImage(image1, -w1 / 2, -h1 / 2, w1, h1);
        context.restore();
      }

      if (backgroundColor) {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.save();
      context.translate(x2 + w2 / 2, y2 + h2 / 2);
      context.rotate((Math.PI / 180) * rotation.remove);
      context.drawImage(image2, -w2 / 2, -h2 / 2, w2, h2);
      context.restore();
    };
    setTimeout(() => {
      const mergedImageURL = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = mergedImageURL;
      downloadLink.download = "merged_image.png";
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }, 100);
  };

  return (
    <div className="fixed right-10 bottom-10">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button
        onClick={download}
        className="w-[100px] h-[100px] border-none rounded-full bg-green-300 hover:bg-green-600 flex flex-col justify-center items-center cursor-pointer"
      >
        FullHD
        <CiSaveDown2 size={32} />
      </button>
    </div>
  );
}

ImageMerge.propTypes = {
  location: PropTypes.object,
  rotation: PropTypes.object,
  zoom: PropTypes.object,
  size: PropTypes.object,
  removeImage: PropTypes.string,
  imageBackground: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default ImageMerge;
