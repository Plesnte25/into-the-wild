import { useState, useEffect, useRef } from "react";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaMapMarkerAlt,
  FaBed,
  FaRupeeSign,
  FaQuestionCircle,
  FaTimesCircle,
  FaHome,
  FaUsers,
  FaUserFriends,
} from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { FcRules } from "react-icons/fc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronFirst, ChevronLast, X } from "lucide-react";
import BookingButton from "./BookingButton";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import "./exploreMoreITW.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//hello
import { Play, Pause } from "lucide-react";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import image7 from "../assets/image7.jpg";
import image9 from "../assets/image9.jpg";
import image10 from "../assets/image10.jpg";
import image11 from "../assets/image11.jpg";
import image12 from "../assets/image12.jpg";
import image13 from "../assets/image13.jpg";
import { toast } from "react-toastify";

const ExploreMoreITW = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState(null);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(new Date());
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const { id } = useParams();
  const [openIndex, setOpenIndex] = useState(null); // For FAQs
  const [activeSection, setActiveSection] = useState("amenities"); // Track active section
  console.log("property", property);
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State to control login modal visibility
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const buttons = [
    { id: "amenities", label: "Amenities" },
    { id: "location", label: "Location" },
    { id: "policies", label: "Policies" },
    { id: "faqs", label: "FAQ" },
    { id: "Review", label: "Review" },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 reviews at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // Tablet & Mobile
        settings: {
          slidesToShow: 1, // Show 1 review at a time on small screens
        },
      },
    ],
  };

  const reviews = {
    IntoTheWildsStays: [
      {
        id: 1,
        name: "Manjula Singh",
        date: "2 days ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjUUygNmvjTkufn8yf6am1WuEmi0ovqTcXdeiejFFYZthSbZbzn84Q=w54-h54-p-rp-mo-ba2-br100",
        feedback: `"My stay here was nothing short of magical! The place we stayed at was surrounded by breathtaking mountains, offering serene views that made the experience unforgettable. One of the highlights was witnessing a spectacular sunrise, which felt like nature's masterpiece.
    The hospitality provided by the owner Akash was truly exceptional – he was so warm, accommodating, and attentive that it felt like home. He went above and beyond to ensure our comfort and made our stay even more special."`,
        type: "feedback",
        rating: 5,
      },
      {
        id: 3,
        avatar: image2,
        type: "image",
      },

      {
        id: 2,
        name: "Tushar Bhagwane",
        date: "4 days ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjWx0zD4XwMxOPsGqweH7fI_8W4dvCaHP_tswI4G0yQCJXYkoD-F=w54-h54-p-rp-mo-br100",
        feedback: `"I had a fantastic stay at this hotel! The rooms were spacious, clean, and well-equipped with everything I needed for a comfortable visit. The staff were incredibly friendly and went above and beyond to ensure I had a great experience. The location is perfect, with easy access to popular attractions, restaurants, and transportation. The breakfast was delicious with a wide variety of options. I would definitely recommend this hotel to anyone looking for a relaxing and enjoyable stay.stay even more special."`,
        rating: 5,
        type: "feedback",
      },
      {
        id: 3,
        avatar: image1,
        type: "image",
      },
    ],
    "ITW:TapovanRiseCottages": [
      {
        id: 1,
        name: "Shweta Jha",
        date: "3 weeks ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjVJMTqVydZnsZ3-wUaW1eJzC1kDLaOQDMZ75zAe9x-0KWGSU7iW=w36-h36-p-rp-mo-br100",
        feedback: `"Great location, beautiful surrounding atmosphere, great staff. Lovely  and great first impression of this cottage . Everything about the hotel was exceptional. It was clean, stylish, roomy with excellent service….. Food was good and great value for money and service was attentive and efficient. Room itself was well equipped and comfortable. I was very pleased with my stay. I hope to be back for a longer visit soon…

Thanks  a lot deepak ji for everything.🙏🏻😊❤️

.would like to recommend this to many of my friends and relatives…."`,
        rating: 5,
        type: "feedback",
      },
      {
        id: 3,
        avatar: image3,
        type: "image",
      },
      {
        id: 2,
        name: "Hritu Sharma",
        date: "a month ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjWxIduVycbNc0Sq02qHQmsMcAoU0-6AU4BMYuGBJttWA8lZI1Nr8g=w36-h36-p-rp-mo-br100",
        feedback: `"Best & Budget friendly place to stay in Rishikesh with the feel of camping, bone fire, music and all other activities.

Walk-in from main road and very safe place. Owner and all staff's behaviour is so nice and humble.

Rooms and open area is well cleaned and very peaceful place and mountain view."`,
        rating: 5,
        type: "feedback",
      },
      {
        id: 3,
        avatar: image4,
        type: "image",
      },
    ],
    "ITW:MastanaMusafir": [
      {
        id: 1,
        name: "Aadi Raina",
        date: "a monthb ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjVA_eucprNOoafs8A8sEhBaVQ4uKLAtZ1wV2PPlAjIu0N1qmt3u=w36-h36-p-rp-mo-br100",
        feedback: `"i had a fantastic stay! the staff were incredibly friendly.  Everything about the place was exceptional. It was clean, stylish, roomy with excellent service. Food was good and great value for money and service was attentive and efficient. Room itself was well equipped and comfortable. Highly recommended. ❤️"`,
        rating: 5,
        type: "feedback",
      },
      {
        id: 3,
        avatar: image5,
        type: "image",
      },
      {
        id: 2,
        name: "Olivier Guillard",
        date: "3 month ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjUMCa3moxmQtqs4d0MBExw6HcX1gcr-upY6GwSMX9PGAFAd1V5Mxw=w36-h36-p-rp-mo-ba5-br100",
        feedback: `"This was one of the best paneer butter masala I've ever had, I strongly recommend. I also ordered fried vegetables, papad and parathas. Even though I don't usually write reviews, I just had to share my wonderful experience."`,
        rating: 5,
        type: "feedback",
      },
      {
        id: 3,
        avatar: image6,
        type: "image",
      },
    ],
    "ITW:PineTales": [
      {
        id: 1,
        name: "manish rathore",
        date: "a monthb ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjWAyMr0qVH4_8n21vsJraxjHqz_wEyldxnY2MHklO0JqjjGCfsw=w54-h54-p-rp-mo-br100",
        feedback: `"My stay with Pine and Tail Property was an incredible experience! The property was nestled in a beautiful location, surrounded by stunning views that brought a sense of peace and relaxation. Watching the sunrise from the property was absolutely breathtaking—like something out of a dream.

The team at Pine and Tail Property provided outstanding hospitality. "`,
        rating: 5,
        type: "feedback",
      },
      {
        id: 3,
        avatar: image7,
        type: "image",
      },
      {
        id: 2,
        name: "Bunny",
        date: "3 month ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjWzekqZQVqqrnzbLdop2eXfnUb--K_2y_SUmtDzIs9lpP4yIppH=w54-h54-p-rp-mo-ba4-br100",
        feedback: `"Staying with Pine and Tail Property was an unforgettable experience! The property was surrounded by stunning natural beauty, with peaceful views that made every moment feel special. One of the most memorable parts was watching the sunrise—it was truly a breathtaking sight that I’ll never forget.

The hospitality from the Pine and Tail Property team was beyond amazing. "`,
        rating: 5,
        type: "feedback",
      },
      {
        id: 3,
        avatar: image9,
        type: "image",
      },
    ],
    "ITW:SunandSandVilla": [
      {
        id: 1,
        name: "Rajat Sharma",
        date: "a monthb ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjWfhfXkPNVUNWGSMayOR9RqYcyoEH8iKKWKAtHxLbqAzpNDbJ85Ow=w54-h54-p-rp-mo-ba2-br100",
        feedback: `"My stay with Sun and Sand Property was absolutely unforgettable! The property was perfectly located, offering stunning views of the beach and the soothing sound of waves in the background. Waking up to a breathtaking sunrise over the water was a highlight of the trip—it felt like a scene from a dream.

The hospitality from the Sun and Sand Property team was exceptional. "`,
        rating: 5,
        type: "feedback",
      },

      {
        id: 2,
        name: "Arvind Nagar",
        date: "3 month ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjXcVgO6RVm6QTkIEvCG4fDM4693d-jm2kS5Eji3CbgzhzcTVZLy=w54-h54-p-rp-mo-ba2-br100",
        feedback: `"Staying with Sun and Sand Property was an incredible experience! The property was right by the beach, offering stunning ocean views and a peaceful, relaxing atmosphere. Watching the sunrise over the water was truly magical—a moment I’ll cherish forever.

The team at Sun and Sand Property provided outstanding hospitality. "`,
        rating: 5,
        type: "feedback",
      },

      {
        id: 2,
        name: "Vaibhav Shinde",
        date: "3 month ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjXcQTkIEvCG4fDM4693d-jm2kS5Eji3CbgzhzcTVZLy=w54-h54-p-rp-mo-ba2-br100",
        feedback: `"My experience with Sun and sand villa was absolutely amazing! The property was surrounded by lush greenery and towering trees, offering a peaceful retreat in nature. The views were spectacular, and waking up to the sounds of the forest felt like pure bliss.

The hospitality from the PinesAndTails team was truly exceptional. "`,
        rating: 5,
        type: "feedback",
      },
    ],
    "ITW:TheRudramAuraStay": [
      {
        id: 1,
        name: "Akshad Ghate",
        date: "a monthb ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjUiPYj94ra9LMSK_zdaPBiWGKgJ4tiRClMczHtXnkUHZZ8KlkDt=w54-h54-p-rp-mo-br100",
        feedback: `"The Rudram Property in Rishikesh has received positive reviews from guests. The property is praised for its cleanliness and hygiene standards, with guests noting that not even a single dust particle was present. The staff is courteous and welcoming, and the food served is fresh and healthy. The property offers yoga classes and Ayurvedic treatments, which guests have found to be relaxing and rejuvenating. However, some guests have faced issues with power fluctuations and the geyser not working well. "`,
        rating: 5,
        type: "feedback",
      },
      {
        id: 3,
        avatar: image12,
        type: "image",
      },
      {
        id: 2,
        name: "Vishal Mishra",
        date: "3 month ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjVtHJlom4jAmFJh851wQLMKq_OWJHGUSw7S8qRq9SLF_pPd5oq2=w54-h54-p-rp-mo-br100",
        feedback: `"This place is very peaceful, it’s simple and peaceful. The food served is very fresh. The staff is also very good and helpful. We have tried shirodhara & abhyang over here. It’s good have stayed at this place 3 and our experience was same. Rooms and bathrooms are clean as well. Parents have also liked this place for stay it’s simple basic but worth. Feels like home"`,
        rating: 5,
        type: "feedback",
      },
      {
        id: 3,
        avatar: image13,
        type: "image",
      },
    ],
    "Me:namHomestay(Majuli)": [
      {
        id: 1,
        name: "Ram Pershad",
        date: "a monthb ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjWE3bGnK6ATaJ3gqP1wPSBDsJ0oPV43SofR4UiwnBC9GvdJWgb3Gg=w54-h54-p-rp-mo-ba3-br100",
        feedback: `"This place is a treat. The food was absolutely delicious, with every meal full of flavor and made with care. The hosts were incredibly warm and welcoming, often going out of their way to ensure we felt at home. Highly recommended for anyone looking for a cozy, memorable stay with amazing food and hosts! No better people to explore Majuli with,  such a beautiful community."`,
        rating: 5,
        type: "feedback",
      },
      {
        id: 3,
        avatar: image12,
        type: "image",
      },
      {
        id: 2,
        name: "Abhishek Sutar",
        date: "3 month ago",
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjXXQvnSyn0J2GU53-PLZvMvTeog1NNCQ4zVmLmhJXaNwHTjp0Gy=w54-h54-p-rp-mo-br100",
        feedback: `"What a lovely homestay!!! Cynthia and her family took such a good care of us during our stay and provided amazing meals even during our camping days along the river. Would surely recommend a stay here if in Majuli. The area is much less busy than the side of the island and it was very interesting to learn about Mising traditions. Thank you so much!!"`,
        rating: 5,
        type: "feedback",
      },
      {
        id: 3,
        avatar: image13,
        type: "image",
      },
    ],
  };

  const propertyNameForReview = property?.name?.replaceAll(" ", "") || "";
  console.log("propertyNameForReview", propertyNameForReview);
  const guestSummary = `${adults} Adult${
    adults > 1 ? "s" : ""
  } and ${children} Child${children > 1 ? "ren" : ""}`;
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/properties/${id}`);

        console.log(res.data);

        setProperty(res.data.property);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Prepare images array
  const images = property?.images || [];
  const hasVideo = images.some((img) => img.endsWith(".mp4"));
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  // If there's a video, replace the first image with the video
  const displayImages = hasVideo
    ? [
        images.find((img) => img.endsWith(".mp4")),
        ...images.filter((img) => !img.endsWith(".mp4")),
      ]
    : images;

  // modal & lightbox state
  const [modalOpen, setModalOpen] = useState(false); // grid model
  const [lightboxIdx, setLightBoxIdx] = useState(null); // single image view
  const [idx, setIdx] = useState(0);

  // helpers for image gallery
  const openGrid = () => {
    setLightBoxIdx(null);
    setModalOpen(true);
  };
  const openLightbox = (idx) => {
    setLightBoxIdx(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const nextImg = () => setLightBoxIdx((i) => (i + 1) % images.length);
  const prevImg = () =>
    setLightBoxIdx((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (modalOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
      return () => (document.body.style.overflow = original); // Cleanup on unmount
    }
  }, [modalOpen]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleBookNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginPopup(true);
      return;
    }
    if (selectedCheckInDate >= selectedCheckOutDate) {
      // console.log("Check out date should be greater than check in date")
      toast.error("Check out date should be greater than check in date");
      return;
    }
    const bookingData = {
      checkIn: selectedCheckInDate,
      checkOut: selectedCheckOutDate,
      adults,
      children,
      tour: true,
      property,
    };
    navigate("/checkout", { state: bookingData }); // Navigate to Checkout with state
  };
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-100/50 px-4 sm:px-8 lg:px-32 py-48 sm:py-20 lg:py-40">
        <div className="animate-pulse space-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="w-full lg:w-1/2">
              <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-8 bg-gray-200 rounded-lg mb-4 w-3/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4]?.map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6]?.map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white/70 px-4 sm:px-8 lg:px-14 py-28 scroll-smooth"
    >
      {/* Collapsed Gallery */}
      <div className="grid grid-cols-1 z-40 md:grid-cols-2 gap-4 mb-12">
        {displayImages.length > 0 && (
          <>
            {displayImages[0].endsWith(".mp4") ? (
              // If the first item is a video
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-[450px] overflow-hidden rounded-xl shadow-lg"
              >
                <video
                  ref={videoRef}
                  src={displayImages[0]}
                  controls
                  loop
                  muted
                  className="w-full h-full object-cover transition-transform duration-300"
                />

                {/* Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-opacity duration-300 rounded-xl"
                >
                  {isPlaying ? (
                    <Pause className="text-white w-12 h-12" />
                  ) : (
                    <Play className="text-white w-12 h-12" />
                  )}
                </button>
              </motion.div>
            ) : (
              // If the first item is an image -- hero image
              images[0] && (
                <img
                  src={images[0]}
                  onClick={() => setLightBoxIdx(idx)}
                  className="w-full h-[450px] object-cover rounded-xl cursor-pointer"
                  alt="hero"
                />
              )
            )}
            {/* Thumbnail */}
            <div className="grid grid-cols-2 grid-rows-2 gap-3 relative h-[450px]">
              {images.slice(1, 5).map((src, i) => (
                <div key={src} classname="relative">
                  <img
                    src={src}
                    alt="thumb"
                    onClick={() => openLightbox(i + 1)}
                    className="h-full w-full object-cover rounded-lg cursor-pointer"
                  />

                  {/* +N overlay when collapsed */}
                  {i === 1 && images.length > 5 && (
                    <button
                      type="button"
                      onClick={openGrid}
                      className="absolute flex items-center justify-center bg-black/20 text-white font-semibold text-xl rounded-lg"
                    >
                      +{images.length - 5} More
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

        {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            oneKeyDown={(e) => e.key === "Escape" && closeModal()} // Close on Escape key
          >
            {/* backdrop click */}
            <div className="absolute inset-0" onClick={closeModal} />

            {/* dialog */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full p-4"
            >
              {/* persistent close button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-6 right-6 z-[60] bg-transparent border-none rounded-full p-1 shadow hover:bg-black"
              >
                <X size={35} color="white" />
              </button>

              {/* Light-Box view */}
              {lightboxIdx !== null ? (
                <div className="relative flex z-50 items-center justify-center">
                  <img  
                    src={images[lightboxIdx]}
                    alt="large"
                    className="h-[750px] w-auto object-contain rounded-xl transition-transform duration-300 hover:scale-105"
                  />
                  {/* Arrows */}
                  <button
                    type="button"
                    onClick={prevImg}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-black border-none rounded-full p-2 m-2"
                  >
                    <ChevronFirst size={35} color="white" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImg}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-black border-none rounded-full p-2 m-2"
                  >
                    <ChevronLast size={35} color="white" />
                  </button>
                </div>
              ) : (
                // Grid view
                <div className="grid grid-cols-w sm:grid-cols-3 z-40 gap-4 max-h-[80vh] overflow-y-auto pb-4 no-scrollbar">
                  {images.map((src, idx) => (
                    <img
                      key={src}
                      src={src}
                      alt="grid"
                      onClick={() => setLightBoxIdx(idx)}
                      className="h-44 w-full object-cover rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Property Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row lg:justify-between lg:items-start">
            <div>
              <h1 className="lg:text-5xl md:text-3xl text-2xl font-extrabold mb-4 text-gray-800">
                {property?.name}
              </h1>
              <p className="text-gray-600 mb-8 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                {property?.location}
              </p>
            </div>

            <div className="lg:hidden mb-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className="bg-white  h-[auto] border sticky top-28 border-gray-100 rounded-2xl 
                w-full max-w-md mx-auto 
                p-6 space-y-6 
                shadow-xl ring-1 ring-gray-100"
              >
                {/* Price and Booking Button Row */}
                <div className="flex justify-between items-center">
                  {/* Price Header */}
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-1">
                      <span className="text-3xl font-bold text-neutral-800">
                        From
                      </span>
                      <FaRupeeSign className="text-neutral-600 text-2xl" />
                      <span className="text-3xl font-bold text-neutral-800">
                        {property.price}
                      </span>
                      <b className="text-gray-400 text-sm">/Night</b>
                    </div>
                    {/* <p className="text-neutral-500 text-sm mt-1">per night</p> */}
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                      className="date_card"
                    >
                      <h3 className="text-lg font-semibold">Check In</h3>
                      <DatePicker
                        selected={selectedCheckInDate}
                        onChange={(date) => setSelectedCheckInDate(date)}
                        dateFormat="dd MMM yyyy"
                        className="hidden1 border rounded p-2 w-full text-[#112641] font-semibold"
                        minDate={new Date()}
                      />
                    </motion.div>

                    {/* Check-Out */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                      className="date_card"
                    >
                      <h3 className="text-lg font-semibold">Check Out</h3>
                      <DatePicker
                        selected={selectedCheckOutDate}
                        onChange={(date) => setSelectedCheckOutDate(date)}
                        dateFormat="dd MMM yyyy"
                        className="hidden1 border rounded p-2 w-full text-[#112641] font-semibold"
                        minDate={selectedCheckInDate || new Date()}
                      />
                    </motion.div>
                  </div>

                  {/* Guests */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="date_card"
                  >
                    <h3 className="text-lg font-semibold">Guest</h3>
                    <input
                      type="text"
                      placeholder="Guest"
                      value={guestSummary}
                      className="border rounded p-2 w-full text-[#112641] font-semibold"
                      readOnly
                    />
                    <div className="bg-white shadow-lg mt-2 p-4 rounded">
                      <ul>
                        {/* Adults Section */}
                        <li className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-semibold mb-0">Adults <span className="text-sm mb-0">12+</span></p>
                            {/* <p className="text-sm mb-0">12+</p> */}
                          </div>
                          <div className="quantity-box flex items-center gap-2">
                            <button
                              className="border  px-3 py-1 rounded"
                              onClick={() =>
                                setAdults((prev) => Math.max(1, prev - 1))
                              } // Minimum 1 adult
                            >
                              -
                            </button>
                            <span>{adults}</span>
                            <button
                              className="border px-3 py-1 rounded"
                              onClick={() => setAdults((prev) => prev + 1)}
                            >
                              +
                            </button>
                          </div>
                        </li>

                        {/* Children Section */}
                        <li className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold mb-0">Children <span className="text-sm mb-0">6-11</span></p>
                            {/* <p className="text-sm mb-0">6-11</p> */}
                          </div>
                          <div className="quantity-box flex items-center gap-2">
                            <button
                              className="border px-3 py-1 rounded"
                              onClick={() =>
                                setChildren((prev) => Math.max(0, prev - 1))
                              } // Minimum 0 children
                            >
                              -
                            </button>
                            <span>{children}</span>
                            <button
                              className="border px-3 py-1 rounded"
                              onClick={() => setChildren((prev) => prev + 1)}
                            >
                              +
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
                {/* Booking Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleBookNow} // Update onClick to handleBookNow
                    className="w-full py-3 bg-[#112641] text-white 
                       rounded-xl hover:bg-white hover:text-[#112641] hover:border-[#112641] hover:border
                       transition-colors duration-300 
                       font-medium tracking-wide"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {!modalOpen && (
          <div className="w-full flex sticky top-5 z-50 overflow-x-scroll gap-4 sm:gap-8 mb-4 no-scrollbar">
            {buttons.map((button) => (
              <a
                key={button.id}
                onClick={() => scrollToSection(button.id)}
                className={`py-2 border-2 shadow-lg rounded font-semibold flex-auto flex items-center cursor-pointer justify-center px-4 transition duration-300 ${
                  activeButton === button.id
                    ? "bg-[#163257] text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                
                {button.label}
              </a>
            ))}
          </div>
        )}


          {/* Property Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-md px-2 sm:px-6 sm:py-6 py-3 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <FaHome className="text-blue-500  hidden sm:block text-xl" />
                <h3 className="font-semibold text-sm ">
                  {property?.cottage ? "Cottages" : "Rooms"}
                </h3>
              </div>
              <p className="text-gray-700 text-sm ">
                {property?.bedroom} {property?.cottage ? "Cottages" : "Rooms"}
              </p>
            </div>
            <div className="bg-white shadow-md px-2 sm:px-6 sm:py-6 py-3 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <FaUserFriends className="text-blue-500  hidden sm:block text-xl" />
                <h3 className="font-semibold text-sm">Guest Capacity</h3>
              </div>
              <p className="text-gray-700 text-sm">
                {property?.guestCapacity} persons per{" "}
                {property?.cottage ? "cottage" : "room"}
              </p>
            </div>
            <div className="bg-white shadow-md  px-2 sm:px-6  sm:py-6 py-3 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <FaUsers className="text-blue-500 text-xl hidden sm:block" />
                <h3 className="font-semibold text-sm">Maximum Capacity</h3>
              </div>
              <p className="text-gray-700 text-sm">
                {property?.maximumCapacity} persons
              </p>
            </div>
            <div className="bg-white shadow-md  px-2 sm:px-6 sm:py-6 py-3 rounded-xl lg:col-span-3">
              <div className="flex items-center gap-3 mb-2">
                <FaMapMarkerAlt className="text-blue-500  text-xl hidden sm:block" />
                <h3 className="font-semibold text-sm">Address</h3>
              </div>
              <p className="text-gray-700 text-sm">{property?.address}</p>
            </div>
          </div>

          <div
            id="amenities"
            className="prose max-w-none flex flex-col gap-2 mb-12 shadow-md rounded-xl p-3"
          >
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-sm sm:text-md">{property?.description}</p>
          </div>

          {/* Amenities Grid */}
          <div className="mb-12 ">
            <h2 className=" text-2xl ms-4 sm:ms-0  font-bold mb-6 flex items-center gap-3">
              <FaBed className="hidden  sm:block text-blue-500" />
              Amenities
            </h2>
            <div className="grid  grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {property?.amenities?.map((amenity, idx) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  key={idx}
                  className="paddingY-320 flex items-center gap-3 px-4  py-3 sm:py-4 bg-white  rounded-xl shadow-md hover:bg-gray-100 transition-all duration-300"
                >
                  <IoMdSunny className="text-blue-500 hidden-before-320" />
                  <p className="text-xs md:text-[15px] font-semibold ">
                    {amenity}
                  </p>
                  <div id="location"></div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Location Section */}
          <div
            id="policies"
            className=" mb-8 bg-white rounded-xl shadow-md p-6"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg text-blue-500 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
            >
              <FaMapMarkerAlt />
              {property?.address}
            </a>
          </div>

          {/* Policies Section */}
          <div className=" grid md:grid-cols-2 gap-12 bg-white rounded-xl shadow-md py-8 px-4 sm:px-8">
            <div>
              <h2 className="text-2xl ms-4 sm:ms-0  font-bold mb-6 flex items-center gap-3 mt-20">
                <FcRules className=" hidden sm:block text-blue-500" />
                Booking Policies
              </h2>
              <ul className="list-none space-y-3 ">
                {property?.bookingPolicies?.map((policy, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 text-sm sm:text-md "
                  >
                    <span className="text-blue-500 mt-1">•</span>
                    {policy}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl  ms-4 sm:ms-0 font-bold mb-6 flex items-center gap-3  mt-20">
                <FaTimesCircle className="hidden sm:block text-red-500" />
                Cancellation Policy
              </h2>
              <ul className="list-none space-y-3 ">
                {property?.cancellationPolicy?.map((policy, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 text-sm sm:text-md"
                  >
                    <span className="text-red-500 mt-1">•</span>
                    {policy}
                  </li>
                ))}
                <div id="faqs"></div>
              </ul>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="mt-16 mb-12">
            <h2 className="text-2xl ms-4 sm:ms-0 font-bold mb-8 flex items-center gap-3 ">
              <FaQuestionCircle className="text-blue-500" /> FAQ's
            </h2>
            <div className="space-y-4 ">
              {property?.faqs?.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={false}
                  className="border rounded-xl overflow-hidden shadow-md bg-white"
                >
                  <div
                    className="flex justify-between gap-2 items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                    onClick={() => toggleFaq(idx)}
                  >
                    <h3 className="font-semibold text-sm sm:text-lg  ">
                      {faq.question}
                    </h3>
                    {openIndex === idx ? (
                      <FaArrowAltCircleUp className="text-blue-500 text-xl w-8" />
                    ) : (
                      <FaArrowAltCircleDown className="text-gray-400 text-xl w-8" />
                    )}
                  </div>
                  {/* FAQ Answer */}
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 bg-white">
                          <p className="text-gray-700 text-sm sm:text-md">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div id="Review"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Feedback section */}
          <div className="w-full h-auto flex flex-col items-start">
            {/* Heading */}
            <h1 className="text-2xl ms-4 sm:ms-0 font-bold mb-8 flex items-center justify-start">
              <span>
                <i className="fa-solid fa-comment hidden sm:block text-blue-500 me-4"></i>
              </span>
              Feedback Section
            </h1>

            {/* Carousel */}
            <Slider {...settings} className="w-full ">
              {reviews[propertyNameForReview]?.map((review, index) => (
                <div key={index} className="p-2">
                  {review.type === "image" ? (
                    // If type is "image", render an image
                    <div
                      className="flex justify-center"
                      style={{ height: "360px" }}
                    >
                      <img
                        src={review.avatar}
                        alt="Review Image"
                        className="rounded-lg object-fill  w-full h-full"
                      />
                    </div>
                  ) : (
                    // If type is "feedback", render the review card
                    <div
                      style={{ height: "360px" }}
                      className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-full"
                    >
                      {/* User Info */}
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={review.avatar}
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {review.name}
                          </h3>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>

                      {/* Feedback Content */}
                      <p className="text-gray-700 mb-4 text-sm sm:text-md text-justify sm:text-left">
                        {review.feedback}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, star) => (
                          <span key={star} className="text-yellow-500 text-xl">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Right Column - Booking Card (Desktop) */}
        <div className="hidden lg:block  lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="bg-white  h-[auto] border sticky top-28 border-gray-100 rounded-2xl 
                w-full max-w-md mx-auto 
                p-6 space-y-6 
                shadow-xl ring-1 ring-gray-100"
          >
            {/* Price and Booking Button Row */}
            <div className="flex justify-between items-center">
              {/* Price Header */}
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-2xl font-bold text-gray-800">
                  {property.price}
                </span>
                <b className="text-gray-400 text-sm">/Night</b>
                <span className="line-through text-gray-500 text-sm">
                  INR {(property.price * 120) / 100}
                </span>
                <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">
                  SAVE INR {(property.price * 120) / 100 - property.price}
                </span>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="date_card"
                >
                  <h3 className="text-lg font-semibold">Check In</h3>
                  <DatePicker
                    selected={selectedCheckInDate}
                    onChange={(date) => {
                      setSelectedCheckInDate(date);
                      setSelectedCheckOutDate(
                        new Date(date.getTime() + 86400000)
                      ); // Set check-out to next day
                    }}
                    dateFormat="dd MMM yyyy"
                    className="hidden1 border rounded p-2 w-full text-[#112641] font-semibold"
                    minDate={new Date()}
                  />
                </motion.div>

                {/* Check-Out */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="date_card"
                >
                  <h3 className="text-lg font-semibold">Check Out</h3>
                  <DatePicker
                    selected={selectedCheckOutDate}
                    onChange={(date) => setSelectedCheckOutDate(date)}
                    dateFormat="dd MMM yyyy"
                    className="hidden1 border rounded p-2 w-full text-[#112641] font-semibold"
                    minDate={new Date(selectedCheckInDate.getTime() + 86400000)}
                  />
                </motion.div>
              </div>

              {/* Guests */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="date_card"
              >
                <h3 className="text-lg font-semibold">Guest</h3>
                <input
                  type="text"
                  placeholder="Guest"
                  value={guestSummary}
                  className="border rounded p-2 w-full text-[#112641] font-semibold"
                  readOnly
                />
                <div className="bg-white shadow-lg mt-2 p-4 rounded">
                  <ul>
                    {/* Adults Section */}
                    <li className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold mb-0">Adults</p>
                        <p className="text-sm mb-0">12+</p>
                      </div>
                      <div className="quantity-box flex items-center gap-2">
                        <button
                          className="border  px-3 py-1 rounded"
                          onClick={() =>
                            setAdults((prev) => Math.max(1, prev - 1))
                          } // Minimum 1 adult
                        >
                          -
                        </button>
                        <span>{adults}</span>
                        <button
                          className="border px-3 py-1 rounded"
                          onClick={() => setAdults((prev) => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </li>

                    {/* Children Section */}
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold mb-0">Children</p>
                        <p className="text-sm mb-0">6-11</p>
                      </div>
                      <div className="quantity-box flex items-center gap-2">
                        <button
                          className="border px-3 py-1 rounded"
                          onClick={() =>
                            setChildren((prev) => Math.max(0, prev - 1))
                          } // Minimum 0 children
                        >
                          -
                        </button>
                        <span>{children}</span>
                        <button
                          className="border px-3 py-1 rounded"
                          onClick={() => setChildren((prev) => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
            {/* Booking Button */}
            {/* <div>
              <BookingButton property={property}/>
            </div> */}
            <div>
              <button
                type="button"
                onClick={handleBookNow} // Update onClick to handleBookNow
                className="w-full py-3 bg-[#112641] text-white 
                       rounded-xl hover:bg-white hover:text-[#112641] hover:border-[#112641] hover:border
                       transition-colors duration-300 
                       font-medium tracking-wide"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onLogin={() => {
            setShowLoginPopup(false);
            navigate("/login");
          }}
        />
      )}
    </motion.div>
  );
};

const LoginPopup = ({ onClose, onLogin }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white/90 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-[#0F2642] to-blue-600 bg-clip-text text-transparent">
          Login Required
        </h2>
        <p className="text-center mb-8 text-gray-600">
          You need to log in to proceed.
        </p>
        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onLogin}
            className="w-full px-6 py-3 bg-[#0F2642] text-white rounded-xl hover:bg-[#1a3b66] transition duration-200 font-medium"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreMoreITW;
