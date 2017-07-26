import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UpdateBtn extends Component {
	static propTypes = {
		selectedBook: PropTypes.object.isRequired,
        updateBooks: PropTypes.func.isRequired
	};
  	state = {
        hidden: true
    };

  	unhide(event) {
  		// Add property to control the current view of the drop down menu
  		this.state.hidden === false ? this.setState({ hidden: true }) : this.setState({ hidden: false});
  	}
	render() {

		// Build book grid with checkmarks showing the row each book is on (main and search pages)
		// Update the books on row clicked
		const { selectedBook, updateBooks } = this.props;
		return (
			<div>
				<div className="book-shelf-changer" onClick={(event) => { this.unhide(event) }}></div>
				<div className="layout vertical">
					<div hidden={this.state.hidden} className="container">
						<div className="dropdown_title layout horizontal">
							<div>Move to...</div>
						</div>
						<div className="ddl_opt layout horizontal start-justified" onClick={(e) => {updateBooks(selectedBook, e)}}>
							{selectedBook.shelf === "currentlyReading"
								? <div id="currentlyReading">✔ Currently Reading</div>
								: <div id="currentlyReading">Currently Reading</div>}
						</div>
						<div className="ddl_opt layout horizontal start-justified" onClick={(e) => {updateBooks(selectedBook, e)}}>
							{selectedBook.shelf === "wantToRead"
								? <div id="wantToRead">✔ Want to Read</div>
								: <div id="wantToRead">Want to Read</div>}
						</div>
						<div className="ddl_opt layout horizontal start-justified" onClick={(e) => {updateBooks(selectedBook, e)}}>
							{selectedBook.shelf === "read"
								? <div id="read">✔ Read</div>
								: <div id="read">Read</div>}
						</div>
						<div className="ddl_opt layout horizontal start-justified" onClick={(e) => {updateBooks(selectedBook, e)}}>
							{selectedBook.shelf === "none"
								? <div id="none">✔ None</div>
								: <div id="none">None</div>}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default UpdateBtn;