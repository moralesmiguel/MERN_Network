# Corp's Announcement and Sharing Board - DigitalBoard
The app is for the use of members of the same company to post about new announcements regarding the site, new hires, the company itself, tips and tricks, etc. It is also a way for workers to know each other since they are able to create a profile with their picture and a brief intro about themselves. There is an admin profile that can post, delete posts that don't belong to him or problematic/workers no longer working at the company.

## System Architecture
PostIt is to be developed using the MERN stack. MongoDB is a database that allows to store images, which comes in handy to save the profile and post's pictures. Through the use of Mongoose it works easily with NodeJS and Express to have a backend and middleware that allow for the various routes and controllers necessary for the functions that this project requires. Finally, for the frontend React is to be used using Create React App because of how simple it is to create a development directory with it. For styling and structure Bootstrap is to be used to apply quick styling (in a future iteration this could be replaced). Given the short amount of time available using the assistance of a tool like Bootstrap allows for a faster completion. Due to the ease of configuration and that it works well with projects developed using the MERN stack the first choice to deploy would be using Heroku.

## System Requirements
### User Stories
* As an HR team member I want to notify everyone about a new hire to ease his onboarding.
* As an admin I want to delete posts that don't suit company policy to avoid problematic situations.
* As a worker in the company I want to be able to announce fun things to create a better working environment.
* As the accountant I want to be able to have a profile with my picture and about me section so that people can know me not just by name.
* As an avid reader I want to be able to see if a certain poster has more posts that I can read to be informed about what he writes.
* As a worker in the company I want to be able to see all the users in our app to match names with faces.

### Competition
There are other apps such as Bling that allows for anonymous office gossip after authenticating as a worker of the company, Slack that provides chats for employees, BlogIn that allows to create blogs to be seen by employees, Trello that follows the post-it idea but for project management, and many others but mostly focused on the chat feature. The PostIt app focuses on simplicity by only having one feature...announcements, there is no chat, messaging, etc. This app is meant to be used to quickly see what's going on in the company and who's who but not for communication purposes (which some companies could consider as time-consuming). It makes keeping track of events such as office parties, new hires, changes, etc. easy.

### Functional requirements
* User needs to provide credentials to modify his profile.
* User needs to provide credentials to delete his profile.
* User needs to provide credentials to delete posts made by him.
* Admin user should be able to delete anyone's posts and profile.
* Admin user should also be able to modify someone's profile.
* Seeing all users and posts shouldn't be restricted by credentials.
* Users should be able to upload a profile picture.
* Users should be able to accompany their post with a picture.

### Nonfunctional requirements
* Should run on at least two browsers.
* Information should be backed in a database in case the website crashes.
* Interface should have the least possible functions to emphasize simplicity.
* Shouldn't require high-end servers given how simple and little information it holds.
* Authentication should be possible using more than one option aside from email and password.

## Installation
How to install and access on local machine:

1. Install the necessary modules while set in the backend and frontend folders through 'npm install'

2. Navigate to the root directory of the app and type 
   'node run dev' in the first CLI.

3. To avoid the expressValidator is not a function issue, install the version indicated in package.json.

4. Navigate to the root directory of the app in the second CLI by
   typing 'cd frontend' and then type 'npm start'

5. Open your browser (either Chrome or Firefox preferably) and navigate to the localhost (http://localhost:3000).

6. To create an admin user you can either manually change the role to "admin" in MongoDB atlas using the edit
    button or you can use the mongo shell, use the _id, the command db.users.update and $set:{role:"admin"}.

## ENV

1. Create an .env file in the backend folder in which you hold MONGODB_USERNAME, MONGODB_PASSWORD, and JWT_SECRET with your corresponding values

2. Also make one in the frontend folder with your REACT_APP_GOOGLE_CLIENT, REACT_APP_GOOGLE_SECRET, REACT_APP_FACEBOOK_ID, REACT_APP_FACEBOOK_SECRET values.

## Use

1. You can either register with a fake email account and six-character password or Google.

### Non-registered users

1. Can view registered users and see posts.

### Registered users - role: subscribers

1. Can click on a user's profile to see what other posts they have, can edit or delete their own profile, can create or delete
their own post. They can't delete other user's posts.

### Admin user

1. Has his own panel where can see all posts and all users.

2. Can delete posts and edit or delete user profiles.

### Deployment

Deployment was done through Heroku given it's fast and works easy for a MERN project. Link: https://tranquil-temple-06509.herokuapp.com/ Connection to database has been tested and social login worked fine in Firefox, URL has been whitelisted.

### Tests
Tests were done on both the backend and frontend testing routes such as users and routes which are the main components of this project; in addition, as the project was built it was all tested with Postman and the different calls were safeguarded with error-catching conditionals.

### Screenshots

Homepage

![home](https://user-images.githubusercontent.com/51275356/76921186-00bba480-6893-11ea-8209-a323a4b45506.JPG)

Sign-in Form

![signin](https://user-images.githubusercontent.com/51275356/76921198-0a450c80-6893-11ea-87df-9483306c9353.JPG)

Signed In Profile

![profilesignedin](https://user-images.githubusercontent.com/51275356/76921208-0fa25700-6893-11ea-9eb3-fb5854b5e708.JPG)


Admin Panel

![adminpanel](https://user-images.githubusercontent.com/51275356/76921216-14670b00-6893-11ea-8bb7-b5de0852341d.JPG)
