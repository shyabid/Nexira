const MyInput = ({
  type = "text",
  placeholder = "",
  name = "",
  className = "",
  required = true,
  disabled = false,
  ...props
}) => {
  return (
    <>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`input ${className}`}
        disabled={disabled}
        required={required}
        {...props}
      />
    </>
  );
};

export default MyInput;
