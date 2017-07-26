import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
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
					// Find books that are already in your personal library and
					// mark the correct shelf in the dropdown menu
					const interSect = _.intersectionBy(this.props.books, result, "id");
					const newUp = _.map(result, function(obj) {
						let t = _.find(interSect, { "id": obj.id });
						if (t) {
							return t;
						}
						return obj;
					});
					this.setState({ results: newUp });
				}
			});
		}
		else
		{
			this.setState({ results: [] });
		}
	}

	// Update the shelf property in the results array
	// This will add the checkmark to the selected book (and keep it there)
	componentWillReceiveProps(nextProps) {
		const temp = this.state.results;

		const interSect = _.intersectionBy(nextProps.books, temp, "id");
		const newUp = _.map(temp, function(obj) {
			let t = _.find(interSect, { "id": obj.id });
			if (t) {
				return t;
			}
			return obj;
		});
		this.setState({ results: newUp });
	}
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