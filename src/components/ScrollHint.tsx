import Image from "next/image";
import scrollAnimation from "@static/scroll.gif";

export default function ScrollHint() {
  return (
    <div className="flex gap-2 flex-col items-center ml-auto mr-auto p-6 absolute bottom-0 left-0 right-0">
      <Image className="opacity-40 mix-blend-screen" src={scrollAnimation} alt="mouse scroll animation gif" />
      <span className="text-gray-500 text-nowrap w-max">Scroll to navigate the scene</span>
    </div>
  );
}
