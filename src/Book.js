import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Book extends Component {
	static propTypes = {
        books: PropTypes.array.isRequired,
        updateBooks: PropTypes.func.isRequired
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.books.length > 0) {
			_.each(nextProps.books, function (obj) {
				if (!obj.imageLinks) {
					obj.imageLinks = {};
					obj.imageLinks.thumbnail = {}
					obj.imageLinks.thumbnail.missing = true;
				}
			});
		}
	}
	render() {
		const { books, updateBooks } = this.props;
		return (
			<ol className="books-grid">
				{books.map((book) => (
					<li key={book.id}>
						<div className="book">
						    <div className="book-top">
						    	{book.imageLinks.thumbnail.missing && <img className="book-cover-missing" alt="Missing book cover!" />}
						    	{!book.imageLinks.thumbnail.missing && 
								        <div className="book-cover" style={{
								        	width: 128,
								        	height: 193,
								        	backgroundImage: `url(${book.imageLinks.thumbnail})`
										}} />}}
						        <div className="book-shelf-changer">
			        	            <select onChange={(event) => { updateBooks(book, event.target.value) }}>
			        	                <option readOnly>Move to...</option>
			        	                <option value="currentlyReading">Currently Reading</option>
			        	                <option value="wantToRead">Want to Read</option>
			        	                <option value="read">Read</option>
			        	                <option value="none">None</option>
			        	            </select>
			        	        </div>
						    </div>
						    <div className="book-title">{book.title}</div>
						    <div className="book-authors">
                            	<pre>{book.authors && book.authors.join('\n')}</pre>
                          	</div>
						</div>
					</li>
				))}
			</ol>
		)
	}
}
export default Book;