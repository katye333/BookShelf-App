import React, { Component } from 'react';
import MoveShelf from './MoveShelf'

class Book extends Component {
	render() {
		const { shelf, onUpdateShelf } = this.props;

		return (
			<ol className='books-grid'>
				{shelf.map((book, index) => (
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
                        		<pre>{book.authors.join('\n')}</pre>
                        	</div>
						</div>
					</li>
				))}
			</ol>
		)
	}
}
export default Book;