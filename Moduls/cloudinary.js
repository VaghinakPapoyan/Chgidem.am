import cloudinary from "cloudinary"
import dotenv from "dotenv"

dotenv.config();

const cloud = cloudinary.v2;
cloud.config({
    cloud_name: process.env.cloudinaryCloudName,
    api_key: process.env.cloudinaryApiKey,
    api_secret: process.env.cloudinaryApiSecret
})
export default cloud