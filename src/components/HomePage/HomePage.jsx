import React from 'react'

function HomePage() {
  return (
    <div>
        <h1>Welcome to HabitQuest</h1>
        <p>Track your habits and join challenges with others</p>
        <div>
            <a href="/challenges">Browse Challenges</a>
            <a href="/dashboard">My Dashboard</a>
        </div>
    </div>
  )
}

export default HomePage