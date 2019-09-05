import React from "react";

const SearchInfo = props => (
  <div>
    <small className="text-muted">
      {props.isBusy
        ? "Loading..."
        : `${props.count === undefined ? 0 : props.count} results in ${
            props.completed_in === undefined ? 0.0 : props.completed_in
          } seconds`}
    </small>
  </div>
);

export default SearchInfo;
