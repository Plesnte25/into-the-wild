import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { BadgeCheck } from "lucide-react";

import razorPay from "../assets/razorpay.png";
import { BASE_URL } from "../utils/baseurl";

/**
 * Checkout – fully responsive version
 * -----------------------------------
 * • Mobile (< md): single‑column flow
 * • Tablet (md): two columns  (form + summary)
 * • Desktop (lg): three logical areas with generous spacing
 */

export default function Checkout() {
  /* ----------------------- routing & state ----------------------- */
  const location = useLocation();
  const bookingData = location.state;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [loading, setLoading] = useState(false);
  const [razorpayChecked, setRazorpayChecked] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");

  const [selectedCheckInDate, setSelectedCheckInDate] = useState(
    new Date(bookingData?.checkIn)
  );
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(
    new Date(bookingData?.checkOut)
  );

  const [adults, setAdults] = useState(bookingData?.adults || 1);
  const [children, setChildren] = useState(bookingData?.children || 0);

  /* ----------------- price calculations ----------------- */
  const checkInDate = new Date(selectedCheckInDate);
  const checkOutDate = new Date(selectedCheckOutDate);
  const numberOfGuests = adults + children;
  const guestCapacity = bookingData?.property?.guestCapacity;
  const numberOfRooms = Math.ceil(numberOfGuests / guestCapacity);
  const dailyRate = bookingData?.property?.price;
  const totalDays =
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);

  const billingDetails = Array.from({ length: totalDays }).map((_, i) => {
    const d = new Date(checkInDate);
    d.setDate(d.getDate() + i);
    return { date: d.toLocaleDateString(), amount: dailyRate * numberOfRooms };
  });

  const totalAmount = billingDetails.reduce((t, b) => t + b.amount, 0);
  const tax = +(totalAmount * 0.18).toFixed(0);
  const finalAmount = totalAmount + tax;
  const payAmount = +(finalAmount * 0.2).toFixed(0);

  /* ----------------- util helpers ----------------- */
  const formatDateVerbose = (date) =>
    date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  /* ----------------- razorpay script ----------------- */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* ----------------- payment flow ----------------- */
  async function handlePayment() {
    if (!fullName || !email || !phone) {
      toast.error("Please fill all required fields");
      return;
    }
    if (/^\d{10}$/.test(phone) === false) {
      toast.error("Enter a valid 10‑digit phone number");
      return;
    }
    if (selectedCheckOutDate <= selectedCheckInDate) {
      toast.error("Check‑out must be after check‑in");
      return;
    }

    try {
      setLoading(true);
      const resp = await axios.post(`${BASE_URL}/booking/new-booking`, {
        checkInDate: selectedCheckInDate,
        checkOutDate: selectedCheckOutDate,
        amount: payAmount,
        adults,
        children,
        user: user ? user._id : null,
        userDetails: { fullName, email, phone, specialRequirements },
        property: bookingData.property?._id,
      });
      initPayment(resp.data.order, resp.data.booking._id);
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  function initPayment(order, bookingId) {
    const rzp = new window.Razorpay({
      key: "rzp_test_S7O9aeETo3NXrl",
      ...order,
      name: "Into The Wilds",
      handler: async (res) => {
        try {
          await axios.post(`${BASE_URL}/booking/verify-payment`, {
            ...res,
            bookingId,
          });
          toast.success("Payment Successful");
          window.location.reload();
        } catch (e) {
          toast.error(e.response?.data?.message || "Verification failed");
        }
      },
    });
    rzp.open();
  }

  /* ----------------- UI ----------------- */
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 text-black">
      {/* heading */}
      <header className="mb-10 space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-bold">Review Your Booking</h1>
        <p className="text-xl text-gray-600">Information</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1fr_400px]">
        {/* ------------- LEFT COLUMN (property + form) ------------- */}
        <div className="space-y-8">
          {/* property card */}
          <div className="flex flex-col md:flex-row gap-6 rounded-xl overflow-hidden border shadow-sm">
            <img
              src={bookingData.property.images[0]}
              alt={bookingData.property.name}
              className="w-full md:w-60 h-60 object-cover"
            />
            <div className="p-6 space-y-4 flex-1">
              <div>
                <h2 className="text-xl font-semibold">
                  {bookingData?.property?.name}
                </h2>
                <p className="text-gray-600">
                  {bookingData?.property?.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-600">CHECK‑IN</p>
                  <DatePicker
                    selected={selectedCheckInDate}
                    onChange={setSelectedCheckInDate}
                    dateFormat="dd MMM yyyy"
                    className="border rounded w-full p-2 mt-1"
                    minDate={new Date()}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-600">CHECK‑OUT</p>
                  <DatePicker
                    selected={selectedCheckOutDate}
                    onChange={setSelectedCheckOutDate}
                    dateFormat="dd MMM yyyy"
                    className="border rounded w-full p-2 mt-1"
                    minDate={selectedCheckInDate || new Date()}>
                  </DatePicker>
                </div>
              </div>

              <p className="text-sm">
                {adults} Adult{adults > 1 && "s"}, {children} Child
                {children !== 1 && "ren"}
              </p>

              {/* guest counters */}
              <div className="flex gap-6">
                {[
                  {
                    label: "Adults",
                    value: adults,
                    set: setAdults,
                    min: 1,
                  },
                  {
                    label: "Children",
                    value: children,
                    set: setChildren,
                    min: 0,
                  },
                ].map(({ label, value, set, min }) => (
                  <div key={label} className="text-center">
                    <p className="font-semibold text-gray-600 mb-1">{label}</p>
                    <div className="inline-flex items-center border rounded overflow-hidden">
                      <button
                        onClick={() => set(Math.max(min, value - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200"
                      >
                        −
                      </button>
                      <span className="w-10 text-center">{value}</span>
                      <button
                        onClick={() => set(value + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600">
                Capacity / {bookingData?.property?.cottage ? "Cottage" : "Room"}
                : {guestCapacity} • Rooms booked: {numberOfRooms}
              </p>
            </div>
          </div>

          {/* guest form */}
          <div className="rounded-lg shadow-lg p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-semibold">Guest Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full Name*" value={fullName} onChange={setFullName} />
              <Input
                label="Mobile Number*"
                type="tel"
                value={phone}
                onChange={setPhone}
              />
              <Input label="Email Address*" value={email} onChange={setEmail} />
              <Input
                label="Special Requirements"
                as="textarea"
                rows={1}
                value={specialRequirements}
                onChange={setSpecialRequirements}
              />
            </div>
          </div>
        </div>

        {/* ------------- RIGHT COLUMN (summary) ------------- */}
        <aside className="h-max rounded-lg shadow-lg p-6 md:p-8 space-y-6">
          <h2 className="text-2xl font-semibold border-b pb-4">
            Your Reservation
          </h2>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {billingDetails.map((b) => (
              <Row key={b.date} label={formatDateVerbose(new Date(b.date))} value={b.amount} />
            ))}
          </div>

          <Row label="Subtotal" value={totalAmount} bold />
          <Row label="Tax (18%)" value={tax} />
          <Row label="Total" value={finalAmount} bold topBorder />
          <Row label="Pay Now (20%)" value={payAmount} bold />

          {/* razorpay checkbox */}
          <label className="flex items-center gap-2 border px-3 py-2 rounded cursor-pointer">
            <input
              type="checkbox"
              checked={razorpayChecked}
              onChange={() => setRazorpayChecked(!razorpayChecked)}
              className="h-5 w-5 text-cyan-600"
            />
            <img src={razorPay} alt="Razorpay" className="w-24" />
          </label>

          <button
            type="button"
            disabled={loading || !razorpayChecked}
            onClick={handlePayment}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors
            ${loading || !razorpayChecked ? "bg-cyan-300 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-700"}`}
          >
            {loading ? "Processing…" : "Pay & Confirm Reservation"}
          </button>

          <div className="space-y-2 text-sm">
            <h3 className="text-lg font-semibold">Why Sign Up or Login?</h3>
            {[
              "Get access to secret deals",
              "Manage your bookings in one place",
            ].map((t) => (
              <p key={t} className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-cyan-600" /> {t}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

/* -------------------- helpers -------------------- */
function Input({ label, as = "input", value, onChange, ...rest }) {
  const Tag = as;
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-semibold text-gray-700">{label}</span>
      <Tag
        className="border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </label>
  );
}

function Row({ label, value, bold, topBorder }) {
  return (
    <div
      className={`flex justify-between items-center gap-6 ${
        topBorder && "pt-4 border-t"
      } ${bold ? "font-semibold" : "text-gray-700"}`}
    >
      <span>{label}</span>
      <span>Rs. {value}</span>
    </div>
  );
}
