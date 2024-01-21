import PropTypes from "prop-types";
import "./GlobalStyle.css";

function GlobalStyle({ children }) {
  return children;
}

GlobalStyle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyle;
