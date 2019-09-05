import React from "react";
import "./styles/SearchResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet, faHeart } from "@fortawesome/free-solid-svg-icons";

const SearchResult = props => {
  return (
    <div className="twitter-profile">
      <div className="row">
        <div className="col-md-1 mr-1">
          <img src={props.avatar} alt="Avatar" className={"rounded-circle"} />
        </div>
        <div className="col-md-10">
          <div className="name">{props.name}</div>
          <div className="text">{props.text}</div>
          <div className="clearfix" style={{ height: 5 }}></div>
          <FontAwesomeIcon icon={faRetweet} size="xs" />{" "}
          <span style={{ fontSize: ".8em" }}>{props.retweets}</span>&nbsp;&nbsp;
          <FontAwesomeIcon icon={faHeart} size="xs" />{" "}
          <span style={{ fontSize: ".8em" }}>{props.favorites}</span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SearchResult;
