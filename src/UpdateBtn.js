import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UpdateBtn extends Component {
	static propTypes = {
		selectedBook: PropTypes.object.isRequired,
        updateBooks: PropTypes.func.isRequired
	};

	render() {
		const { selectedBook, updateBooks } = this.props;
		return (
			<div className="book-shelf-changer">
				<select onChange={(event) => { updateBooks(selectedBook, event.target.value) }}>
					<option value="" disabled>Move to...</option>
					{selectedBook.shelf === "currentlyReading"
						? <option value="currentlyReading">✔ Currently Reading</option>
						: <option value="currentlyReading">Currently Reading</option>}
					{selectedBook.shelf === "wantToRead"
						? <option value="wantToRead">✔ Want to Read</option>
						: <option value="wantToRead">Want to Read</option>}
					{selectedBook.shelf === "read"
						? <option value="read">✔ Read</option>
						: <option value="read">Read</option>}
					<option value="none">None</option>
				</select>
			</div>
		)
	}
}
export default UpdateBtn;