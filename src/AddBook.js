import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class AddBook extends Component {
	state = {
		query: '',
		results: []
	};
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
	clearQuery = () => {
		this.setState({ query: '' });
	};

	render() {
		const { query, results } = this.state;
		const { books, updateBooks } = this.props;

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
					<Book books={results} updateBooks={this.props.updateBooks} />
				</div>
			</div>
		)
	}
}
export default AddBook;