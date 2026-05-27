const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(
process.env.MONGO_URI,
{
serverSelectionTimeoutMS: 5000
}
)

.then(() => {
console.log("✅ Mongo Connected");
})

.catch((err) => {
console.log("Mongo Error:", err.message);
});


// Models
const User = mongoose.model(
"User",
{
name: String,
email: String,
phone: String,
password: String
}
);

const Ride = mongoose.model(
"Ride",
{
driver: String,
vehicle: String,
pickup: String,
destination: String,
seats: String,
price: String
}
);

const Booking = mongoose.model(
"Booking",
{
name: String,
phone: String,
distance: Number,
fuel: Number,
cost: Number,
co2: Number,
time: Date
}
);


// Test
app.get("/", (req, res) => {
res.send("🚗 Backend Running");
});


// Register
app.post("/register", async (req, res) => {

try {

await User.create(req.body);

res.json({
message: "✅ Registration Successful"
});

}

catch (err) {

res.status(500).json({
message: "Registration Failed"
});

}

});


// Login
app.post("/login", async (req, res) => {

try {

let found = await User.findOne({
email: req.body.email,
password: req.body.password
});

res.json({
success: !!found,
name: found?.name
});

}

catch {

res.json({
success: false
});

}

});


// Post Ride
app.post("/ride", async (req, res) => {

try {

await Ride.create(req.body);

res.json({
message: "Ride Posted"
});

}

catch {

res.json({
message: "Failed"
});

}

});


// Get Rides
app.get("/rides", async (req, res) => {

let rides = await Ride.find();

res.json(rides);

});


// Booking
app.post(
"/book",

async(req,res)=>{

try{

await Booking.create({

name:req.body.name,

phone:req.body.phone,

distance:Number(req.body.distance),

fuel:Number(req.body.fuel),

cost:Number(req.body.cost),

co2:Number(req.body.co2),

time:new Date()

});

res.json({

message:
"✅ Ride Confirmed"

});

}

catch(err){

console.log(err);

res.status(500).json({

message:
"Booking Failed"

});

}

}

);

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(`🚗 Backend running on ${PORT}`);

});