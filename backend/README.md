<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Overview
This project imports jobs from external APIs, processes them in background using Redis queue, stores them in MongoDB, and shows import history in admin panel.

# Tech Stack
Backend: Node.js, Express, MongoDB, Redis, BullMQ
Frontend: Next.js, Tailwind CSS


# Features
Fetch jobs from multiple external APIs.
XML to JSON conversion.
Background job processing using Redis queue.
Insert or update jobs using MongoDB upsert.
Import history tracking.
Admin panel to view import logs.

# Setup

# Backend Setup
cd backend
npm install
npm start

# create .env file
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=your_mongodb_connection_string
# Redis
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
# Queue
QUEUE_CONCURRENCY=10


# Frontend Setup
cd frontend
npm install
npm run dev

# Usage
Cron job runs every 1 hour automatically.
Jobs are fetched and pushed into Redis queue.
Worker processes jobs and saves them to MongoDB.
Import history is stored in database.
Admin can view import history on frontend page.

# API to get import logs:
Get: http://localhost:5000/api/importLogRoutes

# How to Run Tests
Start backend and frontend,
Check cron logs in backend console.
Open admin panel and verify import history data.
Test pagination using page query.

# Status
Backend working
Frontend working
Import history visible
Ready for submission


>>>>>>> e542c1d (job processing backend)
