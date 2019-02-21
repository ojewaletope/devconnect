import React from "react";
import classnames from "classnames";
import Proptypes from "prop-types";
const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  onChange,
  disabled,
  type
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": { error }
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
TextFieldGroup.propTypes = {
  name: Proptypes.string.isRequired,
  placeholder: Proptypes.string,
  value: Proptypes.string.isRequired,
  info: Proptypes.string,
  error: Proptypes.string,
  type: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  disabled: Proptypes.string
};
TextFieldGroup.defaultProps = {
  type: "text"
};
export default TextFieldGroup;
