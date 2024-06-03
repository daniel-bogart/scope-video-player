# Scope Video Player

## Overview

Hello! Thank you for taking the time to have a look at my project! This project is designed to resemble a an educational website like MasterClass or FrontendMasters that is particularly geared towards climbing. It is meant to be user-friendly, easy to navigate, pleasant to use for the users. For engineers, it is meant to be readable, modular, and easy to build on.

## Key Features

- **Video Browsing**: A sleek interface allows users to effortlessly browse and select from a comprehensive list of educational videos.
- **Video Creation**: Allows users to contribute to the educational community by uploading their educational climbing content, complete with titles, descriptions, and media elements.
- **Comments**: Each video allows users to comment and share theirs thoughts.
- **Custom Video Player**: Developed from scratch, the video player includes:
  - **Adjustable Playback Controls**: Users can adjust the volume, change the playback speed, and navigate through the video with a custom-built progress bar.
  - **Quick Navigation Buttons**: Enables users to skip forward or rewind the video by ten seconds.
  - **Fullscreen Capability**: Maximizes user engagement by supporting fullscreen mode for distraction-free viewing.
  - **Custom progress bar**: Complete with time-tracking on hover.

## Design and User Experience

- **Responsive Design**: Ensures that the application is accessible and fully functional across various devices and screen sizes.
- **Parallax Animations and Smooth Scroll Effects**: Enhances visual appeal and user interaction, providing a dynamic browsing experience.
- **Animated Call-to-Action Buttons**: Engages users with visually appealing buttons that animate upon interaction, encouraging active participation.
- **Dynamic navbar component**: Designed to maximize form and function, the navbar is meant to be both easy to use, non-obstructive of content, and include visually appealing micro-interactions.

## Technologies Used

- **Frontend Framework**: Built with Next.js and React to leverage cutting-edge capabilities and efficient state management.
- **Styling**: TailwindCSS and SCSS for modular and maintainable CSS.
- **Animations**: GSAP (GreenSock Animation Platform) for smooth, light-weight, and high-performance animations.
- **State Management**: Redux used for managing application state across components.

## Setup and Installation

To get the application running locally:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:daniel-bogart/scope-video-player.git
   cd scope-video-player
   nvm use 18.17.0 
   npm install
   npm run dev
   ```

## For the future...

One thing I plan on doing very soon is adding uploading capabilities and user-authentication. I'd like to properly have users be able to sign in to make their comments and not need to enter their first and last names each time. I'd also really like to give users the option of uploading content. This could be done fairly easily with SupaBase and it's what I'll likely be working on later this week for my portfolio.
