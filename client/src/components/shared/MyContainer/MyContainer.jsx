const MyContainer = ({ children, className = "", ...props }) => {
  return (
    <div {...props} className={`container mx-auto px-5 ${className}`}>
      {children}
    </div>
  );
};

export default MyContainer;
