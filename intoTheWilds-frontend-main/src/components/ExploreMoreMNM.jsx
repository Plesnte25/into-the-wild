import { useState, useEffect } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import img4 from "../assets/majuli/Property Photo/006.jpg";
import img2 from "../assets/majuli/Property Photo/002.jpg";
import img3 from "../assets/majuli/Property Photo/005.jpg";
import img1 from "../assets/majuli/Property Photo/004.jpg";
import BookingButton from "./BookingButton";

// const handleBookNow = () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };

const galleryImages = [img1, img2, img3, img4];

const property = {
    checkInDate: "2024-12-01",
    checkOutDate: "2024-12-03",
    price: 3500,
  }
;

const faqs = [
  {
    question: "Is Driver and/or House-Help accommodation available?",
    answer:
      "Driver accommodation depends upon the first come first serve basis. It is available at nominal charges. A small room or bunk bed with dinner and breakfast will be provided just nearby the property.",
  },
  {
    question: "Is parking available onsite or nearby?",
    answer:
      "Free parking is available onsite. There is ample car parking for 4-5 cars at the site.",
  },
  {
    question: "Is the Property suitable for a day picnic?",
    answer:
      "Yes, the home has a garden/lawn area within the premises that could be used for outdoor picnic activities. Meals will be provided on-site at an additional charge (per person, per meal).",
  },
  {
    question: "Is property pet friendly?",
    answer:
      "We're happy to welcome your furry friends at Me:nam Homestay! Please bring a pet bed along, as pets aren't allowed on guest beds or any linen. Enjoy a comfortable stay for you and your pet in the heart of nature!",
  },
];

const bookingPolicies = [
  "Check in: 1 PM check out: 11 AM",
  "Guests are requested to shut the windows and doors during the evening as the property may be prone to insects and bugs.",
  "Guests are not allowed to spill food or drinks over the upholstery or they will be charged at checkout.",
  "Please be mindful and keep the noise to a minimum after 10 PM.",
  "Passport, Aadhar, Driving License, and Govt. ID are accepted as ID proof(s).",
  "The property allows private parties or events.",
];

const cancellationPolicy = [
  "Cancellation 12 days prior to arrival date: 15% will be charged.",
  "Cancellation 07 days prior to arrival date: 50% will be charged.",
  "Cancellation less than a week: Full retention would be applicable.",
  "Credit/Debit card cancellations will be charged 5% extra.",
  "Cancellation policy for long weekends and special days: Cancellation 07 days prior to arrival date: 50% will be charged. Cancellation less than a week: Full retention would be applicable.",
];

const amenities = [
  "Essentials",
  "Towels and toiletries",
  "Add-on experience",
  "Private entrance",
  "Serene location.",
  "Pet friendly",
  "In-house chef/caretaker ",
  "Cozy linens",
  "Bluetooth sound system ",
  "Wi-Fi ",
  "Private cottage ",
  "Garden",
  "Breakfast",
];

const ExploreMoreMNM = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-yellow-100/50 px-4 sm:px-6 lg:px-32 py-48 sm:py-20 lg:py-40 text-black">
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Hero Section */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight text-center lg:text-left">
            Me:nam Homestay
            <br />
            <span className="text-green-700">Majuli</span>
          </h1>

          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-base sm:text-xl text-gray-700 font-medium">
              Majuli
            </span>
          </div>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
            Welcome to Me:nam Homestay, nestled on Majuli Island, the
            world&apos;s largest river island and a cultural treasure in Assam.
            Run by the owner herself, this homestay offers a warm, local touch,
            giving guests an unforgettable experience. From meeting locals to
            exploring traditional crafts and customs, Me:nam Homestay is your
            gateway to the authentic heart of Majuli—an island rich in natural
            beauty, vibrant festivals, and deep-rooted traditions.
          </p>

          <div className="flex justify-center lg:justify-start">
            {/* <button
              onClick={handleBookNow}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Book Now
            </button> */}
            <BookingButton property={property} />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {galleryImages?.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden  shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="mt-12 sm:mt-16 bg-opacity-15 backdrop-blur-lg p-6 md:p-8 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 border-b border-gray-300 pb-4">
          Property Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100/50 p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h1m4 0h1m-6 3v-16"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Cottages</p>
              <p className="text-gray-600">HomeStay</p>
            </div>
          </div>

          <div className="bg-gray-100/50 p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Guest Capacity</p>
              <p className="text-gray-600">4 persons per cottage</p>
            </div>
          </div>

          <div className="bg-gray-100/50 p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Maximum Capacity</p>
              <p className="text-gray-600">30 persons</p>
            </div>
          </div>

          <div className="bg-gray-100/50 p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Price Per Cottage</p>
              <p className="text-gray-600">₹3500 per night</p>
            </div>
          </div>

          <div className="bg-gray-100/50 p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Location</p>
              <a
                href="https://maps.app.goo.gl/2hFapb8AaZGa59717"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          <div className="bg-gray-100/50 p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h1m4 0h1m-6 3v-16"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Address</p>
              <p className="text-gray-600">
                Me:nam Homestay,
                Jengrai Chapori Road,
                Kesaikhua Gaon, Moghua Chuk,
                Majuli, Assam - 785105
                India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Things to Do Section */}
      <div className="mt-12 sm:mt-16 bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          Things to Do at Me:nam Homestay
        </h2>
        <ul className="list-disc ml-4 sm:ml-6 space-y-2 sm:space-y-3">
          <li>Boating: Glide along the serene Brahmaputra River.</li>
          <li>
            Mask Making: Discover Majuli&apos;s traditional art of handmade
            masks.
          </li>
          <li>
            Pottery Village: Visit local artisans crafting pottery by hand.
          </li>
          <li>
            Apong Making: Learn to make Apong, Assam&apos;s unique rice beer.
          </li>
          <li>
            Weaving: Watch intricate weaving techniques by local craftsmen.
          </li>
          <li>
            Village Walk: Stroll through picturesque villages, meeting locals
            and experiencing daily life.
          </li>
        </ul>
      </div>

      {/* FAQs Section */}
      <div className="mt-12 sm:mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          FAQs
        </h2>
        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg font-medium">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <FaArrowAltCircleUp className="text-base sm:text-xl" />
                ) : (
                  <FaArrowAltCircleDown className="text-base sm:text-xl" />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Amenities Section */}
      <div className="mt-12 sm:mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          Amenities
        </h2>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 rounded-lg shadow-xl">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {amenities.map((amenity, index) => (
              <li
                key={index}
                className="text-black flex items-center space-x-2"
              >
                <span className="inline-block w-2.5 h-2.5 bg-teal-400 rounded-full"></span>
                <span className="text-sm sm:text-base">{amenity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Booking Policies Section */}
      <div className="mt-12 sm:mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          Booking Policies
        </h2>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 rounded-lg shadow-xl">
          <ul className="list-disc ml-4 sm:ml-6 space-y-2 sm:space-y-3">
            {bookingPolicies.map((policy, index) => (
              <li key={index} className="text-black text-sm sm:text-base">
                {policy}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cancellation Policy Section */}
      <div className="mt-12 sm:mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          Cancellation Policy
        </h2>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 rounded-lg shadow-xl">
          <ul className="list-disc ml-4 sm:ml-6 space-y-2 sm:space-y-3">
            {cancellationPolicy.map((policy, index) => (
              <li key={index} className="text-black text-sm sm:text-base">
                {policy}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExploreMoreMNM;
