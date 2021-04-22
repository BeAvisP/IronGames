# Project Name

<br>



## Description

Search platform for restaurants in Barcelona and creating the favorite list of restaurants.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by type of restaurant, log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can add favorite restaurants to my list.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **edit user** - As a user I want to be able to edit my profile.
- **result** - As a user I want to see the list of restaurant filter by my preferences.
- **restaurant listing** - As a user I want to see more details of the restaurant, be able to call them and visit their website and save it as favorites.



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

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  favorites: [FavoriteId],
}

```



Favorites model

```javascript
{
  placeId: String,
}

```



<br>



## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)