# Login Application

This is a simple login application built with Java for the backend and with a UI implemented using Angular. The application follows the Model-View-Controller (MVC) pattern to separate concerns and ensure maintainability.

## Video demonstration
View a video demonstration of the login app at [https://youtu.be/CYxTzKupOCk](https://youtu.be/CYxTzKupOCk)

## Features

### User Authentication
- Users can log in using their username and password.
- If the provided credentials are invalid, an error message "Invalid userid or password" is displayed.

### Welcome Page
- Upon successful login, users are directed to a welcome page.
- The welcome page displays the user's name, username, and role (manager/other job role).

### Restricted Access
- If the logged-in user has a manager role, they can access a restricted webpage.
- Other user roles cannot access this restricted webpage.

### Logout Functionality
- Users can log out of their accounts, returning to the login page.

### MVC Pattern
- The application is designed following the Model-View-Controller (MVC) pattern for organisation and maintainability.

### Database Integration
- User data is stored in SQL database for persistence.
- The application interacts with the database to authenticate users and retrieve user information.
