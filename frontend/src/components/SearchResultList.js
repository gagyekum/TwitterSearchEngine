import React from "react";
import SearchResult from "./SearchResult";

const SearchResultList = props => (
  <div>
    {props.tweets.length === 0 ? <p>No results found for '{props.term}'</p> : props.tweets.map(tweet => (
      <SearchResult key={tweet.id} {...tweet} />
    ))}
  </div>
);

export default React.memo(SearchResultList);
