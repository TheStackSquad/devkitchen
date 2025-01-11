// src/components/ui/FormInput.js
// components/ui/FormInput.js
import React from 'react';
import { useField } from 'formik';

const FormInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  
  return (
    <div className="form-input-container">
      <input
        {...field}
        {...props}
        className={`form-input peer ${
          meta.error && meta.touched ? 'border-red-500' : ''
        }`}
        placeholder=" "
      />
      <label
        htmlFor={props.id}
        className={`form-label ${
          meta.error && meta.touched ? 'text-red-500' : ''
        }`}
      >
        {label}
      </label>
      {meta.touched && meta.error ? (
        <div className="form-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormInput;