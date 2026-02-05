# 🚀 Job Application Tracker

A full-stack, professional Kanban board application designed to streamline the career search process. Built with the Next.js 15 App Router, TypeScript, and MongoDB, this tool allows users to track their job hunt from initial interest to final offer.



## ✨ Features

* **Interactive Kanban Board:** Manage your applications through stages: "Wish List", "Applied", "Interviewing", "Offer", and "Rejected".
* **Real-time CRUD Operations:** Seamlessly add, update, and delete job applications using Next.js Server Actions.
* **Automatic Board Initialization:** New users are automatically provisioned with a default "Job Hunt" board and standard recruitment columns upon sign-up.
* **Smart Data Management:** * **Tags:** Categorize applications with custom, color-coded tags.
    * **Detailed Tracking:** Store company info, salary, job URLs, location, and personal notes.
    * **Automatic Ordering:** Applications are automatically ordered within columns for better organization.
* **Secure Authentication:** Powered by **Better-Auth** with MongoDB adapters and session-based security.
* **Responsive UI:** Crafted with Tailwind CSS, Lucide icons, and Shadcn/UI components for a polished look.

## 🛠️ Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
* **Auth:** [Better-Auth](https://www.better-auth.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
* **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
├── app/
│   ├── dashboard/          # Main board view (Server Component)
│   ├── sign-in/ sign-up/   # Better-Auth powered auth pages
│   └── page.tsx            # Landing page with feature tabs
├── components/
│   ├── kanban-board.tsx    # Main board logic
│   ├── job-application-card.tsx # Individual job card UI
│   ├── create-job-dialog.tsx    # Modal for adding applications
│   └── navbar.tsx          # Responsive navigation & session handling
├── lib/
│   ├── actions/            # Server Actions (Job CRUD logic)
│   ├── auth/               # Better-Auth server and client config
│   ├── models/             # Mongoose Schemas (Board, Column, JobApplication)
│   └── db.ts               # MongoDB connection utility

```

## 📋 Data Model

The application follows a structured relational hierarchy within MongoDB:

* **Board:** The root container for a user's job hunt.
* **Column:** Represents a stage (e.g., "Applied"). It contains an array of Job Application references.
* **Job Application:** Contains specific details about the role and the company.

## 🚀 Getting Started

### 1. Prerequisites

* Node.js 18.x or higher
* A MongoDB Atlas account or a local MongoDB instance

### 2. Installation

```bash
# Clone the repository
git clone [https://github.com/your-username/job-application-tracker.git](https://github.com/your-username/job-application-tracker.git)

# Install dependencies
npm install

```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000

```

### 4. Development

```bash
npm run dev

```

Navigate to `http://localhost:3000` to see the application.

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 🌐 Live Demo

You can explore a live version of the BOOKHIVE Digital Library System here:

**[https://job-tracker-9cry.vercel.app/](https://job-tracker-9cry.vercel.app/)**
