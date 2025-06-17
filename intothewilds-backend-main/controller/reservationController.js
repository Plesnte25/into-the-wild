const Booking = require("../models/Booking");
const catchSync = require("../utils/catchAsync");

// GET /api/v1/bookings/userbookings?range=week
exports.getUserBookings = catchSync(async (req, res) => {
  const { range = "month" } = req.query; //Current month
  const start = dayjs().startOf(range);
  const end = dayjs().endOf(range);
  const docs = await Booking.find({
    createdAt: { $gte: start.toDate(), $lte: end.toDate() },
  }).populate("property user");
  res
    .status(200)
    .json({ status: "success", results: docs.length, datat: docs });
});

// PATCH /api/v1/bookings/:id
exports.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true,
});
if (!doc)
  return res.status(404).json({ status: "fail", message: "No Booking" });
res.status(200).json({ status: "success", data: doc });


exports.updateBooking = async (req, res) => {
  const { status, checkoutDate } = req.body;
  const update = {};
  if (status) update.status = status;
  if (checkoutDate) update.checkoutDate = checkoutDate;
  const bk = await Booking.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });
  res.json(bk);
};
