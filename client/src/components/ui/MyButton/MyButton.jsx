const MyButton = ({ children, onClick, className = "", disabled = false }) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`btn btn-sm md:btn-md primary_linear primary_linear_hover shadow-none border-none text-neutral ${className}`}
      >
        {children}
      </button>
    </>
  );
};

export default MyButton;
