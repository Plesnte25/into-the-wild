import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaCalendar } from "react-icons/fa";
import heroImage1 from "../assets/guestdiary/img-2.jpg";
import heroImage2 from "../assets/banner/b1.jpeg";
import heroImage3 from "../assets/guestdiary/img-1.jpeg";
import heroImage4 from "../assets/banner/b4.jpeg";
import heroImage5 from "../assets/banner/b3.jpeg";
import React from "react";

const images = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];
const locations = ["Dhanolti", "Goa", "Tehri", "Majuli", "Rishikesh"];

const HomeHero = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
  });
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const guestDropdownRef = useRef(null);

  const toggleGuestDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeGuestDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleGuestChange = (type, delta) => {
    setSearchParams((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta), // Prevents negative values
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        guestDropdownRef.current &&
        !guestDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    // Store search parameters in sessionStorage
    sessionStorage.setItem("searchParams", JSON.stringify(searchParams));

    navigate("/properties"); // Navigate without URL parameters
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="relative h-[400px]  sm:h-[770px] sm:min-h-screen flex flex-col justify-between items-center overflow-hidden  md:pt-32  sm:pb-[106px]"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 h-full md:h-full ">
        {images?.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Background ${index + 1}`}
            className={`absolute inset-0 w-full h-full  object-cover transition-opacity duration-1000  ${index === currentImageIndex ? " bg-black  opacity-70" : "opacity-0"
              }`}
              
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1.5 }}
          />
        ))}
        <div  className="absolute inset-0  bg-black bg-opacity-70  "></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10   w-full max-w-6xl mx-auto px-6 flex-1 flex flex-col justify-center">
        {/* Hero Content */}
        <motion.div
          className="text-center space-y-8 mt-20 sm:mt-0  sm:mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            <motion.span
              className="text-[#68E8F9] bg-clip-text "
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}

              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              INTO THE WILD
            </motion.span>
            <br />
            <span className="drop-shadow-2xl">STAYS</span>
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl text-white max-w-3xl mx-auto leading-relaxed hidden md:block">
            Embark on a journey of discovery with our curated travel
            experiences. Find your perfect escape, where every destination tells
            a story.
          </p>
        </motion.div>

        {/* Search Form Container */}
        <motion.div
          className="relative w-full max-w-[100rem] mx-auto px-4 hidden md:block"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
         <div className="bg-white/95 backdrop-blur-md shadow-lg rounded-2xl border border-gray-200 p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
              {/* Location */}
              {/* <div className="w-full min-w-[200px]">
                <label className="block text-gray-700 mb-2 text-sm font-semibold uppercase tracking-wide">
                  Location
                </label>
                <select
                  name="location"
                  value={searchParams.location}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 py-2 bg-white border border-gray-300 text-gray-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 rounded-xl transition-all duration-300 hover:border-cyan-400 cursor-pointer"
                >
                  <option value="" className="text-gray-500 text-base">
                    Select Location
                  </option>
                  {locations?.map((loc) => (
                    <option key={loc} value={loc} className="text-gray-900">
                      {loc}
                    </option>
                  ))}
                </select>
              </div> */}
             {/* Location */}
            <div className="w-full min-w-[200px] relative">
            <label className="block text-gray-700 mb-2 text-sm font-semibold uppercase tracking-wide ml-2">
              Location
            </label>
            <div className="relative">
              <select
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                className="w-full h-12 px-4 pr-10 py-2 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-cyan-400 cursor-pointer"
              >
                <option value="" className="text-gray-500 text-base">
                  Select Location
                </option>
                {locations?.map((loc) => (
                  <option key={loc} value={loc} className="text-gray-900">
                    {loc}
                  </option>
                ))}
              </select>

              {/* Custom dropdown arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>


              {/* Check-in */}
              <div className="w-full min-w-[200px]">
                <label className="block text-gray-700 mb-2 text-sm font-semibold uppercase tracking-wide ml-2">
                  Check-in
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="checkIn"
                    value={searchParams.checkIn}
                    onChange={handleInputChange}
                    min={today} // Prevent past dates
                    placeholder="Select Check-in Date"
                    className="w-full h-12 px-4 py-2 bg-white border border-gray-300 text-gray-900 text-base font-medium
                     focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                     rounded-xl transition-all duration-300 hover:border-cyan-400 cursor-pointer"
                    onFocus={(e) => e.target.showPicker()} // Opens the calendar on focus
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="w-full min-w-[200px]">
                <label className="block text-gray-700 mb-2 text-sm font-semibold uppercase tracking-wide ml-2">
                  Check-out
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="checkOut"
                    value={searchParams.checkOut}
                    onChange={handleInputChange}
                    min={searchParams.checkIn} // Prevent past dates and ensure check-out is after check-in
                    placeholder="Select Check-out Date"
                    className="w-full h-12 px-4 py-2 bg-white border border-gray-300 text-gray-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 rounded-xl transition-all duration-300 hover:border-cyan-400 cursor-pointer"
                    onFocus={(e) => e.target.showPicker()}
                  />
                </div>
              </div>

              {/* Adults */}
              <div ref={guestDropdownRef} className="relative w-full md:w-auto">
                {/* Dropdown Button */}
                <label className="block text-gray-700 mb-2 text-sm font-semibold uppercase tracking-wide ml-2">
                  Guests
                </label >
                <button
                  id="guest-dropdown-button"
                  onClick={toggleGuestDropdown}
                  className="w-full h-12 px-4 py-2 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-xl text-left flex items-center justify-between hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 min-w-[200px]"
                >
                  <span className="text-base font-medium truncate block">
                    {`${searchParams.adults} Adult${searchParams.adults > 1 ? "s" : ""
                      } and ${searchParams.children} Child${searchParams.children > 1 ? "ren" : ""
                      }`}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Dropdown Content */}
                {isDropdownOpen && (
                  <div
                    id="guest-dropdown"
                    className="absolute z-50 mt-2 min-w-[300px] bg-white border border-gray-200 rounded-xl shadow-lg p-6"
                    style={{ position: "absolute", bottom: "auto" }} // Prevents clipping
                  >
                    {/* Adults */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-gray-700 text-sm font-semibold">
                          Adults
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleGuestChange("adults", -1)}
                          className="w-9 h-9 flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all duration-200 cursor-pointer"
                          disabled={searchParams.adults <= 0}
                        >
                          −
                        </button>
                        <span className="text-gray-900 text-sm min-w-[24px] text-center">
                          {searchParams.adults}
                        </span>
                        <button
                          onClick={() => handleGuestChange("adults", 1)}
                          className="w-9 h-9 flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-gray-700 text-sm font-semibold">
                          Children
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleGuestChange("children", -1)}
                          className="w-9 h-9 flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all duration-200 cursor-pointer"
                          disabled={searchParams.children <= 0}
                        >
                          −
                        </button>
                        <span className="text-gray-900 text-sm min-w-[24px] text-center">
                          {searchParams.children}
                        </span>
                        <button
                          onClick={() => handleGuestChange("children", 1)}
                          className="w-9 h-9 flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Done Button */}
                    <div className="mt-4">
                      <button
                        onClick={closeGuestDropdown}
                        className="w-full h-12 bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-600 transition-all duration-300 rounded-xl flex items-center justify-center"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="lg:col-span-1 w-full mt-1">
                <label className="block text-gray-700 mb-1 text-sm font-semibold uppercase tracking-wide ml-2">
                  Search
                </label>
                <button
                  onClick={handleSearch}
                   className="w-full h-12 px-4 py-2 bg-cyan-500 text-white text-base font-semibold hover:bg-cyan-600 transition-all duration-300 rounded-xl flex items-center justify-center gap-2  whitespace-nowrap"
                  //className="w-full h-12 px-4 py-2 bg-cyan-500 border border-gray-300 text-gray-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 rounded-xl transition-all duration-300 hover:border-cyan-400 cursor-pointer"
                >
                  <FaSearch className="text-lg" />
                  <span>Explore</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeHero;
