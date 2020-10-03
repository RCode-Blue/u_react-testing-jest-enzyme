import React from "react";
import { mount, shallow } from "enzyme";
import checkPropTypes from "check-prop-types";

import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./Input";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";

/**
 * Setup function for app component
 * @param {object} testValues - Context and props values for this specific test
 * @returns {ReactWrapper} - Wrapper for Input component and providers
 */
const setup = ({ language, secretWord, success }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Input secretWord={secretWord} />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

test("input renders without error", () => {
  const wrapper = setup({});
  const inputComponent = findByTestAttr(wrapper, "component-input");
  expect(inputComponent.length).toBe(1);
});

test("does not throw warning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
  //#region - manual check -
  // const expectedProps = { secretWord: 'party' };
  // const propError = checkPropTypes(
  //   Input.propTypes,
  //   expectedProps,
  //   "prop",
  //   Input.name
  // );
  // expect(propError).toBeUndefined();
  //#endregion
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    // mockSetCurrentGuess = jest.fn();
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });

  test("state updates with value of input box on change", () => {
    // const mockSetCurrentGuess = jest.fn();
    // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    // const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("textbox clears on click", () => {
    // const mockSetCurrentGuess = jest.fn();
    // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    // const wrapper = setup();
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click", { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

describe("languagePicker", () => {
  test("correctly renders submit string in english", () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });

  test("correctly renders congrats string in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });
});

test("input component does not show when success is true", () => {
  const wrapper = setup({ secretWord: "party", success: "true" });
  expect(wrapper.isEmptyRender()).toBe(true);
});
