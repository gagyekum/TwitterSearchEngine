import React from "react";
import SearchResultList from "./SearchResultList";
import HashtagList from "./HashtagList";

const SearchTabContainer = props =>
  props.activeTab === "tweet" ? (
    <SearchResultList tweets={props.results} term={props.term} />
  ) : (
    <HashtagList hashtags={props.results} term={props.term} />
  );

export default SearchTabContainer;
