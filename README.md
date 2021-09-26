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
   - <img width="268" alt=“chats collection” src="https://user-images.githubusercontent.com/84578312/134763351-454a121e-4684-4cca-a9f4-758abdd3a972.png">

### C) Use Cases and Testing

- Testing done on Postman
- Users Collection: Account related requests
  | <br>Use Case | <br>User Objective | <br>Request Type | <br>Request URL | <br>Sample Expected Result |
  |---|---|---|---|---|
  | <br>Adding new documents into users collection | <br>Create an account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/joinUs<br> <br><br> <br>Request body (JSON):<br> <br><br> <br>{<br> <br> "username": "user100”,<br> <br> "email": "user100@abc.com",<br> <br> "password": "password100",<br> <br> "confirmPassword": "password100"<br> <br>} | <br>{<br> <br> "status": "success",<br> <br> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRlZDViZDM5ODhkZmYyZjU2ZjNlMWIiLCJpYXQiOjE2MzI1NTY0NzcsImV4cCI6MTY0MDMzMjQ3N30.iJxKVIUCmeRfPSDtk3K5L8NaRkVLE2IzhxJ0SlwUbZ4",<br> <br> "data": {<br> <br> "user": {<br> <br> "acknowledged": true,<br> <br> "insertedId": "614ed5bd3988dff2f56f3e1a" (new id will be generated)<br> <br> }<br> <br> }<br> <br>}<br> <br><br> <br>If username and/or pasword exists<br> <br>{<br> <br> "success": false,<br> <br> "message": "The email and username provided already exists",<br> <br> "error": {<br> <br> "statusCode": 401,<br> <br> "message": "The email and username provided already exists",<br> <br> "error": {}<br> <br> }<br> <br>} |
  | <br>Confirm if a specific document exists based on the email and password field | <br>Log into created account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/login<br> <br><br> <br>Request body (JSON):<br> <br>{<br> <br>"email": "gordon@gmail.com",<br> <br>"password": "gordon1”<br> <br>} | <br>{<br> <br> "status": "success",<br> <br> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTNlMWI2MzBjZDhkMTMyNGI1ZTc0ZGMiLCJpYXQiOjE2MzI1ODg0MzcsImV4cCI6MTY0MDM2NDQzN30.g0VbGMDVohGf1A0LOol0PdvjSRt82JAicore0pGUJVY",<br> <br> "user": {<br> <br> "\_id": "613e1b630cd8d1324b5e74dc",<br> <br> "username": "gordon",<br> <br> "email": "gordon@gmail.com",<br> <br> "password": "gordon2",<br> <br> "confirmPassword": "gordon2",<br> <br> "datetime": "2021-09-12T15:23:15.764Z",<br> <br> "profile": {<br> <br> "dob": "1990-11-29",<br> <br> "age": 30,<br> <br> "gender": "male",<br> <br> "country": "United States",<br> <br> "disability": "Mental Health Conditions",<br> <br> "interestedIn": [<br> <br> "dating"<br> <br> ],<br> <br> "genderPreference": [<br> <br> "female"<br> <br> ],<br> <br> "minAge": 18,<br> <br> "maxAge": 29,<br> <br> "countryPreference": "United States",<br> <br> "disabilityPreference": "Mental Health Conditions",<br> <br> "aboutMe": "Hello, I love martial arts 👊",<br> <br> "interests": [<br> <br> "Brazilian jiu-jitsu"<br> <br> ],<br> <br> "photoURL": "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"<br> <br> },<br> <br> "review": "Great website for disabled people 😄🙌"<br> <br> }<br> <br>} |
  | <br>Update the password and confirm password fields of a specific document in the users collection | <br>Update password | <br>PATCH | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/profile/:id<br> <br><br> <br>Request Body (JSON):<br> <br>{<br> <br> "password": "gordon2”,<br> <br>"confirmPassword": "gordon2”,<br> <br>"currentPassword": "gordon1” <br> <br> <br> <br>}<br> <br> | <br>{<br> <br> "acknowledged": true,<br> <br> "modifiedCount": 1,<br> <br> "upsertedId": null,<br> <br> "upsertedCount": 0,<br> <br> "matchedCount": 1<br> <br>}<br> <br><br> <br>Wrong current password:<br> <br>{<br> <br> "success": false,<br> <br> "message": "Your current password is wrong",<br> <br> "error": {<br> <br> "statusCode": 401,<br> <br> "message": "Your current password is wrong",<br> <br> "error": {}<br> <br> }<br> <br>} |
  | <br>Delete a specific document in the users collection | <br>Delete account | <br>DELETE | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/:id | <br>{<br> <br> "message": "OK"<br> <br>} |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |

- Users Collection: Profile related requests
  | <br>Use Case | <br>User Objective | <br>Request Type | <br>Request URL | <br>Sample Expected Result |
  |---|---|---|---|---|
  | <br>Adding new documents into users collection | <br>Create an account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/joinUs<br> <br><br> <br>Request body (JSON):<br> <br><br> <br>{<br> <br> "username": "user100”,<br> <br> "email": "user100@abc.com",<br> <br> "password": "password100",<br> <br> "confirmPassword": "password100"<br> <br>} | <br>{<br> <br> "status": "success",<br> <br> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRlZDViZDM5ODhkZmYyZjU2ZjNlMWIiLCJpYXQiOjE2MzI1NTY0NzcsImV4cCI6MTY0MDMzMjQ3N30.iJxKVIUCmeRfPSDtk3K5L8NaRkVLE2IzhxJ0SlwUbZ4",<br> <br> "data": {<br> <br> "user": {<br> <br> "acknowledged": true,<br> <br> "insertedId": "614ed5bd3988dff2f56f3e1a" (new id will be generated)<br> <br> }<br> <br> }<br> <br>}<br> <br><br> <br>If username and/or pasword exists<br> <br>{<br> <br> "success": false,<br> <br> "message": "The email and username provided already exists",<br> <br> "error": {<br> <br> "statusCode": 401,<br> <br> "message": "The email and username provided already exists",<br> <br> "error": {}<br> <br> }<br> <br>} |
  | <br>Confirm if a specific document exists based on the email and password field | <br>Log into created account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/login<br> <br><br> <br>Request body (JSON):<br> <br>{<br> <br>"email": "gordon@gmail.com",<br> <br>"password": "gordon1”<br> <br>} | <br>{<br> <br> "status": "success",<br> <br> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTNlMWI2MzBjZDhkMTMyNGI1ZTc0ZGMiLCJpYXQiOjE2MzI1ODg0MzcsImV4cCI6MTY0MDM2NDQzN30.g0VbGMDVohGf1A0LOol0PdvjSRt82JAicore0pGUJVY",<br> <br> "user": {<br> <br> "\_id": "613e1b630cd8d1324b5e74dc",<br> <br> "username": "gordon",<br> <br> "email": "gordon@gmail.com",<br> <br> "password": "gordon2",<br> <br> "confirmPassword": "gordon2",<br> <br> "datetime": "2021-09-12T15:23:15.764Z",<br> <br> "profile": {<br> <br> "dob": "1990-11-29",<br> <br> "age": 30,<br> <br> "gender": "male",<br> <br> "country": "United States",<br> <br> "disability": "Mental Health Conditions",<br> <br> "interestedIn": [<br> <br> "dating"<br> <br> ],<br> <br> "genderPreference": [<br> <br> "female"<br> <br> ],<br> <br> "minAge": 18,<br> <br> "maxAge": 29,<br> <br> "countryPreference": "United States",<br> <br> "disabilityPreference": "Mental Health Conditions",<br> <br> "aboutMe": "Hello, I love martial arts 👊",<br> <br> "interests": [<br> <br> "Brazilian jiu-jitsu"<br> <br> ],<br> <br> "photoURL": "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"<br> <br> },<br> <br> "review": "Great website for disabled people 😄🙌"<br> <br> }<br> <br>} |
  | <br>Update the password and confirm password fields of a specific document in the users collection | <br>Update password | <br>PATCH | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/profile/:id<br> <br><br> <br>Request Body (JSON):<br> <br>{<br> <br> "password": "gordon2”,<br> <br>"confirmPassword": "gordon2”,<br> <br>"currentPassword": "gordon1” <br> <br> <br> <br>}<br> <br> | <br>{<br> <br> "acknowledged": true,<br> <br> "modifiedCount": 1,<br> <br> "upsertedId": null,<br> <br> "upsertedCount": 0,<br> <br> "matchedCount": 1<br> <br>}<br> <br><br> <br>Wrong current password:<br> <br>{<br> <br> "success": false,<br> <br> "message": "Your current password is wrong",<br> <br> "error": {<br> <br> "statusCode": 401,<br> <br> "message": "Your current password is wrong",<br> <br> "error": {}<br> <br> }<br> <br>} |
  | <br>Delete a specific document in the users collection | <br>Delete account | <br>DELETE | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/:id | <br>{<br> <br> "message": "OK"<br> <br>} |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |

- Users Collection : Review Related requests
  | <br>Use Case | <br>User Objective | <br>Request Type | <br>Request URL | <br>Sample Expected Result |
  |---|---|---|---|---|
  | <br>Adding new documents into users collection | <br>Create an account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/joinUs<br> <br><br> <br>Request body (JSON):<br> <br><br> <br>{<br> <br> "username": "user100”,<br> <br> "email": "user100@abc.com",<br> <br> "password": "password100",<br> <br> "confirmPassword": "password100"<br> <br>} | <br>{<br> <br> "status": "success",<br> <br> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRlZDViZDM5ODhkZmYyZjU2ZjNlMWIiLCJpYXQiOjE2MzI1NTY0NzcsImV4cCI6MTY0MDMzMjQ3N30.iJxKVIUCmeRfPSDtk3K5L8NaRkVLE2IzhxJ0SlwUbZ4",<br> <br> "data": {<br> <br> "user": {<br> <br> "acknowledged": true,<br> <br> "insertedId": "614ed5bd3988dff2f56f3e1a" (new id will be generated)<br> <br> }<br> <br> }<br> <br>}<br> <br><br> <br>If username and/or pasword exists<br> <br>{<br> <br> "success": false,<br> <br> "message": "The email and username provided already exists",<br> <br> "error": {<br> <br> "statusCode": 401,<br> <br> "message": "The email and username provided already exists",<br> <br> "error": {}<br> <br> }<br> <br>} |
  | <br>Confirm if a specific document exists based on the email and password field | <br>Log into created account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/login<br> <br><br> <br>Request body (JSON):<br> <br>{<br> <br>"email": "gordon@gmail.com",<br> <br>"password": "gordon1”<br> <br>} | <br>{<br> <br> "status": "success",<br> <br> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTNlMWI2MzBjZDhkMTMyNGI1ZTc0ZGMiLCJpYXQiOjE2MzI1ODg0MzcsImV4cCI6MTY0MDM2NDQzN30.g0VbGMDVohGf1A0LOol0PdvjSRt82JAicore0pGUJVY",<br> <br> "user": {<br> <br> "\_id": "613e1b630cd8d1324b5e74dc",<br> <br> "username": "gordon",<br> <br> "email": "gordon@gmail.com",<br> <br> "password": "gordon2",<br> <br> "confirmPassword": "gordon2",<br> <br> "datetime": "2021-09-12T15:23:15.764Z",<br> <br> "profile": {<br> <br> "dob": "1990-11-29",<br> <br> "age": 30,<br> <br> "gender": "male",<br> <br> "country": "United States",<br> <br> "disability": "Mental Health Conditions",<br> <br> "interestedIn": [<br> <br> "dating"<br> <br> ],<br> <br> "genderPreference": [<br> <br> "female"<br> <br> ],<br> <br> "minAge": 18,<br> <br> "maxAge": 29,<br> <br> "countryPreference": "United States",<br> <br> "disabilityPreference": "Mental Health Conditions",<br> <br> "aboutMe": "Hello, I love martial arts 👊",<br> <br> "interests": [<br> <br> "Brazilian jiu-jitsu"<br> <br> ],<br> <br> "photoURL": "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"<br> <br> },<br> <br> "review": "Great website for disabled people 😄🙌"<br> <br> }<br> <br>} |
  | <br>Update the password and confirm password fields of a specific document in the users collection | <br>Update password | <br>PATCH | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/profile/:id<br> <br><br> <br>Request Body (JSON):<br> <br>{<br> <br> "password": "gordon2”,<br> <br>"confirmPassword": "gordon2”,<br> <br>"currentPassword": "gordon1” <br> <br> <br> <br>}<br> <br> | <br>{<br> <br> "acknowledged": true,<br> <br> "modifiedCount": 1,<br> <br> "upsertedId": null,<br> <br> "upsertedCount": 0,<br> <br> "matchedCount": 1<br> <br>}<br> <br><br> <br>Wrong current password:<br> <br>{<br> <br> "success": false,<br> <br> "message": "Your current password is wrong",<br> <br> "error": {<br> <br> "statusCode": 401,<br> <br> "message": "Your current password is wrong",<br> <br> "error": {}<br> <br> }<br> <br>} |
  | <br>Delete a specific document in the users collection | <br>Delete account | <br>DELETE | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/:id | <br>{<br> <br> "message": "OK"<br> <br>} |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |

- Enquires Collection
  | <br>Use Case | <br>User Objective | <br>Request Type | <br>Request URL | <br>Sample Expected Result |
  |---|---|---|---|---|
  | <br>Adding new documents into users collection | <br>Create an account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/joinUs<br> <br><br> <br>Request body (JSON):<br> <br><br> <br>{<br> <br> "username": "user100”,<br> <br> "email": "user100@abc.com",<br> <br> "password": "password100",<br> <br> "confirmPassword": "password100"<br> <br>} | <br>{<br> <br> "status": "success",<br> <br> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRlZDViZDM5ODhkZmYyZjU2ZjNlMWIiLCJpYXQiOjE2MzI1NTY0NzcsImV4cCI6MTY0MDMzMjQ3N30.iJxKVIUCmeRfPSDtk3K5L8NaRkVLE2IzhxJ0SlwUbZ4",<br> <br> "data": {<br> <br> "user": {<br> <br> "acknowledged": true,<br> <br> "insertedId": "614ed5bd3988dff2f56f3e1a" (new id will be generated)<br> <br> }<br> <br> }<br> <br>}<br> <br><br> <br>If username and/or pasword exists<br> <br>{<br> <br> "success": false,<br> <br> "message": "The email and username provided already exists",<br> <br> "error": {<br> <br> "statusCode": 401,<br> <br> "message": "The email and username provided already exists",<br> <br> "error": {}<br> <br> }<br> <br>} |
  | <br>Confirm if a specific document exists based on the email and password field | <br>Log into created account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/login<br> <br><br> <br>Request body (JSON):<br> <br>{<br> <br>"email": "gordon@gmail.com",<br> <br>"password": "gordon1”<br> <br>} | <br>{<br> <br> "status": "success",<br> <br> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTNlMWI2MzBjZDhkMTMyNGI1ZTc0ZGMiLCJpYXQiOjE2MzI1ODg0MzcsImV4cCI6MTY0MDM2NDQzN30.g0VbGMDVohGf1A0LOol0PdvjSRt82JAicore0pGUJVY",<br> <br> "user": {<br> <br> "\_id": "613e1b630cd8d1324b5e74dc",<br> <br> "username": "gordon",<br> <br> "email": "gordon@gmail.com",<br> <br> "password": "gordon2",<br> <br> "confirmPassword": "gordon2",<br> <br> "datetime": "2021-09-12T15:23:15.764Z",<br> <br> "profile": {<br> <br> "dob": "1990-11-29",<br> <br> "age": 30,<br> <br> "gender": "male",<br> <br> "country": "United States",<br> <br> "disability": "Mental Health Conditions",<br> <br> "interestedIn": [<br> <br> "dating"<br> <br> ],<br> <br> "genderPreference": [<br> <br> "female"<br> <br> ],<br> <br> "minAge": 18,<br> <br> "maxAge": 29,<br> <br> "countryPreference": "United States",<br> <br> "disabilityPreference": "Mental Health Conditions",<br> <br> "aboutMe": "Hello, I love martial arts 👊",<br> <br> "interests": [<br> <br> "Brazilian jiu-jitsu"<br> <br> ],<br> <br> "photoURL": "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"<br> <br> },<br> <br> "review": "Great website for disabled people 😄🙌"<br> <br> }<br> <br>} |
  | <br>Update the password and confirm password fields of a specific document in the users collection | <br>Update password | <br>PATCH | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/profile/:id<br> <br><br> <br>Request Body (JSON):<br> <br>{<br> <br> "password": "gordon2”,<br> <br>"confirmPassword": "gordon2”,<br> <br>"currentPassword": "gordon1” <br> <br> <br> <br>}<br> <br> | <br>{<br> <br> "acknowledged": true,<br> <br> "modifiedCount": 1,<br> <br> "upsertedId": null,<br> <br> "upsertedCount": 0,<br> <br> "matchedCount": 1<br> <br>}<br> <br><br> <br>Wrong current password:<br> <br>{<br> <br> "success": false,<br> <br> "message": "Your current password is wrong",<br> <br> "error": {<br> <br> "statusCode": 401,<br> <br> "message": "Your current password is wrong",<br> <br> "error": {}<br> <br> }<br> <br>} |
  | <br>Delete a specific document in the users collection | <br>Delete account | <br>DELETE | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/:id | <br>{<br> <br> "message": "OK"<br> <br>} |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |

- Chats Collection
  | <br>Use Case | <br>User Objective | <br>Request Type | <br>Request URL | <br>Sample Expected Result |
  |---|---|---|---|---|
  | <br>Adding new documents into users collection | <br>Create an account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/joinUs<br> <br><br> <br>Request body (JSON):<br> <br><br> <br>{<br> <br> "username": "user100”,<br> <br> "email": "user100@abc.com",<br> <br> "password": "password100",<br> <br> "confirmPassword": "password100"<br> <br>} | <br>{<br> <br> "status": "success",<br> <br> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRlZDViZDM5ODhkZmYyZjU2ZjNlMWIiLCJpYXQiOjE2MzI1NTY0NzcsImV4cCI6MTY0MDMzMjQ3N30.iJxKVIUCmeRfPSDtk3K5L8NaRkVLE2IzhxJ0SlwUbZ4",<br> <br> "data": {<br> <br> "user": {<br> <br> "acknowledged": true,<br> <br> "insertedId": "614ed5bd3988dff2f56f3e1a" (new id will be generated)<br> <br> }<br> <br> }<br> <br>}<br> <br><br> <br>If username and/or pasword exists<br> <br>{<br> <br> "success": false,<br> <br> "message": "The email and username provided already exists",<br> <br> "error": {<br> <br> "statusCode": 401,<br> <br> "message": "The email and username provided already exists",<br> <br> "error": {}<br> <br> }<br> <br>} |
  | <br>Confirm if a specific document exists based on the email and password field | <br>Log into created account | <br>POST | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/login<br> <br><br> <br>Request body (JSON):<br> <br>{<br> <br>"email": "gordon@gmail.com",<br> <br>"password": "gordon1”<br> <br>} | <br>{<br> <br> "status": "success",<br> <br> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTNlMWI2MzBjZDhkMTMyNGI1ZTc0ZGMiLCJpYXQiOjE2MzI1ODg0MzcsImV4cCI6MTY0MDM2NDQzN30.g0VbGMDVohGf1A0LOol0PdvjSRt82JAicore0pGUJVY",<br> <br> "user": {<br> <br> "\_id": "613e1b630cd8d1324b5e74dc",<br> <br> "username": "gordon",<br> <br> "email": "gordon@gmail.com",<br> <br> "password": "gordon2",<br> <br> "confirmPassword": "gordon2",<br> <br> "datetime": "2021-09-12T15:23:15.764Z",<br> <br> "profile": {<br> <br> "dob": "1990-11-29",<br> <br> "age": 30,<br> <br> "gender": "male",<br> <br> "country": "United States",<br> <br> "disability": "Mental Health Conditions",<br> <br> "interestedIn": [<br> <br> "dating"<br> <br> ],<br> <br> "genderPreference": [<br> <br> "female"<br> <br> ],<br> <br> "minAge": 18,<br> <br> "maxAge": 29,<br> <br> "countryPreference": "United States",<br> <br> "disabilityPreference": "Mental Health Conditions",<br> <br> "aboutMe": "Hello, I love martial arts 👊",<br> <br> "interests": [<br> <br> "Brazilian jiu-jitsu"<br> <br> ],<br> <br> "photoURL": "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"<br> <br> },<br> <br> "review": "Great website for disabled people 😄🙌"<br> <br> }<br> <br>} |
  | <br>Update the password and confirm password fields of a specific document in the users collection | <br>Update password | <br>PATCH | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/profile/:id<br> <br><br> <br>Request Body (JSON):<br> <br>{<br> <br> "password": "gordon2”,<br> <br>"confirmPassword": "gordon2”,<br> <br>"currentPassword": "gordon1” <br> <br> <br> <br>}<br> <br> | <br>{<br> <br> "acknowledged": true,<br> <br> "modifiedCount": 1,<br> <br> "upsertedId": null,<br> <br> "upsertedCount": 0,<br> <br> "matchedCount": 1<br> <br>}<br> <br><br> <br>Wrong current password:<br> <br>{<br> <br> "success": false,<br> <br> "message": "Your current password is wrong",<br> <br> "error": {<br> <br> "statusCode": 401,<br> <br> "message": "Your current password is wrong",<br> <br> "error": {}<br> <br> }<br> <br>} |
  | <br>Delete a specific document in the users collection | <br>Delete account | <br>DELETE | <br>https://dlhy-tgc-special-connections.herokuapp.com/special-connections/users/:id | <br>{<br> <br> "message": "OK"<br> <br>} |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
  | | | | | |
