import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCompass, FaGlobe } from "react-icons/fa";

import Image1 from "../assets/itw/MG8666.jpg";
import Image2 from "../assets/goa/goa-ggl.jpg";
import Image3 from "../assets/pineandtails/Screenshot47.png";
import Image4 from "../assets/majuli/Property Photo/18PM.jpeg";


const locations = [
  {
    name: "Dhanolti",
    imgUrl: Image1,
    description: "Serene mountain retreat nestled in the Himalayas",
    temperature: "15°C",
    elevation: "2,200m",
  },
  {
    name: "Goa",
    imgUrl: Image2,
    description: "Vibrant coastal paradise with pristine beaches",
    temperature: "28°C",
    elevation: "Sea Level",
  },
  {
    name: "Tehri",
    imgUrl: Image3,
    description: "Scenic hill station with breathtaking landscapes",
    temperature: "20°C",
    elevation: "1,600m",
  },
  {
    name: "Majuli",
    imgUrl: Image4,
    description: "Unique river island with rich cultural heritage",
    temperature: "25°C",
    elevation: "90m",
  },
];

const LocationSection = () => {
  return (
    <div className=" bg-gradient-to-r from-blue-100 via-cyan-100 to-emerald-100 py-24 px-6 lg:px-32 relative overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20"></div>

      <div className="relative  max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-900 to-cyan-900 bg-clip-text text-transparent">
              Explore
            </span>{" "}
            <span className="text-gray-800">Destinations</span>
          </h1>
          <p className="text-gray-800 font-semibold text-lg max-w-2xl mx-auto">
            Discover extraordinary places that promise unforgettable experiences
            and breathtaking landscapes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {locations?.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              className="relative mb-8"
            >
              <div className="relative w-72 h-72 mx-auto group rounded-full cursor-pointer overflow-hidden" style={{ clipPath: 'circle(50% at 50% 50%)' }}>
                <div className="w-full h-full border-4 border-white/80 shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={location.imgUrl}
                    alt={location.name}
                    className="w-full h-full object-cover"
                    style={{ clipPath: 'circle(50% at 50% 50%)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                      <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                        {location.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[50%] w-64 p-4 bg-white/95  rounded-2xl
                  shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-y-[-50%] transition-all duration-500 pointer-events-none
                  border border-white/50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {location.name}
                    </h2>
                    <FaMapMarkerAlt className="text-cyan-700 text-2xl" />
                  </div>
                  <p className="text-gray-600 text-base mb-6 leading-relaxed">
                    {location.description}
                  </p>

                  <div className="flex justify-between text-gray-700">
                    <div className="flex items-center space-x-3">
                      <FaGlobe className="text-emerald-700 text-lg" />
                      <span className="font-medium">{location.elevation}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaCompass className="text-cyan-700 text-lg" />
                      <span className="font-medium">
                        {location.temperature}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSection;