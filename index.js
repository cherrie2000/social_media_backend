const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

dotenv.config();
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
   
  ).then(() => console.log('Connected Successfully'))

  .catch((err) => { console.error(err); });

  app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.get("/", (req,res)=>{
  res.send("hello");
});

app.use("/api/users",userRoute)
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(8800, () => {
    console.log("Backend server is running!");
  });