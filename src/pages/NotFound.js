import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 not found</title>
      </Helmet>
      <div>404 not found</div>
    </>
  );
};

export default NotFound;
