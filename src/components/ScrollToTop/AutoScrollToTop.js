import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const AutoScrollToTop = (props) => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return <>{props.children}</>;
};

export default AutoScrollToTop;
