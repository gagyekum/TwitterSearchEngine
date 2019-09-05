import React from 'react';


const WarningAlert = props => (
    <div className={"alert alert-warning"} role="alert">
        <strong>Oops!</strong> {props.message}
    </div>
)

export default WarningAlert;