import React from 'react';
import _ from 'lodash';
import { Route, Link } from 'react-router-dom';
import Book from './Book';
import AddBook from './AddBook';
import * as BooksAPI from './BooksAPI';
import './App.css';

class Bookcase extends React.Component {
    // Create empty state variable that will contain
    // the books currently in Bookcase 
    // Will be populated with data on componentDidMount()
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    // After the component has been inserted into the
    // DOM, set the state using return values from API
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            });
        });
    }

    // This method calls the API update function and 
    // resets the state variable to the updated values
    updateShelf = (book, shelf) => {
        return BooksAPI.update(book, shelf).then(books => {
            BooksAPI.getAll().then(books => {
                this.setState({
                    books: books
                });
            });
        });
    }

    render() {

        /* 
            (Using LoDash)
            Build dictionary of books from state variable, grouped by shelf name
            Format of dictionary: 
            * {
            *     currentlyReading: [object, object],
            *     wantToRead: [object, object],
            *     read: [object, object]
            * } 
        */
        let dictionary_books = _.groupBy(this.state.books, 'shelf');

        return (
            <div>
                <Route exact path='/' render={({ history }) => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {Object.keys(dictionary_books).map((shelf) => (
                                    <div key={shelf} className="bookshelf">
                                        <h2 id={shelf} className="bookshelf-title"></h2>
                                        <div className="bookshelf-books">
                                            <Book
                                                shelf={dictionary_books[shelf]}
                                                onUpdateShelf={(book, shelf) => {
                                                    this.updateShelf(book, shelf)
                                                    history.push('/')
                                                }} />
                                        </div>
                                    </div>
                                ))};
                            </div>

                            <div className="open-search">
                                <Link to='/search'>Add a book</Link>
                            </div>
                        </div>
                    </div>
                )} />

                <Route path='/search' component={AddBook} />
            </div>
        )
    }
}
export default Bookcase;