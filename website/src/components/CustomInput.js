import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, classname ,value, onChange} = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
