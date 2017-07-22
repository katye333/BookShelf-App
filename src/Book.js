import React, { Component } from 'react';
import _ from 'lodash';
import MoveShelf from './MoveShelf'

class Book extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.shelf.length > 0) {
			_.each(nextProps.shelf, function (obj) {
				if (!obj.imageLinks) {
					obj.imageLinks = {};
					obj.imageLinks.thumbnail = `url('./icons/default_book.png')`
				}
			})
		}
	}

	render() {
		const { shelf, onUpdateShelf } = this.props;
		return (
			<ol className='books-grid'>
				{shelf.map((book) => (
					<li key={book.id}>
						<div className="book">
						    <div className="book-top">
						        <div className="book-cover" style={{
						        	width: 128,
						        	height: 193,
						        	backgroundImage: `url(${book.imageLinks.thumbnail})`
								}} />
						        <MoveShelf
						        	book={book}
						        	onUpdateShelf={onUpdateShelf}>
						        </MoveShelf>
						    </div>
						    <div className="book-title">{book.title}</div>
						    <div className="book-authors">
                            	<pre>{book.authors}</pre>
                          	</div>
						</div>
					</li>
				))}
			</ol>
		)
	}
}
export default Book;