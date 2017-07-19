import React from 'react';
import { Route } from 'react-router-dom';
import AddBook from './AddBook';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';
import './App.css';

class App extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books });
        });
    }

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(this.setState({ shelf: shelf }));
    }

    render() {
        return (
            <div>
                <Route exact path='/' render={({ history }) => (
                    <BookShelf
                        books={this.state.books}
                        onUpdateShelf={(book, shelf) => {
                            this.updateShelf(book, shelf)
                            history.push('/')
                        }}>
                    </BookShelf>
                )} />

                <Route path='/search' render={({ history }) => (
                    <AddBook books={this.state.books}></AddBook>
                )} />
            </div>
        )
    }
}
export default App;