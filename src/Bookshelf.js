import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Book from './Book';
import './App.css';

class Bookshelf extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateBooks: PropTypes.func.isRequired
    }
    render() {
        const { books, updateBooks } = this.props;

        /*
            (Using LoDash)
            Build dictionary object from books array in following form:
                * {
                *     currentlyReading: [object, object],
                *     wantToRead: [object, object],
                *     read: [object, object]
                * }
        */

        let books_by_shelf = _.groupBy(books, 'shelf');
        return (

            // Map the keys of the dictionary object as each shelf of the bookcase
            // Pass the Book component an entire shelf of books
            <div>
                {_.keys(books_by_shelf).map((shelf) => (
                    <div key={shelf} className="bookshelf">
                        <h2 id={shelf} className="bookshelf-title"></h2>
                        <div className="bookshelf-books">
                            <Book books={books_by_shelf[shelf]} updateBooks={updateBooks} />
                        </div>
                    </div>
                ))};
            </div>
        );
    }
}
export default Bookshelf;