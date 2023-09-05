import { Helmet } from "react-helmet";

const Title = ({ children }) => {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
};

export default Title;
