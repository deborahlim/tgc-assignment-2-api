# tgc-assignment-2-api Dating & Social Networking Web Application for disabled people

## Context

- RESTful API using Express and MongoDB for a dating and social networking web application for disabled people worldwide
- A link to the API can be found here: https://dlhy-tgc-special-connections.herokuapp.com/
- A GitHub link to the Vue frontend can be found here: https://github.com/deborahlim/tgc-assignment-2

## A) Strategy

Organisational Goals:

- Create a API backed by Express and MongoDB which gathers data from users and serves them out on requests
- Gather users’ personal information and make it available for other users to see
- Facilitate conversations between users

User Goals:

- go to https://github.com/deborahlim/tgc-assignment-2 to see detailed user goals

## B) Structure of Mongo DB database

- The name of database is special-connections and it has 3 collections

1. users

   - <img width="548" alt="users collection" src="https://user-images.githubusercontent.com/84578312/134763301-1f07f03e-23a7-4967-a603-9e7256a92ead.png">

2. enquiries

   - <img width="258" alt="enquiries collection" src="https://user-images.githubusercontent.com/84578312/134763335-b54f9bd3-167c-4b50-b08f-d7e23e55cf30.png">

3. chats
   - <img width="268" alt="_id ObjectId(614d6dac85ec6e72710742d3)" src="https://user-images.githubusercontent.com/84578312/134799019-1b1edce2-061c-451b-9bdb-22388340f821.png">

### C) Use Cases and Testing

- Testing done on Postman
- Users Collection: Account related requests
  | <br>Use Case | <br>User Objective | <br>Request Type | <br>Request URL | <br>Sample Expected Result |
  |---|---|---|---|---|
  | <br>Adding new documents into users collection | <br>Create an account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/joinUs<br> Request body (JSON):<br> {<br>"username": "user100”,<br>"email": "user100@abc.com",<br>"password": "password100",<br>"confirmPassword": "password100"<br>} | <br>{<br>"status": "success",<br>"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRlZDViZDM5ODhkZmYyZjU2ZjNlMWIiLCJpYXQiOjE2MzI1NTY0NzcsImV4cCI6MTY0MDMzMjQ3N30.iJxKVIUCmeRfPSDtk3K5L8NaRkVLE2IzhxJ0SlwUbZ4",<br>"data": {<br>"user": {<br>"acknowledged": true,<br>"insertedId": "614ed5bd3988dff2f56f3e1a" (new id will be generated)<br>}<br>}<br>}<br> If username and/or pasword exists<br>{<br>"success": false,<br>"message": "The email and username provided already exists",<br>"error": {<br>"statusCode": 401,<br>"message": "The email and username provided already exists",<br>"error": {}<br>}<br>} |
  | <br>Confirm if a specific document exists based on the email and password field | <br>Log into created account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/login<br> Request body (JSON):<br>{<br>"email": "gordon@gmail.com",<br>"password": "gordon1”<br>} | <br>{<br>"status": "success",<br>"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTNlMWI2MzBjZDhkMTMyNGI1ZTc0ZGMiLCJpYXQiOjE2MzI1ODg0MzcsImV4cCI6MTY0MDM2NDQzN30.g0VbGMDVohGf1A0LOol0PdvjSRt82JAicore0pGUJVY",<br>"user": {<br>"\_id": "613e1b630cd8d1324b5e74dc",<br>"username": "gordon",<br>"email": "gordon@gmail.com",<br>"password": "gordon2",<br>"confirmPassword": "gordon2",<br>"datetime": "2021-09-12T15:23:15.764Z",<br>"profile": {<br>"dob": "1990-11-29",<br>"age": 30,<br>"gender": "male",<br>"country": "United States",<br>"disability": "Mental Health Conditions",<br>"interestedIn": ["dating"],<br>"genderPreference": ["female"],<br>"minAge": 18,<br>"maxAge": 29,<br>"countryPreference": "United States",<br>"disabilityPreference": "Mental Health Conditions",<br>"aboutMe": "Hello, I love martial arts 👊",<br>"interests": ["Brazilian jiu-jitsu"],<br>"photoURL": "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"<br>},<br>"review": "Great website for disabled people 😄🙌"<br>}<br>} |
  | <br>Update the password and confirm password fields of a specific document in the users collection | <br>Update password | <br>PATCH | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/profile/:id<br> Request Body (JSON):<br>{<br>"password": "gordon2”,<br>"confirmPassword": "gordon2”,<br>"currentPassword": "gordon1” <br>}<br>| <br>{<br>"acknowledged": true,<br>"modifiedCount": 1,<br>"upsertedId": null,<br>"upsertedCount": 0,<br>"matchedCount": 1<br>}<br> Wrong current password:<br>{<br>"success": false,<br>"message": "Your current password is wrong",<br>"error": {<br>"statusCode": 401,<br>"message": "Your current password is wrong",<br>"error": {}<br>}<br>} |
  | <br>Delete a specific document in the users collection | <br>Delete account | <br>DELETE | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/:id | <br>{<br>"message": "OK"<br>} |

- Users Collection: Profile related requests
  | <br>Use Case | <br>User Objective | <br>Request Type | <br>Request URL | <br>Expected Result |
  |---|---|---|---|---|
  | <br>Adding / updating profile key to a specific document in users collection | <br>Create / Update a profile | <br>PATCH | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/profile/users/profile/:id<br>Request Body (JSON):<br>{<br> "dob": "1996/12/06”,<br> "gender":"male",<br> "country": "Singapore",<br> "disability": "Open To All Disabilities",<br> "interestedIn": ["dating"],<br> "genderPreference": ["male"],<br> "minAge": 23,<br> "maxAge": 35,<br> "countryPreference": "Singapore",<br> "disabilityPreference": "Physical Disability",<br> "aboutMe": "Hi",<br> "interests": ["reading"],<br> "photoURL": "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"<br>} | <br>{<br> "acknowledged": true,<br> "modifiedCount": 1,<br> "upsertedId": null,<br> "upsertedCount": 0,<br> "matchedCount": 1<br>}<br>If any fields are left empty:<br>{<br> "success": false,<br> "message": "One or more of the fields are not filled up",<br> "error": {<br> "statusCode": 400,<br> "message": "One or more of the fields are not filled up",<br> "error": {}<br> }<br>} |
  | <br>Delete profile key from a specific document in users collection | <br>Delete a profile | <br>DELETE | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/profile/:id | <br>{<br> "message": "OK"<br>} |
  | <br>Retrieve a document from the users collections | <br>View user profile | <br>GET | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/profile/:id | <br>{<br> "\_id": "613e1b630cd8d1324b5e74dc",<br> "username": "gordon",<br> "email": "gordon@gmail.com",<br> "password": "gordon1",<br> "confirmPassword": "gordon1",<br> "datetime": "2021-09-12T15:23:15.764Z",<br> "profile": {<br> "dob": "1990-11-29",<br> "age": 30,<br> "gender": "male",<br> "country": "United States",<br> "disability": "Mental Health Conditions",<br> "interestedIn": [<br> "dating"<br> ],<br> "genderPreference": [<br> "female"<br> ],<br> "minAge": 18,<br> "maxAge": 29,<br> "countryPreference": "United States",<br> "disabilityPreference": "Mental Health Conditions",<br> "aboutMe": "Hello, I love martial arts 👊",<br> "interests": [<br> "Brazilian jiu-jitsu"<br> ],<br> "photoURL": "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"<br> },<br> "review": "Great website for disabled people 😄🙌"<br>} |

- Users Collection : Review Related requests
  | <br>Use Case | <br>User Objective | <br>Request Type | <br>Request URL | <br>Sample Expected Result |
  |---|---|---|---|---|
  | <br>Retrieve all the documents which has the review field | <br>View user reviews of the dating / social networking website | <br>GET | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/reviews | <br>[<br> {<br> "_id": "613484090b924b5e9e54c1a3",<br> "username": "rachel",<br> "review": "Special Connections is the safest dating site for disabled people 😊"<br> },<br> {<br> "_id": "6134e51cf50d3ea83c0ae13e",<br> "username": "Jack123",<br> "review": "Highly recommended! 👍😊"<br> },<br> ] |
  | <br>Add review field to users collection | <br>Write a review for the website | <br>PATCH | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/reviews/:id<br>Request Body (JSON):<br>{<br> "review": "Amazing experience! I've met so many new people thanks to special connections!"<br>} | <br>{<br> "acknowledged": true,<br> "modifiedCount": 1,<br> "upsertedId": null,<br> "upsertedCount": 0,<br> "matchedCount": 1<br>} |

- Enquires Collection
  | <br>Use Case | <br>User Objective | <br>Request Type | <br>Request URL | <br>Sample Expected Result |
  |---|---|---|---|---|
  | <br>Add a new document to the enquires collection | <br>Send an enquiry about the website | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/enquiry | <br>{<br> "status": "success",<br> "id": "6150223a0c9a09e3a4252864"<br>} |
  | <br>Retrieve all the documents in the enquires collection | <br>Get all the enquires sent by users | <br>GET | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/enquiry/load | <br> [<br> {<br> "_id": "61371eda82ae6c907f7a3794",<br> "name": "Jimmy",<br> "email": "jimbo@gmail.com",<br> "enquiry": "Is creating an account free?"<br> },<br> {<br> "_id": "61371fbd27c109721a2ddbae",<br> "name": "Jimmy",<br> "email": "jimbo@gmail.com",<br> "enquiry": "Is creating an account free?"<br> }<br>] |

- Chats Collection
  | <br>Use Case | <br>User Objective | <br>Request Type | <br>Request URL | <br>Sample Expected Result |
  |---|---|---|---|---|
  | <br>Retrieving a document in the chats collection which match a room | <br>See messages between themselves and another user | <br>GET | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/chats?room=gordon--with--mary<br><br>room is added in the url as a query string | <br>{<br> "\_id": "614d6dac85ec6e72710742d3",<br> "room": "gordon--with--mary",<br> "messages": [<br> {<br> "input": "Hi gordon",<br> "from": "mary",<br> "to": "gordon"<br> },<br> {<br> "input": "Hi mary",<br> "from": "gordon",<br> "to": "mary"<br> }<br> ]<br>} |
  | <br>Adding a document to the chats collection | <br>Create a chat between themselves and another user | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/chats<br>Request body (JSON):<br>{<br> "room": "testroom",<br> "messages": [] <br>} | <br>{<br> "acknowledged": true,<br> "insertedId": "614ed9ab3988dff2f56f3e1d"<br>}<br>if room field value already exists:<br>{<br> "success": false,<br> "message": "this room already exists",<br> "error": {<br> "statusCode": 400,<br> "message": "this room already exists",<br> "error": {}<br> }<br>}<br> |
  | <br>Adding to the messages array for a specific document in the chats collection | <br>Save the messages sent from themselves and received from the other user | <br>PATCH | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/chats<br>Request body (JSON):<br> {<br> “room": "mary--with--simon",<br> “message": {<br> "input": “hi”,<br> "from": “mary”,<br> "to": “simon”<br> }<br> } | <br>{<br> "acknowledged": true,<br> "modifiedCount": 1,<br> "upsertedId": null,<br> "upsertedCount": 0,<br> "matchedCount": 1<br>}<br> |
