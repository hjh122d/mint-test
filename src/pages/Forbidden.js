import { Helmet } from "react-helmet-async";

const Forbidden = () => {
  return (
    <>
      <Helmet>
        <title>403 Error</title>
      </Helmet>
      <div>403 Error</div>;
    </>
  );
};

export default Forbidden;
