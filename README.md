# BOOK IT - Digital Hall Booking System

BOOK IT is a digital hall booking system developed using the Vite MERN stack in JavaScript. It allows users to book halls for various events and manage their bookings seamlessly. The system also includes a mailing system for notifications and employs scheduled jobs to handle booking lifecycle updates.

## Features

- **User Authentication**: Users can register, login, and manage their accounts securely.
- **Hall Booking**: Users can browse available halls, book them for events, and manage their bookings.
- **Mailing System**: Integrated mailing system for sending notifications to users regarding booking status updates and other relevant information.
- **Scheduled Jobs**: Scheduled jobs are used to automate tasks such as updating booking statuses and sending reminders.

## Technologies Used

- **Frontend**: Vite +  React.js , HTML, CSS. 
- **Backend**: Express.js, Node.js, MongoDB (atlas)
- **Other**: JWT for authentication, Nodemailer for mailing service , Node-schedule for scheduling tasks

## Installation

1. Clone the repository:

    ```
    git clone <repository-url>
    cd <repository-folder>
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the necessary environment variables:

    ```
    MONGO_URI= <your-mongodb-uri>
    JWT_SECRET= <your-jwt-secret>
    NODE_ENV = development / production
    PORT = <your-port>
    ```

4. Start the development server:

    ```
    npm run dev
    ```

## Usage

- Visit the application in your web browser.
- Register an account or log in if you already have one.
- Browse available halls and book them for your events.
- Receive email notifications regarding booking status updates.
- Manage your bookings and view their statuses.

## Screenshots

![Screenshot 1](/Screenshots/Login.png)


![Screenshot 2](/Screenshots/AdminPannel.png)


![Screenshot 3](/Screenshots/Halls.png)


![Screenshot 4](/Screenshots/Booking.png)


## License

This project is licensed under the MIT License.

## Authors

 **Kathir Karthik M**
 🤝
 **Mouniesh V** 
