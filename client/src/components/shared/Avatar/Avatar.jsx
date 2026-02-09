const Avatar = ({ size = "size-8", src = "", alt = "" }) => {
  return (
    <>
      <div className="avatar">
        <div
          className={`ring-primary ring-offset-base-100 ${size} md:size-10 rounded-full ring-2`}
        >
          <img src={src} alt={alt} referrerPolicy="no-referrer" />
        </div>
      </div>
    </>
  );
};

export default Avatar;
