import React, { Component } from 'react';

class MoveShelf extends Component {
	render() {
		const { book, onUpdateShelf } = this.props;

		return (
			<div className="book-shelf-changer">
	            <select onChange={(event) => { onUpdateShelf(book, event.target.value) }}>
	                <option readOnly>Move to...</option>
	                <option value="currentlyReading">Currently Reading</option>
	                <option value="wantToRead">Want to Read</option>
	                <option value="read">Read</option>
	                <option value="none">None</option>
	            </select>
	        </div>
		)
	}
}
export default MoveShelf;