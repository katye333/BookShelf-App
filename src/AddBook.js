import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class AddBook extends Component {
	state = {
		query: ''
	};
	updateQuery = (query) => {
		this.setState({ query: query.trim() });
	};
	clearQuery = () => {
		this.setState({ query: '' });
	};
	render() {
		const { books, shelf, onUpdateShelf } = this.props;
		const { query } = this.state;

		let showingBooks;
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i');
			showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors));
		}
		else {
			showingBooks = books;
		}
		showingBooks.sort(sortBy('title'));

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input
		    				type='text'
		    				placeholder='Search by title or author'
		    				value={query}
		    				onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>

				<div className="search-books-results">
					<Book 
						shelf={showingBooks}
						onUpdateShelf={onUpdateShelf}>
					</Book>
				</div>
			</div>
		)
	}
}
export default AddBook;