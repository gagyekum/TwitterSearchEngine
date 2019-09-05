import React from "react";

class SearchBar extends React.Component {
  state = { searchTerm: "" };

  handleSubmit = e => {
    if (this.props.isBusy || this.state.searchTerm.trim() === '') {
      return;
    }

    e.preventDefault();
    this.props.onFetchTweets(this.state.searchTerm);
  };

  render() {
    return (
      <nav
        className={"navbar navbar-light fixed-top"}
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <a className="navbar-brand" href="#">
          <img
            src="/twitter30x30.png"
            className={"d-inline-block align-top"}
            alt=""
          ></img>
          {this.props.title}
        </a>
        <form onSubmit={this.handleSubmit} className="form-inline">
          <input
            disabled={this.props.isBusy}
            autoFocus={true}
            type="search"
            aria-label="Search"
            value={this.state.searchTerm}
            onChange={e => this.setState({ searchTerm: e.target.value })}
            className={"form-control mr-sm-2"}
            placeholder="Search tweets"
            required
          />

          <button
            disabled={this.props.isBusy}
            className={"btn btn-outline-primary my-2 my-sm-0"}
            type="submit"
          >
            {this.props.isBusy ? "Loading..." : "Search"}
          </button>
        </form>
      </nav>
    );
  }
}

export default SearchBar;
