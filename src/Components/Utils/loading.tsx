import React, { useEffect, useRef } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const LoadingComponent: React.FC<{
  inverted?: boolean;
  content?: string;
}> = ({ inverted = true, content }) => {
    const loaderRef = useRef(null);
    useEffect(() => {
        const node = loaderRef.current;
        // Do something with the DOM node if needed
      }, []);
  return (
    <Dimmer href='loaderRef' active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};
