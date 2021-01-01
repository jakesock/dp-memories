# DINOSAUR PLANET MEMORIES

## About

- This is a social media app for my friends!
- I wanted to practice the social media aspect of an application I am working on using the MERN stack with Redux, so this is that practice!
- Making this app taught me an extraordinary amount about global state-management with redux, authentication and protecting routes between a seperated client and server (particularly in react), and way more about react hooks than I knew before! I'm sure this app contains a lot of potential issues that aren't addressed in my TODOs, so I'm excited to learn more in the future and have this as a sort-of 'diary entry' that I can look back on to see how I have progressed as a developer :)

### Technology Used

#### Front-End

- React as front-end library/framework
- Redux for state-management
- React-Redux to connect Redux with React
- Redux-Thunk for asynchronous action creators
- MaterialUI for pre-styled components
- Axios for API requests
- Moment for displaying distance between post date and current date

#### Back-End

- Express/Node as API Framework
- Mongo for the database and Mongoose as the ODM
- JWTs (JSON Web Tokens) for authentication
- Cloudinary for image hosting

## TODO

#### General Layout/Styling

- [ ] Update AppBar with logo when it comes

## Potential Future Features

- Filter posts by tag on tag click
- Filter posts by user on username click
- Make tags space-seperated, displaying them as removable chips after space in create post form
- Longer post messages end with '...'. When clicked, expand post with scrollable modal/dialog
- Add Post Comments
- Infinite scroll

## TODO (Old)

#### General Layout/Styling

- [x] Fix layout on extra small screens
- [x] Fix back to top button placement on mobile

#### General Feedback

- [x] Make Snackbar component for general messages
- [x] Place Snackbar component and pass several error, success, and info props for general alerting where needed
- [x] Change non-specific server error messages to "Oops, Something went wrong! Please try again!"

#### General Functionality

- [x] Add 'Back To Top' button + functionality
- [x] Add loader for asynchronous actions

#### Forms

- [x] Style the "Already have an account?" and "Don't have an account?" messages on the Auth Forms
- [x] Fix Logout button and username placements
- [x] Add "Comma-seperated" message and example subtitle for tag portion of PostForm
- [x] Make FormError component for form errors
- [x] Display FormError component on forms
- [x] Add show/hide password functionality on auth forms
- [x] Make form sticky on > medium sized screens
- [x] Change image upload to a cloud service
- [x] Implement client-side form validation
- [x] Style file input
- [x] Add change image button on update form
- [x] If image changed on post update, remove original from cloud storage
- [x] Change how server errors operate on forms (save form info if something goes wrong)
- [x] Server: Make isUsernameTaken endpoint
- [x] Client: Check if username is taken on register form change

#### Posts

- [x] Add "Liked" vs "Not Liked" styles for like button
- [x] Add Edit and Delete icons to PostDropdown options
- [x] Limit input character count (Future update planned will add functionality for expanding longer posts (and possibly comments))

#### General Clean Up & Deploy

- [x] Check various things on mobile and fix if need be
- [x] Go through entirety of code base and make her beautiful (remove console logs and unused vars, seperate components where it makes sense, organize import statements, etc.)
- [x] Build and deploy v2
