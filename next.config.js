require('dotenv').config()

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_MOCK_BASE_URL: process.env.API_MOCK_BASE_URL,
  }
}
