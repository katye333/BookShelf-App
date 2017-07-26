import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UpdateBtn from './UpdateBtn';

class Book extends Component {
	static propTypes = {
        books: PropTypes.array.isRequired,
        updateBooks: PropTypes.func.isRequired
    };

    // Check if the books obj has a thumbnail image for each item
	componentWillReceiveProps(nextProps) {
		if (nextProps.books.length > 0) {
			_.each(nextProps.books, function (obj) {
				if (!obj.imageLinks) {
					obj.imageLinks = {};
					obj.imageLinks.thumbnail = {};
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
						    <div className="book-top end">
						    	{book.imageLinks && !book.imageLinks.thumbnail.missing
						    		? <div className="book-cover" style={{
						    			width: 128,
										height: 193,
										backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
									: <div className="book-cover-missing"></div>
						    	}
								<UpdateBtn selectedBook={book} updateBooks={updateBooks}></UpdateBtn>
						    </div>
						    <div className="book-title">{book.title}</div>
						    <div className="book-authors">
                            	<pre>{book.authors && book.authors.join('\n')}</pre>
                          	</div>
						</div>
					</li>
				))}
			</ol>
		);
	}
}
export default Book;