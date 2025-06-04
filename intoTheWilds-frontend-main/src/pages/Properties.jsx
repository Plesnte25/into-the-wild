import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaBed,
  FaUsers,
  FaStar,
  FaSearch,
  FaCalendar,
} from "react-icons/fa";
import SidebarFilter from "../components/SidebarFilter";
import BookingButton from "../components/BookingButton";
import TourBanner from "../components/TourBanner";
import axios from "axios";
import { BASE_URL } from "../utils/baseurl";


const PropertyShimmer = () => (
  <div className="bg-white shadow-md animate-pulse rounded-lg">
    <div className="flex flex-col md:flex-row h-full">
      <div className="md:w-2/5 h-64 md:h-auto bg-gray-200 rounded-l-lg"></div>
      <div className="flex-1 p-6">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="flex gap-3 mb-4">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-10 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    </div>
  </div>
);

const locations = ["Assam", "Dhanolti", "Goa", "Tehri", "Rishikesh"];


const Properties = () => {
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
  });


  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${BASE_URL}/properties`);
        setProperties(res.data.properties);
        setFilteredProperties(res.data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const location = urlParams.get("location") || "";
    const checkIn = urlParams.get("checkIn") || "";
    const checkOut = urlParams.get("checkOut") || "";
    const adults = urlParams.get("adults")
      ? parseInt(urlParams.get("adults"))
      : 1;
    const children = urlParams.get("children")
      ? parseInt(urlParams.get("children"))
      : 0;


    // Check if parameters are stored in sessionStorage
    const storedParams = sessionStorage.getItem("searchParams");
    console.log(storedParams);
    if (storedParams) {
      const { location, checkIn, checkOut, adults, children } =
        JSON.parse(storedParams);
      setSearchParams({ location, checkIn, checkOut, adults, children });
      if (location) {
        handleFilterChange({ location: location });
      }
    } else {
      navigate("/properties", { replace: true });
    }
  }, [properties]);
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("searchParams");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    handleFilterChange({ location: searchParams.location }); // Filter when Explore button is clicked
  };


  const handleFilterChange = ({ location }) => {
    let filtered = properties;
    console.log(location);
    console.log(filtered);
    if (location) {
      filtered = filtered.filter(
        (property) => property.location.toLowerCase() === location.toLowerCase()
      );
    }
    console.log(filtered);
    setFilteredProperties(filtered);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };


  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const guestDropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  const toggleGuestDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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


  const closeGuestDropdown = () => {
    setIsDropdownOpen(false);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuestChange = (type, amount) => {
  setSearchParams((prev) => ({
    ...prev,
    [type]: Math.max(0, prev[type] + amount),
  }));
};


  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.trvl-media.com/lodging/109000000/108380000/108370800/108370765/28b3dc50.jpg?impolicy=resizecrop&rw=1200&ra=fit')] bg-cover bg-center bg-fixed transform scale-105">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/100 to-gray-900/60" />
        </div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-300 to-cyan-100 bg-clip-text text-transparent">
              Discover
              <br />
              <span className="text-white/60">Your Perfect Stay</span>
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mb-8">
            Explore our handpicked collection of stunning properties in
            spectacular locations
          </p>
        </motion.div>
      </div>


      {/* Search Form */}
      <motion.div
        className="relative z-10 shadow-2xl rounded-3xl -mt-24 mb-16 max-w-7xl mx-auto"
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
            <label className="block text-gray-700 mb-2 text-sm font-semibold uppercase tracking-wide  ml-2 ">
              Location
            </label>
            <div className="relative">
              <select
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                onFocus={closeGuestDropdown}
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
                    onFocus={() => {
                      closeGuestDropdown();
                      // Also open date picker
                      const el = document.activeElement;
                      if (el && el.showPicker) el.showPicker();
                    }}
                    min={today} // Prevent past dates
                    placeholder="Select Check-in Date"
                    className="w-full h-12 px-4 py-2 bg-white border border-gray-300 text-gray-900 text-base font-medium
                     focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                     rounded-xl transition-all duration-300 hover:border-cyan-400 cursor-pointer"
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
                    onFocus={() => {
                      closeGuestDropdown();
                      // Also open date picker
                      const el = document.activeElement;
                      if (el && el.showPicker) el.showPicker();
                    }}
                    min={searchParams.checkIn} // Prevent past dates and ensure check-out is after check-in
                    placeholder="Select Check-out Date"
                    className="w-full h-12 px-4 py-2 bg-white border border-gray-300 text-gray-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 rounded-xl transition-all duration-300 hover:border-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Adults */}
              <div className="relative w-full md:w-auto">
                {/* Dropdown Button */}
                <label className="block text-gray-700 mb-2 text-sm font-semibold uppercase tracking-wide ml-2">
                  Guests
                </label>
                <button
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
                    className="absolute z-50 mt-2 w-[440px] min-w-[440px] bg-white border border-gray-200 rounded-xl shadow-lg p-4"
                    style={{ position: "absolute", bottom: "auto" }} // Prevents clipping
                  >
                    {/* Adults */}
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-gray-700 text-sm font-semibold">
                          Adults
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleGuestChange("adults", -1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all duration-200"
                          disabled={searchParams.adults <= 0}
                        >
                          −
                        </button>
                        <span className="mx-2 text-gray-900 text-sm">
                          {searchParams.adults}
                        </span>
                        <button
                          onClick={() => handleGuestChange("adults", 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-gray-700 text-sm font-semibold">
                          Children
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleGuestChange("children", -1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all duration-200"
                          disabled={searchParams.children <= 0}
                        >
                          −
                        </button>
                        <span className="mx-2 text-gray-900 text-sm">
                          {searchParams.children}
                        </span>
                        <button
                          onClick={() => handleGuestChange("children", 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Done Button */}
                    <div className="mt-2">
                      <button
                        onClick={closeGuestDropdown}
                        className="w-full h-10 bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-600 transition-all duration-300 rounded-xl flex items-center justify-center"
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


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
  <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
    {/* Sidebar */}
    <div className="w-full lg:w-1/4">
    <div className="lg:sticky lg:top-24">
       <SidebarFilter
        onFilterChange={handleFilterChange}
        // properties={properties}
       />
       </div>
    </div>


    {/* Properties List */}
    <motion.div
      className="w-full lg:w-3/4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid gap-4 sm:gap-6 md:gap-8">
        {isLoading
          ? [...Array(3)]?.map((_, index) => <PropertyShimmer key={index} />)
          : filteredProperties?.map((property, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative bg-white overflow-hidden shadow-md sm:shadow-lg transform transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl sm:hover:shadow-2xl rounded-lg border border-gray-200"
              >
                <Link to={`/property/${property._id}`}>
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Image Section */}
                    <div className="md:w-2/5 relative overflow-hidden h-48 sm:h-56 md:h-64 lg:h-[55vh]">
                      <img
                        src={property.images[0]}
                        alt={property.name}
                        className="w-full h-full object-cover  transition-transform duration-700 hover:scale-110 md:rounded-tl-lg"
                      />
                      <div className="absolute top-3 left-3 sm:top-4  sm:left-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-md sm:rounded-lg shadow-sm sm:shadow-md">
                        <div className="flex items-center space-x-1 text-sm sm:text-base">
                          <FaStar className="text-yellow-500" />
                          <span className="font-semibold">
                            {property.rating}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-600">
                            ({property.reviews})
                          </span>
                        </div>
                      </div>
                    </div>


                    {/* Content Section */}
                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                          {property.name}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                          {property?.description?.length > 200
                            ? `${property.description.substring(0, 200)}...`
                            : property?.description}
                        </p>


                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <span className="flex items-center space-x-1 sm:space-x-2 bg-teal-50 text-teal-700 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-xs sm:text-sm">
                            <FaMapMarkerAlt className="text-teal-500 flex-shrink-0" />
                            <span>{property.location}</span>
                          </span>
                          <span className="flex items-center space-x-1 sm:space-x-2 bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-xs sm:text-sm">
                            <FaBed className="text-blue-500 flex-shrink-0" />
                            <span>{property.bedroom} {property?.cottage ? "Cottages" : "Rooms"}</span>
                          </span>
                          <span className="flex items-center space-x-1 sm:space-x-2 bg-purple-50 text-purple-700 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-xs sm:text-sm">
                            <FaUsers className="text-purple-500 flex-shrink-0" />
                            <span>{property.guest} Guests</span>
                          </span>
                        </div>
                      </div>


                      {/* Price and Button Section */}
                      <div className="flex  items-start sm:items-center md:flex-row  justify-between mt-3 sm:mt-4">
                        <div className="flex flex-col ps-4 sm:ps-0  sm:mb-0 md:w-1/2">
                          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                            ₹{property.price}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500">
                            per night / {property?.cottage ? "Cottage" : "Room"}
                          </span>
                        </div>


                        <div className="flex items-center justify-end  w-full h-full sm:w-auto space-y-2 sm:space-y-3">
                          <BookingButton property={property} />
                          <Link
                            to={`/property/${property._id}`}
                            style={{marginTop:"0px"}}
                            onClick={() => window.scrollTo(0, 0)}
                            className="hidden px-4 mb-8 mt-0 pt-[0.75rem] pb-[0.75rem] sm:pt-[0.6rem] sm:pb-[0.6rem]  sm:px-6  text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-300 to-cyan-300 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 rounded-lg text-center"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>
    </motion.div>
  </div>
</div>


      <TourBanner />
    </div>
  );
};


export default Properties;