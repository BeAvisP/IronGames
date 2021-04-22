# Project Name

<br>



## Description

Project Module 2 is an online database of information related to video games content online – including, ratings, and fan and critical reviews.


<br>

## User Stories

- **404** - As users, we want to see a nice 404 page when we go to a page that doesn’t exist so that I know it was my fault
- **500** - As user, we want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a users, we want to be able to access the homepage and search by game, log in and sign up. 
- **sign up** - As users, we want to sign up on the web page so that we can add games to our library and wishlist and review games.
- **login** - As users, we want to be able to log in on the web page so that we can get back to our profile.
- **logout** - As users, we want to be able to log out from the web page so that we can make sure no one will access our account.
- **profile page** - As users, we want to see be able to see users profiles, edit our own profile, manage our games and access our game collections.
- **Games page** - As users, we want to be able to see all the games availables and search them.
- **Game details** - As users, we want to see the details of a selected game, upvote the game, add to our collections or add a review.
- **Review edit page** - As users, we want to edit the reviews made.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DDBB.| {  username, email, password, re-password  }             |
| `GET`      | `/profile/:userID`                 | Renders `user/profile` view.                                 |                                                          |
| `GET`      | `/private/:userID/edit`            | Private route. Render the `profile-edit` view.               |                                                          |
| `POST`     | `/private/:userID/edit`            | Private route. Sends `profile-edit` info to server and Updates the user in DDBB. |  { username, location, description, genres, socia.facebook, social.steam, social.twitch, social.twitter }                                                        |
| `POST`     | `/logout`                          | Private route. User logout.                                  |                                                          |
| `GET`      | `/profile/:userID/games`           | Renders `user-games` view.                                   |                                                          |
| `GET`      | `/profile/:userID/wishlist`        | Renders `user-wishlist` view.                                |                                                          |
| `GET`      | `/search`                          | Renders `game-list` view.                                    |                                                          |
| `GET`      | `/game-list`                       | Renders `game-list` view.                                    |                                                          |
| `GET`      | `/game/:id`                        | Renders `game-detail` view.                                  |                                                          |
| `POST`     | `/game/:id/update`                 | Private route. Sends `game-detail` info to Server and Updates the game in DDBB.| { upvote, downvote }                                                          |
| `POST`     | `/review/:gameID/create`           | Sends review form data to the server and creates the review in the DDBB.|  { comment }                                  |
| `GET`      | `/review/:reviewID/edit`           | Private route. Renders the `review-edit` view.               |                                                          |
| `POST`     | `/review/:reviewID/edit`           | Private route. Sends `review-edit` info to Server and Updates the review in DDBB.| { comment }                          |
| `POST`     | `/review/:reviewID/delete`         | Private route. Removes the review from the DDBB              |                                                          |







## Models

User

```javascript
{
  name: { type: String, require, unique},
  email: {type: String, requiere},
  password: {String, requiere},
  ID: Object_ID,
  image: String,
  Description: {type: String, maxlength: 280},
  Rol: {type: String},
  Gamelist:{Object_ID [] },
  Wishlist: {Object_ID [] },
  Social: {
  facebook: String,
  twitter: String,
  Steam: String
  },
  Genres:[],
  Location: String
}

```



Review

```javascript
{
  _id: Object_ID,
  User: { type: Schema.Types.ObjectId, ref:'User' },
  Game: {type: Schema.Types.ObjectId, ref: 'Game'},
  Comment: String,
  Timestamp: Date,
  Upvote: Number,
  Downvote: Number
}

```


Game

```javascript
{
  _id: Object_ID,
  Name: String,
  Released: String,
  Image: String,
  Metacritic: number,
  Genres: [],
  Api_id: String,
  Screenshoots: [''],
  Upvote: Number,
  Downvote: Number,
  GameSaved: Number
}

```




<br>



## Backlog

[See the Trello board.](https://trello.com/b/sdPDPIGx/module2-project)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/BeAvisP/M2-Project)

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)