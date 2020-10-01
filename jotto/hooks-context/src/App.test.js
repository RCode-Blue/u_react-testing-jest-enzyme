import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

import hookActions from "./actions/hookActions";

const mockGetSecretWord = jest.fn();

/**
 * Setup function for app component
 * @returns {ShallowWrapper}
 *
 */
const setup = (secretWord = "party") => {
  return shallow(<App />);
};

/**
 * Setup function using mount for app component
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
const setupMount = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn()]);

  React.useReducer = mockUseReducer;

  // use mount, because useEffect is not called on 'shallow'
  // https://github.com/enzymejs/enzyme/issues/2086
  return mount(<App />);
};

test("renders without error", () => {
  // const wrapper = setup();
  const wrapper = setupMount();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});

describe("getSecretWord calls", () => {
  test("getSecretWord gets called on App mount", () => {
    setup();

    // ccheck to see if secret word was updates
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test("secretWord does not update on App update", () => {
    const wrapper = setupMount();
    mockGetSecretWord.mockClear();

    // wrapper.update() doesn not trigger update
    // (issue forked from // https://github.com/enzymejs/enzyme/issues/2091)
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe("secretWord is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setupMount("party");
  });

  test("renders app when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(true);
  });
  test("does not render spinner when secretWord is not null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe("secretWord is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setupMount(null);
  });

  test("does not render app when secretWord is null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(false);
  });
  test("renders spinner when secretWord is null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(true);
  });
});
