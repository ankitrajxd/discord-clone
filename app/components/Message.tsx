import adam from "@/public/adam.jpg";
import Image from "next/image";

const Message = () => {
  return (
    <div className="bg-gray-700 text-white min-h-screen flex items-center justify-center">
      <div className="max-w-lg">
        <div className="flex hover:bg-gray-800 hover:bg-opacity-30 px-4 py-1">
          <Image className="size-10 rounded-full mr-4 " alt="adam" src={adam} />{" "}
          <div>
            <p className="flex items-baseline">
              <span className="text-green-500 mr-2 text-sm font-medium">
                adamathan
              </span>
              <span className="text-xs text-gray-500">01/01/2021</span>
            </p>
            <p className="text-gray-300">
              You should never use something like leading relaxed with a big
              font size, it goes against all typography best practices. Line
              height should decrease as font size gets
            </p>
          </div>
        </div>

        <div className="mt-1 hover:bg-gray-800 hover:bg-opacity-30 px-4 py-1">
          <p className="text-gray-300 pl-14">
            You can override it in your config if you want but ultimately we
            chose the defaults they did because they let you get results closest
            to what a professional designer would do more easily.
          </p>
        </div>

        <div className="mt-1 hover:bg-gray-800 hover:bg-opacity-30 px-4 py-1">
          <p className="text-gray-300 pl-14">
            since we changed this in tailwind 2 I&apos;ve almost never used a
            leading class at all
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
