// controllers/dashboardController.js
const Booking = require('../models/Booking');
const Property = require('../models/Properties');
const User = require('../models/User');

exports.getOverviewData = async (req, res) => {
  try {
    console.log("reached here");
    const totalBookings = await Booking.countDocuments();
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });
    const onlineBookings = await Booking.countDocuments({ tour: { $exists: false } });
    const offlineBookings = await Booking.countDocuments({ tour: { $exists: true } });
    const totalProperties = await Property.countDocuments();
    const totalVisitors = await User.countDocuments({ role: 'user' });
    const totalLocations = await Property.distinct('location');
    const totalPartners = await User.countDocuments({ role: 'admin' });

    // Aggregate monthly revenue and expenses (dummy logic based on checkOutDate)
    const revenueStats = await Booking.aggregate([
      {
        $match: { status: 'confirmed' }
      },
      {
        $group: {
          _id: { $month: "$checkOutDate" },
          revenue: { $sum: "$amount" },
          expenses: { $sum: { $multiply: ["$amount", 0.4] } } // Assume 40% expense
        }
      },
      {
        $project: {
          month: "$_id",
          revenue: 1,
          expenses: 1,
          _id: 0
        }
      },
      { $sort: { month: 1 } }
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const revenueData = months.map((month, index) => {
      const found = revenueStats.find(item => item.month === index + 1);
      return {
        month,
        revenue: found?.revenue || 0,
        expenses: found?.expenses || 0
      };
    });

    const response = {
      kpis: [
        { label: "Total Bookings", value: totalBookings },
        { label: "Cancelled", value: cancelledBookings },
        { label: "Total Properties", value: totalProperties },
        { label: "Total Visitors", value: totalVisitors },
        { label: "Online Bookings", value: onlineBookings },
        { label: "Offline Booking", value: offlineBookings },
        { label: "Total Location", value: totalLocations.length },
        { label: "Partners", value: totalPartners }
      ],
      revenueData
    };

    res.status(200).json(response);
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

exports.getAllPropertiesAdmin = async (req, res) => {
  try {
    const properties = await Property.find().select("name location address price cottage bedroom guestCapacity maximumCapacity tags");
    const formatted = properties.map((p, idx) => ({
      id: p._id,
      name: p.name,
      location: p.location,
      owner: "John Doe", // Placeholder; update once owner is implemented
      status: idx % 4 === 0 ? "Pending" : "Live", // Example dynamic status
      rooms: p.bedroom,
      contact: "+91 9876543210", // Placeholder
      occupied: Math.floor(Math.random() * p.bedroom),
      vacant: Math.max(0, p.bedroom - Math.floor(Math.random() * p.bedroom))
    }));
    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};