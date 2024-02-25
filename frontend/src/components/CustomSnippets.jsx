import propTypes from "prop-types";
import { CustomCSS } from "./CustomCSS";

export const CustomSnippets = {
  Heading: ({ heading }) => {
    return (
      <div className={CustomCSS.headingContainer}>
        <h1 className={CustomCSS.heading}>{heading}</h1>
      </div>
    );
  },
};

CustomSnippets.Heading.propTypes = {
  heading: propTypes.string.isRequired,
};
