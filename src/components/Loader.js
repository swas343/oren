import loadingImg from "../assets/loader.gif";
import { Fragment } from "react";

const Loader = (props) => {
  return (
    <Fragment>
      <img className="text-center d-block m-auto mt-5" src={loadingImg} alt="loader" />
    </Fragment>
  );
};

export default Loader;
