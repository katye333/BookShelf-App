import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UpdateBtn extends Component {
	static propTypes = {
		selectedBook: PropTypes.object.isRequired,
        updateBooks: PropTypes.func.isRequired
	}
  	state = {
        hidden: true
    };

  	unhide(event) {
  		this.state.hidden === false ? this.setState({ hidden: true }) : this.setState({ hidden: false});
  	}
	render() {
		const { selectedBook, updateBooks } = this.props;
		return (
			<div className="layout vertical">
				<div className="book-shelf-changer" onClick={(event) => { this.unhide(event) }}></div>
					<div  hidden={this.state.hidden} className="con" onClick={(e) => { updateBooks(selectedBook, e) }}>
						<div className="dropdown_title layout horizontal">
							<div>Move to...</div>
						</div>
						<div className="ddl_opt layout horizontal start-justified">
							{selectedBook.shelf === "currentlyReading"
								? <div id="currentlyReading">✔ Currently Reading</div>
								: <div id="currentlyReading">Currently Reading</div>}
						</div>
						<div className="ddl_opt layout horizontal start-justified">
							{selectedBook.shelf === "wantToRead"
								? <div id="wantToRead">✔ Want to Read</div>
								: <div id="wantToRead">Want to Read</div>}
						</div>
						<div className="ddl_opt layout horizontal start-justified">
							{selectedBook.shelf === "read"
								? <div id="read">✔ Read</div>
								: <div id="read">Read</div>}
						</div>
						<div className="ddl_opt layout horizontal start-justified">
							{selectedBook.shelf === "none"
								? <div id="none">✔ None</div>
								: <div id="none">None</div>}
						</div>
					</div>
			</div>
		)
	}
}
export default UpdateBtn;