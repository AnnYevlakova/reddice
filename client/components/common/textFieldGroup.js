import React from "react";
import propTypes from "prop-types";
import classnames from "classnames";

const TextFiledGroup = ({ field, value, label, errors, type, onChange, checkUserExists}) => {
    return (
        <div className={classnames("form-group", { "has-error": errors })}>
            <label className="control-label">{label}</label>
            <input
                type={type}
                onBlur={checkUserExists}
                name={field}
                value={value}
                onChange={onChange}
                className="form-control" />
            {errors && <span className="help-block">{errors}</span>}
        </div>
    );
};

TextFiledGroup.propTypes = {
    field: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    errors: propTypes.string,
    type: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    onBlur: propTypes.func,
};

TextFiledGroup.defaultProps = {
    type: "text",
};

export default TextFiledGroup;
