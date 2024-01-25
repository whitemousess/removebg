import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import removeBackground from "@imgly/background-removal";
import EditImage from "~/components/EditImage";

function Upload() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrl = location?.state?.imageUrl;
  const platform = localStorage.getItem("window");
  const [removeImg, setRemoveImg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (platform === "true") {
          const response = await removeBackground(imageUrl, {
            mode: "no-cors",
          });
          if (response) {
            const imgUrl = URL.createObjectURL(response);
            setRemoveImg(imgUrl);
            setLoading(false);
          }
        } else {
          const formData = new FormData();
          formData.append("image", imageUrl);
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}remove-background/create-image`,
            formData
          );
          if (response) {
            setRemoveImg(`data:image/png;base64,${response.data}`);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [imageUrl, platform]);

  const onChangeImage = (e) => {
    navigate("/upload", {
      state: { imageUrl: e.target.files[0] },
    });

    window.location.reload();
  };

  return (
    <EditImage
      removeImage={removeImg}
      originalImage={imageUrl}
      loading={loading}
      platform={platform}
      onChangeImage={onChangeImage}
    />
  );
}

export default Upload;
