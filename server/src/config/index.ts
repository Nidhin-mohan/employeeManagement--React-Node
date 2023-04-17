import dotenv from "dotenv";

dotenv.config();

const config = {
 
  PORT: process.env.PORT!,
  SITE_URL: process.env.SITE_URL,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
 
};

export default config;
