import React from "react";
import styles from "./styles.scss";
import Ionicon from "react-ionicons";
import { Link } from "react-router-dom";

const PhotoOptions = props => (
  <div>
    <Link to="/modifyPhoto" onClick={props.getDetail}>
      <Ionicon icon="md-create" fontSize="28px" color="#black" />
    </Link>
    <span className={styles.icon} onClick={props.onClickDelete}>
      <Ionicon icon="md-close" fontSize="28px" color="#black" />
    </span>
  </div>
);

export default PhotoOptions;
