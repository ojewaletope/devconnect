import React from "react";
import classnames from "classnames";
import Proptypes from "prop-types";

export const InputGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  onChange,
  disabled,
  icon,
  type
}) => {
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export const TextAreaGroup = ({
  name,
  value,
  error,
  info,
  onChange,
  placeholder,
  disabled
}) => {

  return (
    <div className="form-group">
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
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

export const SelectListGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  onChange,
  disabled,
  options
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export const TextFieldGroup = ({
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
          "is-invalid": error
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

SelectListGroup.propTypes = {
  name: Proptypes.string.isRequired,
  placeholder: Proptypes.string,
  value: Proptypes.string.isRequired,
  info: Proptypes.string,
  error: Proptypes.string,
  onChange: Proptypes.func.isRequired,
  options: Proptypes.array.isRequired
};

TextAreaGroup.propTypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  info: Proptypes.string,
  error: Proptypes.string,
  onChange: Proptypes.func.isRequired,
  disabled: Proptypes.string,

};

InputGroup.propTypes = {
  name: Proptypes.string.isRequired,
  placeholder: Proptypes.string,
  value: Proptypes.string.isRequired,
  info: Proptypes.string,
  error: Proptypes.string,
  type: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  icon: Proptypes.string
};

InputGroup.defaultProps = {
  type: "text"
};
