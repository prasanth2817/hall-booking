import express from 'express'
import RoomsRoutes from "./Rooms.js"
const router= express.Router()

router.use("/rooms",RoomsRoutes)

export default router