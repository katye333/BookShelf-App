import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListBooks extends Component {
	render() {
		const { books } = this.props;
		const dictionary_books = books.reduce((obj, current) => {
			current.formatted_authors = current.authors.join('\n');
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
						{Object.keys(dictionary_books).map((shelf, index) => (
							<div key={shelf} className="bookshelf">
								<h2 id={shelf} className="bookshelf-title"></h2>
								<div className="bookshelf-books">
									<div className='books-grid'>
										{Object.values(dictionary_books[shelf]).map((book, index) => (
											<ol key={book.id}>
												<li>
													<div className="book">
													    <div className="book-top">
													        <div className="book-cover" style={{
													        	width: 128,
													        	height: 193,
													        	backgroundImage: `url(${book.imageLinks.thumbnail})`
															}} />
													        <div className="book-shelf-changer">
													            <select>
													                <option value="none" disabled>Move to...</option>
													                <option value="currentlyReading">Currently Reading</option>
													                <option value="wantToRead">Want to Read</option>
													                <option value="read">Read</option>
													                <option value="none">None</option>
													            </select>
													        </div>
													    </div>
													    <div className="book-title">{book.title}</div>
													    <div className="book-authors"><pre>{book.formatted_authors}</pre></div>
													</div>
												</li>
											</ol>
										))}
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
export default ListBooks;