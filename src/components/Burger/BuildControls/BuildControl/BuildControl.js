import React from 'react';

let buildControl = (props) => {
  return (
    <div className="card-body align-self-center">
      <span className="mr-2">{props.label}</span>
      <button onClick={props.removed} className="btn btn-danger mr-2" disabled={props.disabled}>Less</button>
      <button onClick={props.added} className="btn btn-primary">More</button>
    </div>
  )
}

export default buildControl;