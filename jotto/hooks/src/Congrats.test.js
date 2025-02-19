import React from "react";
import { shallow } from "enzyme";

// import checkPropTypes from "check-prop-types";

import { findByTestAttr, checkProps } from "../test/testUtils";
import Congrats from "./Congrats";

const defaultProps = { success: false };

/**
 *
 * @param {Factory function to create a ShallowWrapper for the COngrats component.
 * @function setup
 * @param{object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  // const setupProps={...defaultProps}
  // return shallow(<Congrats {...props} />);
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("renders no text when 'success' prop is FALSE", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("renders non-empty congrats msg when 'success' prop is TRUE", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});

test("does not throw warning with expected props", () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
  // #region
  // const propError = checkPropTypes(
  //   Congrats.propTypes,
  //   expectedProps,
  //   "prop",
  //   Congrats.name
  // );
  // expect(propError).toBeUndefined();
  // #endregion
});
