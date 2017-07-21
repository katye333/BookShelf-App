import React from 'react';
import { Route, Link } from 'react-router-dom';
import AddBook from './AddBook';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ 
                books: books
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        BooksAPI.getAll().then((books) => {
            this.setState({ 
                books: books
            });
        });
    }

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then((books) => {
            return books;
        });
    }

    render() {
        let dictionary_books = this.state.books.reduce((obj, current) => {
            if (!obj[current.shelf]) {
                obj[current.shelf] = [];
                obj[current.shelf].push(current);
            }
            else {
                obj[current.shelf].push(current);
            }
            return obj;
        },{});

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
                                            <div className="bookshelf-books">
                                                <Book 
                                                    shelf={dictionary_books[shelf]}
                                                    onUpdateShelf={(book, shelf) => {
                                                        this.updateShelf(book, shelf)
                                                        history.push('/')
                                                    }}>
                                                </Book>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="open-search">
                                <Link to='/search'>Add a book</Link>
                            </div>
                        </div>
                    </div>
                )} />

                <Route path='/search' render={({ history }) => (
                    <AddBook books={this.state.books}></AddBook>
                )} />
            </div>
        )
    }
}
export default App;