import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UpdateBtn from './UpdateBtn';

class Book extends Component {
	static propTypes = {
        books: PropTypes.array.isRequired,
        updateBooks: PropTypes.func.isRequired
    };

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
				{books.map((obj) => (
					<li key={obj.id}>
						<div className="book">
						    <div className="book-top">
						    	{obj.imageLinks.thumbnail.missing && 
						    		<img className="book-cover-missing" alt="Missing book cover!" />
						    	}
						    	{!obj.imageLinks.thumbnail.missing && 
									<div className="book-cover" style={{
										width: 128,
										height: 193,
										backgroundImage: `url(${obj.imageLinks.thumbnail})`
									}}></div>
								}

								<UpdateBtn selectedBook={obj} updateBooks={updateBooks}></UpdateBtn>
						    </div>
						    <div className="book-title">{obj.title}</div>
						    <div className="book-authors">
                            	<pre>{obj.authors && obj.authors.join('\n')}</pre>
                          	</div>
						</div>
					</li>
				))}
			</ol>
		)
	}
}
export default Book;