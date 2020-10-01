import React from "react";
import { shallow } from "enzyme";
import checkPropTypes from "check-prop-types";

import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./Input";

/**
 * Setup function for app component
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = "party") => {
  return shallow(<Input secretWord={secretWord} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
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
    wrapper = setup();
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
