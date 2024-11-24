const Home = () => {
  return (
    <>
      <div className="bg-gray-800 w-60 flex flex-col">
        <div className="px-3 h-12 flex items-center shadow-md font-poppins font-semibold text-white">
          Dashboard
        </div>

        <div className="text-gray-300 p-3 flex-1 overflow-y-scroll scrollbar-hide font-medium space-y-2">
          <p className="text-white">Friends</p>
        </div>
      </div>

      <div className="bg-gray-700 flex-1 flex flex-col">
        {/* <div className="px-3 h-12 flex items-center shadow-md">general</div> */}
        <div className=" p-3 flex-1 overflow-y-scroll scrollbar-hide space-y-4"></div>
      </div>
    </>
  );
};

export default Home;

