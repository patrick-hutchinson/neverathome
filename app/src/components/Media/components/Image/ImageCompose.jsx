import { useEffect, useState, useRef, forwardRef } from "react";

import Image from "./Image";
import styles from "../../Media.module.css";
import Placeholder from "../Placeholder";

const ImageCompose = ({ medium, className, objectFit }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${styles.mediaContainer} ${className}`}>
      {!isLoaded && <Placeholder medium={medium} isLoaded={isLoaded} />}
      <Image medium={medium} setIsLoaded={setIsLoaded} objectFit={objectFit} />
    </div>
  );
};

export default ImageCompose;
