import Img1 from "../assets/tourbanner.jpg";

const TourBanner = () => {
  return (
    <div className="py-8 text-gray-800">
      <div
        style={{ backgroundImage: `url(${"https://imagizer.imageshack.com/img922/9293/vmY9bW.png"})` }}
        className="flex flex-col gap-6 lg:gap-8 items-start lg:mx-16 mx-4 lg:py-16 py-10 px-6 lg:pl-20 bg-fixed bg-cover bg-center shadow-lg backdrop-blur-md"
      >
        <h1 className="lg:text-5xl text-3xl font-extrabold text-gray-100 tracking-wide leading-tight">
          Welcome to Our Tours Package
        </h1>
        <a
          href="/tours"
          className="px-6 py-3 lg:px-16 hover:bg-blue-800 font-semibold bg-gradient-to-r from-teal-600 to-teal-500 text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Explore Tour Packages
        </a>
      </div>
    </div>
  );
};

export default TourBanner;
