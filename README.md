# Instagram Clone (Mini Social Media Service)

## Project Overview
This is a **mini social media service** inspired by Instagram. Users can **register, login, create posts with images, comment, like, update profiles**, search for other users, and interact in real-time via **chat (WebSocket)**. All data is stored in **MongoDB** and managed with **Mongoose**.

## Features
- **Authentication & Authorization**: JWT-based registration and login, password hashing with bcrypt.
- **User Profiles**: View and edit profile, upload avatar images (Base64).
- **Posts**: CRUD operations for posts with images (Base64), likes, and comments.
- **Search**: Search for users by name or username, Explore feed with random posts.
- **Subscriptions**: Follow/unfollow users, list followers and followings.
- **Notifications**: Alerts for likes, comments, and new followers.
- **Real-time Chat**: WebSocket-based messaging using `socket.io`.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, multer, socket.io  
- **Frontend**: React.js, Redux, React Hooks, useState, useEffect, FormData for file uploads  
- **Deployment & Tools**: dotenv for environment variables, GitHub for version control

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd instagram-clone
