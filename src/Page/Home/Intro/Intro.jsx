import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import lang from "~/assets/language";
import DropImage from "~/components/DropImage";

function Intro() {
  const navigation = useNavigate();

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent.toLowerCase()
    );
    if (isMobile) {
      localStorage.setItem("window", false);
    } else {
      localStorage.setItem("window", true);
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (acceptedFiles.length > 0) {
        navigation("/upload", {
          state: { imageUrl: file },
        });
      }
    },
    [navigation]
  );

  return (
    <div className="flex flex-col justify-center items-start text-center m-5">
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-4xl font-bold my-10">{lang.titleWeb}</p>
        <p className="text-2xl mb-5">{lang.description}</p>

        <DropImage onDrop={onDrop} />
      </div>
    </div>
  );
}

Intro.propTypes = {
  onUpload: PropTypes.func,
};

export default Intro;
