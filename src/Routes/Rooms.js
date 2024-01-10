import express from "express";
import hallController from "../Controller/Rooms.js"
const router = express.Router()

router.post("/create",hallController.createRoom)
router.post("/bookroom",hallController.BookRoom)
router.get("/",hallController.getRooms)
router.get("/bookedrooms",hallController.getBookedrooms)
router.get("/customers",hallController.getCustomersbookings)
router.get("/bookingcount/:CustomerName",hallController.getBookingCount)

export default router