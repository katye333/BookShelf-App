---
---
# **Bookshelf**
---
---
Bookshelf allows you to select and categorize books you've read, are currently reading, or want to read.
This project is part of the ReactJS nanodegree offered by Udacity.

This application was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## What You're Getting
```
+--public/
    |-- index.html
    |-- favicon.ico
+-- src/
    +-- icons/
        |-- add.svg
        |-- arrow-back.svg
        |-- arrow-drop-down.svg
        |-- missing-book-cover.jpg
    |-- App.js
    |-- App.css
    |-- Book.js
    |-- BooksAPI.js
    |-- Bookshelf.js
    |-- index.css
    |-- index.js
    |-- SearchBooks.js
    |-- UpdateBtn.js
|-- .gitignore
|-- CONTRIBUTING.MD
|-- README.MD
|-- SEARCH_TERMS.md
|-- package.json
```

### Features
---
  - The main page displays a listing of categories, each containing a number of books
  - The search page queries the API for books with matching titles and/or authors as the input changes
  - Each book has a control that allows the user to either add it to the bookshelf or move it to a different one
  - **Note**: The search field _only_ works with the terms on the SEARCH_TERMS file

### API Reference
---
##### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

##### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

##### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

#### Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

### Installation
---
Bookshelf requires [NPM](https://www.npmjs.com/) v5+ to run.

Install the dependencies and start the server.

```sh
$ npm install
$ npm start
```

### License
---
MIT © [Kaitlin Stevens](https://github.com/katye333)