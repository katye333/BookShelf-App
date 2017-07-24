import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
	static propTypes = {
	    updateBooks: PropTypes.func.isRequired
	};

	// State variable declarations
	// query contains the user-supplied search terms
	// results will hold the books that match the query
	state = {
		query: '',
		results: []
	};

	// On input changed, populate query state variable
	// Show blank screen if no results found or on if field is cleared
	updateQuery = (query) => {
		this.setState({ query: query });
		if (query !== "") {
			BooksAPI.search(query, 20).then(result => {
				if (result.error) {
					this.setState({ results: [] });
				}
				else
				{
					this.setState({ results: result });
				}
			});
		}
		else
		{
			this.setState({ results: [] });
		}
	};

	render() {
		const { query, results } = this.state;
		const { updateBooks } = this.props;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input
		    				type="text"
		    				placeholder="Search by title or author"
		    				value={query}
		    				onChange={(event) => this.updateQuery(event.target.value)} />
					</div>
				</div>

				<div className="search-books-results">
					<Book books={results} updateBooks={updateBooks} />
				</div>
			</div>
		);
	}
}
export default SearchBooks;