const Location = ({}) => {
  const latitude = 34.43456558183152;
  const longitude = 35.8363551818641;
  return (
    <>
      <iframe
        title="Location"
        src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1841.3458243041166!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDIyJzM3LjciTiAzNcKwNTEnMDEuNSJF!5e0!3m2!1sen!2slb!4v1706083092033!5m2!1sen!2slb`}
        width="100%"
        height="450"
        style={{ border: 0, marginBottom: "3rem" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="referrerpolicy"
      ></iframe>
    </>
  );
};

export default Location;
