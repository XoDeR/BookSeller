import React from "react";
import PropTypes from "prop-types";

const SingleBigInput = props => (
  <div className="form-group">
    <label>{props.header}</label>
    <textarea
      type="text"
      style={{ height: 100 }}
      className="form-control"
      value={props.content}
      onChange={props.onChange}
      name={props.name}
    />
  </div>
);

SingleBigInput.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SingleBigInput;