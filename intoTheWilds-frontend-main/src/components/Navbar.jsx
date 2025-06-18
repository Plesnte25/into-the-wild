import { useState, useEffect } from "react";
import { Menu, X, User, Phone, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/IntotheWildStaysLogo.png";
import { motion, AnimatePresence } from "framer-motion";

// Modal Component for Property Listing Form
const PropertyListingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone))
      return "Please enter a valid 10-digit phone number";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors when user starts typing
    if (name === "email" || name === "phone") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    if (currentStep === 2) {
      const emailError = validateEmail(formData.email);
      const phoneError = validatePhone(formData.phone);

      setErrors({
        email: emailError,
        phone: phoneError,
      });

      return !emailError && !phoneError;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (currentStep !== 3) {
      setCurrentStep((curr) => curr + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => {
        onClose();
        setCurrentStep(1);
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending property listing query", error);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const steps = [
    {
      title: "Personal Details",
      icon: "👤",
    },
    {
      title: "Contact Info",
      icon: "📞",
    },
    {
      title: "Property Details",
      icon: "🏠",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0F2642] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-yellow-500/30"
      >
 
 <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
  <div className="relative bg-gray-800 rounded-xl shadow-lg w-full max-w-md mx-4 p-6">
    {/* Close button in top right corner */}
    <button
      onClick={onClose}
      className="absolute right-0 top-4 text-white hover:text-yellow-300 bg-transparent rounded-full  transition-colors"
      aria-label="Close modal"
    >
      <X className="w-6 h-6" />
    </button>

    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-center">
  List Your Property
    </h2>
    <p className="text-gray-300 text-center">
      Join our network of exclusive properties
    </p>


          {/* Progress Steps */}
          <div className="flex justify-between mt-6 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
                  ${
                    currentStep > index + 1
                      ? "bg-green-500 text-white"
                      : currentStep === index + 1
                      ? "bg-yellow-500 text-[#0F2642]"
                      : "bg-gray-700 text-gray-300"
                  }
                  transition-all duration-300 shadow-md`}
                >
                  {step.icon}
                </div>
                <span className={`text-sm mt-2 font-medium ${
                  currentStep === index + 1 ? "text-yellow-500" : "text-gray-300"
                }`}>{step.title}</span>
              </div>
            ))}
            {/* Progress Line */}
            <div className="absolute top-6 left-9 h-1 bg-gray-700 w-[300px] -z-0">
              <div
                className="h-full bg-yellow-500 transition-all duration-500"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>
         
        {/* </div> */}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-yellow-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only letters and spaces
                      if (/^[a-zA-Z\s]*$/.test(value)) {
                        handleInputChange(e);
                      }
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-yellow-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-600"
                    } bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all`}
                    placeholder="Enter your email address"
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-400 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? "border-red-500" : "border-gray-600"
                    } bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all`}
                    placeholder="Enter your phone number"
                    required
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-yellow-400 mb-1">
                    Property Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Tell us about your property..."
                    required
                  ></textarea>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-4 justify-between pt-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((curr) => curr - 1)}
                className="px-6 py-2 text-white border border-gray-500 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${currentStep === 1 ? "ml-auto" : ""} px-6 py-2 bg-yellow-500 text-[#0F2642] font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center`}
            >
              {currentStep < 3 ? "Next" : isSubmitting ? "Submitting..." : "Submit Property"}
              {currentStep === 3 && <Send className="w-4 h-4 ml-2" />}
            </button>
          </div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-500 bg-green-900/50 p-4 rounded-lg border border-green-500/30"
            >
              Your property has been submitted successfully! We'll contact you
              soon.
            </motion.div>
          )}
        </form>
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Navbar Component
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Instagram gradient style
  const instagramGradient = {
    background:
      "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45)",
  };

  return (
    <nav className={`w-full z-50 bg-black transition-all font-ethereal duration-300 ${visible ? 'top-0' : '-top-32'}`}>
      {/* Top contact info bar */}
      <div className="bg-[#0F2642] text-white text-sm sm:text-base">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          {/* Left Side: Contact Info */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-2 sm:space-y-0 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <Phone size={18} className="text-yellow-300" />
              <div>
                <a
                  href="tel:+919761966485"
                  className="mr-2 hover:text-yellow-300 transition-colors"
                >
                  +91-9761966485,
                </a>
                <a
                  href="tel:+919958838557"
                  className="hover:text-yellow-300 transition-colors hidden sm:inline"
                >
                  +91-9958838557
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={18} className="text-yellow-300" />
              <a
                href="mailto:intothewildstays@gmail.com"
                className="hover:text-yellow-300 transition-colors"
              >
                intothewildstays@gmail.com
              </a>
            </div>
          </div>

          {/* Right Side: Social Media Icons - Fixed layout for landscape mode */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/profile.php?id=61557269590045"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 hover:scale-110 duration-300 ease-in-out transition-all"
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/tiny-color/50/facebook-new.png"
                alt="facebook-new"
              />
            </a>
            <div
              className="w-8 h-8 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
              style={instagramGradient}
            >
              <a
                href="https://www.instagram.com/intothewildstays/profilecard/?igsh=cGt4dTRvenNvZ25h"
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <Instagram size={22} />
              </a>
            </div>
            <a
              href="https://wa.me/9761966485"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 hover:scale-110 duration-300 ease-in-out transition-all"
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/color/48/whatsapp--v1.png"
                alt="whatsapp--v1"
              />
            </a>
          </div>
        </div>
      </div>
      
      {/* Main navigation bar */}
      <div className="mx-auto py-2 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative group">
                <img
                  src={logo}
                  alt="Into the Wild Logo"
                  className="h-24 transition-transform duration-[4000ms] group-hover:rotate-[360deg]"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            <Link
              to="/properties"
              className="text-white hover:text-yellow-300 px-3 py-2 text-lg font-semibold transition duration-300"
            >
              Properties
            </Link>
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link
                to="/tours"
                className="text-white hover:text-yellow-300 px-3 py-2 text-lg font-semibold transition duration-300"
              >
                Tours
              </Link>
              {isHovered && (
                <div className="absolute top-full w-56 left-0 mt-1 bg-gray-800 text-white rounded-md shadow-lg z-50">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/tours/1"
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Spiti Valley
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tours/7"
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Leh-Ladakh Himalayan Adventure
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tours/3"
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Kedarnath Dham
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tours/5"
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Rishikesh - Dhanolti
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <Link
              to="/events"
              className="text-white hover:text-yellow-300 px-3 py-2 text-lg font-semibold transition duration-300"
            >
              Events
            </Link>
            <Link
              to="/blog"
              className="text-white hover:text-yellow-300 px-3 py-2 text-lg font-semibold transition duration-300"
            >
              Blog
            </Link>
            <Link
              to="/about-us"
              className="text-white hover:text-yellow-300 px-3 py-2 text-lg font-semibold transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="text-white hover:text-yellow-300 px-3 py-2 text-lg font-semibold transition duration-300"
            >
              Contact Us
            </Link>

            <button
              onClick={() => setIsPropertyModalOpen(true)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 
                        hover:from-yellow-400 hover:to-yellow-500 
                        text-black text-sm sm:text-base md:text-lg 
                        px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 
                        rounded-lg font-bold 
                        shadow-lg hover:shadow-yellow-500/20 
                        transition-all duration-300 transform hover:scale-105 
                        flex items-center justify-center text-center 
                        w-full sm:w-auto"
            >
              List Your Property
            </button>


            <Link
              to="/user-profile"
              className="group flex items-center justify-center 
              bg-[#0F2642] text-white 
              px-6 py-2.5
              rounded-full
              hover:bg-[#0F2642]/90
              transition-all duration-300 
              shadow-md 
              hover:shadow-lg"
            >
              <User
                className="w-5 h-5 mr-2 
                group-hover:rotate-6 
                transition-transform duration-300"
              />
              {token ? (
                <span className="font-extrabold">Profile</span>
              ) : (
                <span className="font-extrabold">Login</span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-white hover:text-yellow-300 bg-transparent"
            >
              {isOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-[#0F2642] z-50 flex flex-col items-center justify-center"
          >
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 p-2 text-white bg-transparent hover:text-yellow-300 rounded-full"
            >
              <X className="h-8 w-8" />
            </button>

            <motion.div
              className="flex flex-col items-center space-y-6 text-center"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {[
                { to: "/", text: "Home" },
                { to: "/properties", text: "Properties" },
                { to: "/tours", text: "Tours" },
                { to: "/events", text: "Events" },
                { to: "/blog", text: "Blog" },
                { to: "/about-us", text: "About Us" },
                { to: "/contact-us", text: "Contact Us" },
              ].map((link) => (
                <motion.div
                  key={link.to}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 },
                  }}
                >
                  <Link
                    to={link.to}
                    className="text-white text-2xl font-semibold hover:text-yellow-300 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 },
                }}
              >
                <button
                  onClick={() => {
                    setIsPropertyModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:from-yellow-400 hover:to-yellow-500 px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-all duration-300"
                >
                  List Your Property
                </button>
              </motion.div>

              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 },
                }}
              >
                <Link
                  to="/user-profile"
                  className="flex items-center justify-center 
                  bg-white text-[#0F2642]
                  px-6 py-3
                  rounded-full
                  hover:bg-yellow-300
                  transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {token ? (
                    <>
                      <User className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Profile</span>
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Login</span>
                    </>
                  )}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Property Listing Modal with updated design */}
      <PropertyListingModal
        isOpen={isPropertyModalOpen}
        onClose={() => setIsPropertyModalOpen(false)}
      />
    </nav>
  );
}