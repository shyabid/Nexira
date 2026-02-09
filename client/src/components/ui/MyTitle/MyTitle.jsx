const MyTitle = ({ children, className = "" }) => {
  return (
    <>
      <h3
        className={`${className} text-2xl md:text-3xl lg:text-4xl font-bold text-center`}
      >
        {children}
      </h3>
    </>
  );
};

export default MyTitle;
