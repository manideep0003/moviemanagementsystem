# Movie Management System

A simple Movie Management System made with:

- HTML
- CSS
- JavaScript
- DOM
- Axios
- JSON Server

## Features

1. Add movie
2. Update movie
3. Delete movie
4. Search movie
5. Filter by genre
6. Sort by rating
7. View movie details
8. Add/remove favorites

## Folder Structure

project-root/
|-- views/
|   |-- index.html
|   |-- details.html
|
|-- css/
|   |-- style.css
|   |-- layout.css
|
|-- js/
|   |-- service/
|   |   |-- movieService.js
|   |   |-- studentService.js
|   |
|   |-- apiConfig.js
|   |-- main.js
|   |-- utils.js
|
|-- exception/
|   |-- apiException.js
|   |-- validationException.js
|
|-- assets/
|-- db.json
|-- package.json

## How to Run

Open the project folder in VS Code.

### Step 1

Open Terminal in the project folder:

npm install

### Step 2

Start the JSON Server:

npm run server

The API will run at:

http://localhost:3000/movies

### Step 3

Open:

views/index.html

in the browser.

For the easiest VS Code workflow, use the Live Server extension and open `views/index.html`.

## How the project works

Browser
  |
  v
index.html
  |
  v
main.js
  |
  v
movieService.js
  |
  v
Axios
  |
  v
JSON Server
  |
  v
db.json

`main.js` handles DOM events and page changes.

`movieService.js` contains Axios GET, POST, PATCH and DELETE requests.

`db.json` stores the movie data.

`details.html` displays one movie using its id from the URL.


## Login

The application now has a simple login page.

Open:

`views/login.html`

Demo account:

- Username: `admin`
- Password: `admin123`

After login, the user can access the movie management page.

The login state is stored in `sessionStorage`. This is a simple educational project login, not a production authentication system.
