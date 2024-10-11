import { useReducer } from "react";

const useInput = function (func) {
  const inputStateReducer = (prevState, action) => {
    switch (action.type) {
      case "INPUT_CLICKED":
        return {
          ...prevState,
          isClicked: true,
          isValid: func(prevState.value),
        };
      case "INPUT_ENTER":
        return {
          ...prevState,
          value: action.value,
          isValid: func(action.value),
        };
      case "INPUT_RESET":
        return {
          ...prevState,
          value: "",
          isClicked: false,
          isValid: false,
        };
      default:
        return;
    }
  };

  const [inputState, dispatchFormState] = useReducer(inputStateReducer, {
    value: "",
    isClicked: false,
    isValid: false,
  });

  const clickHandler = () => {
    dispatchFormState({ type: "INPUT_CLICKED" });
  };

  const enterHandler = (e) => {
    dispatchFormState({ type: "INPUT_ENTER", value: e.target.value });
  };

  const resetFunction = () => {
    dispatchFormState({ type: "INPUT_RESET" });
  };

  return {
    value: inputState.value,
    isClicked: inputState.isClicked,
    isValid: inputState.isValid,
    clickHandler,
    enterHandler,
    resetFunction,
  };
};

export default useInput;
