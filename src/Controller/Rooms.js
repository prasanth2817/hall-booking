const Rooms = [];
const BookedRooms = [];
const CustomerBookings = [];

const createRoom = (req, res) => {
  try {
    let roomData = {
      RoomId: req.body.RoomId,
      Amenities: req.body.Amenities,
      Capacity: req.body.Capacity,
      Price: req.body.Price,
      status: "Available",
      CustomerName: "",
      Date: "",
      StartTime: "",
      EndTime: "",
    };
    Rooms.push(roomData);
    res.status(200).send({ message: "Room created sucessfully", Rooms });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const BookRoom = (req, res) => {
  try {
    const roomIdToBook = parseInt(req.body.RoomId);

    const roomToBook = Rooms.find((room) => room.RoomId === roomIdToBook);

    if (roomToBook) {
      if (roomToBook.status === "Available") {
        roomToBook.status = "Occupied";
        roomToBook.CustomerName = req.body.CustomerName;
        roomToBook.Date = req.body.Date;
        roomToBook.StartTime = req.body.StartTime;
        roomToBook.EndTime = req.body.EndTime;

        if (!roomToBook.CustomerBookings) {
          roomToBook.CustomerBookings = [];
        }

        roomToBook.CustomerBookings.push({
          CustomerName: req.body.CustomerName,
          Date: req.body.Date,
          StartTime: req.body.StartTime,
          EndTime: req.body.EndTime,
        });

        res.status(200).send({ message: "Room Booked Successfully" });
      } else {
        res
          .status(400)
          .send({ message: `Room ${roomIdToBook} is already booked` });
      }
    } else {
      res.status(404).send({ message: `Room ${roomIdToBook} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const getRooms = (req, res) => {
  try {
    if (Rooms.length) {
      res.status(200).send({ message: "Rooms Data Fetched", Rooms });
    } else res.status().send({ message: "NO Rooms are Created" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getBookedrooms = (req, res) => {
  try {
    Rooms.map((e) => {
      if (e.status == "Occupied") {
        BookedRooms.push({
          RoomId: e.RoomId,
          status: e.status,
          CustomerName: e.CustomerName,
          Date: e.Date,
          StartTime: e.StartTime,
          EndTime: e.EndTime,
        });
      }
    });
    res.status(200).send({ message: "Booked Rooms Data Fetched", BookedRooms });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const getCustomersbookings = (req, res) => {
  try {
    Rooms.map((e) => {
      if (e.status == "Occupied") {
        CustomerBookings.push({
          CustomerName: e.CustomerName,
          RoomId: e.RoomId,
          Date: e.Date,
          StartTime: e.StartTime,
          EndTime: e.EndTime,
        });
      }
    });
    res
      .status(200)
      .send({ message: "Booked Customers Data Fetched", CustomerBookings });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const getBookingCount = (req, res) => {
  try {
    const {CustomerName } = req.params;
    if (!CustomerName) {
      return res
        .status(400)
        .send({ message: "CustomerName parameter is missing" });
    }
    const bookingCount = Rooms.reduce((count, room) => {
      const customerBookings = room.CustomerBookings.filter(
        (booking) => booking.CustomerName === CustomerName
      );
      return count + customerBookings.length;
    }, 0);

    res.status(200).send({
      message: `Booking count for ${CustomerName}: ${bookingCount}`,
      bookingCount: bookingCount,
      CustomerBookings:CustomerBookings
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

export default {
  createRoom,
  BookRoom,
  getRooms,
  getBookedrooms,
  getCustomersbookings,
  getBookingCount,
};
