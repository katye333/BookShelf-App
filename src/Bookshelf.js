import React from 'react';
import _ from 'lodash';
import Book from './Book';
import './App.css';

class Bookshelf extends React.Component {
    render() {
        const { books, updateBooks } = this.props;
        let books_by_shelf = _.groupBy(books, 'shelf');

        return (
            <div>
                {_.keys(books_by_shelf).map((shelf) => (
                    <div key={shelf} className="bookshelf">
                        <h2 id={shelf} className="bookshelf-title"></h2>
                        <div className="bookshelf-books">
                            <Book books={books_by_shelf[shelf]} updateBooks={this.props.updateBooks} />
                        </div>
                    </div>
                ))};
            </div>
        )
    }
}
export default Bookshelf;