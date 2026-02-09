const MyLabel = ({ htmlFor, className = "", children }) => {
  return (
    <>
      <label htmlFor={htmlFor} className={`label ${className}`}>
        {children}
      </label>
    </>
  );
};

export default MyLabel;
