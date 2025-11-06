# HabitQuest Frontend

This is the **frontend** of HabitQuest, a habit tracking and challenge application. It allows users to join challenges, track daily progress, and interact with other users.

## Built With

- React.js
- React Router
- Axios
- SCSS for styling
- Vite (or Create React App)

## Features

- User authentication (Login & Sign Up)
- Browse all challenges
- Join or leave challenges
- Add daily progress for joined challenges
- Create and edit challenges (for creators)
- Responsive design with modern UI


---


### Installation

To install frontend dependencies and run the development server, navigate to the frontend folder, install dependencies, and start the server:

```bash
cd habitquest-frontend
npm install
npm run dev
```
---

### API Endpoints
```
| Method | Endpoint                            | Description              |
| ------ | ----------------------------------- | ------------------------ |
| POST   | /api/signup/                        | Sign up a new user       |
| POST   | /api/login/                         | Login and get JWT tokens |
| GET    | /api/challenges/                    | List all challenges      |
| POST   | /api/challenges/                    | Create a new challenge   |
| GET    | /api/challenges/:id/                | Get a single challenge   |
| PUT    | /api/challenges/:id/                | Update a challenge       |
| DELETE | /api/challenges/:id/                | Delete a challenge       |
| POST   | /api/challenges/:id/participations/ | Join a challenge         |
| DELETE | /api/challenges/:id/leave/          | Leave a challenge        |
| POST   | /api/progress/                      | Add progress             |

```

## User Stories

### As a Guest
- I want to sign up for an account so that I can join challenges and track my habits.
- I want to log in to my account so that I can access my dashboard and progress.
- I want to browse all available challenges without logging in, to see what the app offers.

### As a Registered User
- I want to browse all challenges and see their details so that I can decide which one to join.
- I want to join a challenge so that I can track my progress.
- I want to leave a challenge if I am no longer participating.
- I want to add daily progress for challenges I have joined.
- I want to view my progress in a list to track my achievements.
- I want to access a dashboard where I can see all my joined challenges and progress.
- I want to log out to secure my account.

### As a Challenge Creator (Admin or User)
- I want to create a new challenge with a title, description, start date, and end date.
- I want to edit a challenge I created to update information.
- I want to delete a challenge I created if it is no longer relevant.
- I want to view a list of participants in my challenge.

### Bonus Features / Future Stories
- As a user, I want to see a dynamic “animated text” on the homepage that guides me through app features.
- As a user, I want to receive notifications when challenges are ending or when I reach milestones.
- As a user, I want to filter challenges by categories or duration.
- As a challenge creator, I want to see analytics about participant progress.


