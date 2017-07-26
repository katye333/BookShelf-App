import React from 'react';
import { Route, Link } from 'react-router-dom';
import _ from 'lodash';
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf';
import SearchBooks from './SearchBooks';
import './App.css';

// Handles the state variables and custom events
class App extends React.Component {
    // Create our empty state variable
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    // After component has been inserted into the DOM,
    // retrieve the books that are available to the user
    componentDidMount() {
        BooksAPI.getAll().then(books => {
            if (books.length > 0) {
                _.each(books, function (obj) {
                    if (!obj.imageLinks) {
                        obj.imageLinks = {};
                        obj.imageLinks.thumbnail = {};
                        obj.imageLinks.thumbnail.missing = true;
                    }
                });
                this.setState({
                    books: books
                });
            }
        });
    };

    // Update book using API
    // then overwrite books array with updated data from getAll method
    updateBooks = (book, shelf) => {
        return BooksAPI.update(book, shelf.target.id).then(books => {
            BooksAPI.getAll().then(books => {
                this.setState({
                    books: books
                });
            });
        });
    }

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>{_.startCase("MyReads")}</h1>
                        </div>
                        <div className="list-books-content">
                            <Bookshelf books={this.state.books} updateBooks={this.updateBooks} />
                            <div className="open-search">
                                <Link to="/search">Add a book</Link>
                            </div>
                        </div>
                    </div>
                )} />
                <Route path="/search" render={() => (
                    <SearchBooks
                        books={this.state.books}
                        updateBooks={(book, shelf) => {
                            this.updateBooks(book, shelf)
                        }}>
                    </SearchBooks>
                )} />
            </div>
        );
    }
}
export default App;