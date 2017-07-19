import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class BookShelf extends Component {
	render() {
		const { books, onUpdateShelf } = this.props;
		const dictionary_books = books.reduce((obj, current) => {
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
											onUpdateShelf={onUpdateShelf}>
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
		)
	}
}
export default BookShelf;