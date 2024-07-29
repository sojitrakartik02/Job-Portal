import mongoose from "mongoose";

export const Conn = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Job_Portal",
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Error in DB connection", err);
    });
};
