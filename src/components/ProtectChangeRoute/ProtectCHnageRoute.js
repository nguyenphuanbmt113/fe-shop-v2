import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectChangeRoute = (props) => {
  const pathname = useLocation();
  useEffect(() => {
    if (window.confirm("Ban muốn rời khỏi trang này")) {
      toast.success("abs");
    }
  }, [pathname]);
  return <>{props.children}</>;
};
