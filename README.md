# DINOSAUR PLANET MEMORIES

## About

- This is a social media app for my friends!
- I wanted to practice the social media aspect of an application I am working on using the MERN stack with Redux, so this is that practice!
- Making this app taught me an extraordinary amount about global state-management with redux, authentication and protecting routes between a seperated client and server, and way more about react hooks than I knew before! I'm sure this app contains a lot of potential issues that aren't addressed in my TODOs, so I'm excited to learn more in the future and have this as a sort-of 'diary entry' that I can look back on to see how I have progressed as a developer :)

### Technology Used

#### Front-End

- React as front-end library/framework
- Redux (using React-Redux) for state-management
- Redux-Thunk for asynchronous action creators
- Axios for API requests
- React-File-Base64 for image upload (planning to move to cloudinary soon)
- Moment for displaying distance between post date and current date
- MaterialUI for pre-styled components

#### Back-End

- Express/Node as API Framework
- Mongo for the database and Mongoose as the ODM
- JWTs (json web tokens) for authentication

## TODO

- [ ] Update AppNavBar completely
- [ ] Fix Logout button and username placements
- [x] Add "Comma-seperated" message and example subtitle for tag portion of PostForm
- [x] Add "Liked" vs "Not Liked" styles for like button
- [ ] Make FormError component for form errors
- [ ] Display FormError component on forms
- [x] Make Snackbar component for general messages
- [x] Place Snackbar component and pass several error, success, and info props for general alerting where needed
- [ ] Fix layout on super small screens (Add media queries and such)
- [ ] Clear error state in various portions of the application, no need to have past errors hanging around in the store (still unsure about my approach to this)
- [x] Style the "Already have an account?" and "Don't have an account?" messages on the Auth Forms
- [ ] Change image upload to a cloud service and style upload input
- [ ] Go through entirety of code base and make her beautiful (remove console logs and unused vars, seperate components where it makes sense, organize import statements, reduce unnecessary component-level state if applicable, etc.)
- [ ] Fix style for longer post messages or limit input character count (Future fix will add functionality for longer posts (and possibly comments))
- [ ] Build and deploy v2

### TODO (FUTURE)

- [ ] Add filter posts by tag on tag click
- [ ] Add filter posts by user on username click
- [ ] Make tags space-seperated, displaying them as removable chips after space
- [ ] Longer post messages end with '...'. When clicked, expand post with scrollable modal/dialog
- [ ] Add Post Comments?
