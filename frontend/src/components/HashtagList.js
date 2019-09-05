import React from 'react';


const HashtagList = props => (
    <div>
        {props.hashtags.length === 0 ? <p>No hashtags found for '{props.term}'</p> : props.hashtags.map(hashtag => (
            <div key={hashtag.id}>{`#${hashtag.name}: `} <span className="badge badge-light">{hashtag.count}</span></div>
        ))}
        <hr />
    </div>
)

export default React.memo(HashtagList)