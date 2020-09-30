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
