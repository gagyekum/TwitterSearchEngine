import React from "react";

class SearchToggler extends React.Component {
  handleTweetToggle = e => {
    e.preventDefault();
    this.props.onToggleTab("tweet");
  };

  handleHashtagToggle = e => {
    e.preventDefault();
    this.props.onToggleTab("hashtag");
  };

  render() {
    return (
      !this.props.hide && (
        <ul className={"nav nav-tabs justify-content-center"}>
          <li className="nav-item">
            <a
              className={
                this.props.activeTab === "tweet"
                  ? "nav-link active"
                  : "nav-link"
              }
              href="#"
              onClick={this.handleTweetToggle}
            >
              Tweets
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                this.props.activeTab === "hashtag"
                  ? "nav-link active"
                  : "nav-link"
              }
              href="#"
              onClick={this.handleHashtagToggle}
            >
              Hashtags <span className="badge badge-light">{this.props.hashtagCount}</span>
            </a>
          </li>
        </ul>
      )
    );
  }
}

export default SearchToggler;
