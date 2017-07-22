import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf';
import AddBook from './AddBook';
import './App.css';

// Handles the state variables and custom events
class Bookcase extends React.Component {
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
            this.setState({
                books: books
            });
        });
    }

    // Update book using API
    // then overwrite books array with updated data from getAll method
    updateBooks = (book, shelf) => {
        return BooksAPI.update(book, shelf).then(books => {
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
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <Bookshelf books={this.state.books} updateBooks={this.updateBooks} />

                            <div className="open-search">
                                <Link to="/search">Add a book</Link>
                            </div>
                        </div>
                    </div>
                )} />
                <Route path="/search" render={({ history }) => (
                    <AddBook
                        updateBooks={(book, shelf) => {
                            this.updateBooks(book, shelf)
                            history.push('/')
                        }} />
                )} />
            </div>
        )
    }
}
export default Bookcase;