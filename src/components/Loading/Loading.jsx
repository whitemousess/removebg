import { useNavigate } from "react-router-dom";
import lang from "~/assets/language";

function Loading() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-neutral-200/[.5]">
      <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
        <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
      </div>
      <span className="text-xl font-bold my-10">{lang.textLoading}</span>
      <span
        className="cursor-pointer rounded-xl bg-red-500 text-white text-2xl px-10 py-4"
        onClick={() => navigate(-1)}
      >
        Cancel
      </span>
    </div>
  );
}

export default Loading;
