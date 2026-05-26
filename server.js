const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());



mongoose.connect(
"mongodb://localhost:27017/carpoolconnect",
{
serverSelectionTimeoutMS:5000
}
)

.then(()=>{

console.log(
"✅ Mongo Connected"
);

})

.catch((err)=>{

console.log(
"Mongo Error:",
err.message
);

});




const User = mongoose.model(

"User",

{

name:String,

email:String,

phone:String,

password:String

}

);



const Ride = mongoose.model(

"Ride",

{

driver:String,

vehicle:String,

pickup:String,

destination:String,

seats:String,

price:String

}

);



const Booking = mongoose.model(

"Booking",

{

name:String,

phone:String,

distance:Number,

fuel:Number,

cost:Number,

co2:Number,

time:Date

}

);




app.get("/",(req,res)=>{

res.send(
"🚗 Backend Running"
);

});




app.post(

"/register",

async(req,res)=>{

try{

await User.create(
req.body
);

res.json({

message:

"✅ Registration Successful"

});

}

catch{

res.json({

message:

"Registration Failed"

});

}

}

);




app.post(

"/login",

async(req,res)=>{

try{

let found=

await User.findOne({

email:
req.body.email,

password:
req.body.password

});



res.json({

success:
!!found,

name:
found?.name

});

}

catch{

res.json({

success:false

});

}

}

);




app.post(

"/ride",

async(req,res)=>{

try{

await Ride.create(
req.body
);

res.json({

message:

"Ride Posted"

});

}

catch{

res.json({

message:

"Failed"

});

}

}

);




app.get(

"/rides",

async(req,res)=>{

let rides=

await Ride.find();

res.json(
rides
);

}

);




app.post(

"/book",

async(req,res)=>{

try{

await Booking.create({

...req.body,

time:new Date()

});



res.json({

message:

"Ride Confirmed"

});

}

catch{

res.json({

message:

"Booking Failed"

});

}

}

);




app.listen(

3000,

()=>{

console.log(

"🚗 Backend running"

);

}

);