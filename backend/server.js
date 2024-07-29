import app from "./app.js";
import clouadinary from "cloudinary";

clouadinary.v2.config({
  cloud_name: process.env.CLOUDDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDDINARY_API_KEY,
  api_secret: process.env.CLOUDDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`server rinnig ${process.env.PORT}`);
});
