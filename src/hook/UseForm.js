import { useState } from "react";

export const UseForm = (initState) => {
  const [state, setState] = useState(initState);
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return {
    state,
    handleChangeState,
  };
};
