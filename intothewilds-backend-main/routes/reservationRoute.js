const express = require("express");
const router = express.Router();
const {
  getuserbookings,
  updateBookingStatus,
} = require("../controller/bookingController");

router.route('/userBookings').get(getuserbookings);
router.route('/:id').patch(updateBookingStatus);

const protect = (req, res, next) => {
    // Example: Check if user is authenticated
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Not authorized" });
};

const admin = (req, res, next) => {
    // Example: Check if user has admin role
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: "Admin access required" });
};

const getByRange = (req, res) => {
    const range = req.params.range;
    // Example: Fetch reservations by range (implement your logic here)
    // For demonstration, return the range param
    res.json({ message: `Fetching reservations for range: ${range}` });
};

router.get('/range/:range', protect, admin, getByRange);

module.exports = router;