import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};
const inputStateReducer = (state, action) => {
  if (action.type === "input") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "blur") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "reset") {
    return { isTouched: false, value: "" };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e) => {
    dispatch({ type: "input", value: e.target.value });
    //setEnteredValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    dispatch({ type: "blur" });

    //setIsTouched(true);
  };
  const reset = () => {
    dispatch({ type: "reset" });
  };

  return {
    reset,
    isValid: valueIsValid,
    value: inputState.value,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
  };
};
export default useInput;
