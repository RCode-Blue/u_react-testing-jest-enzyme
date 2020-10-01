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
 * @returns {ReactWrapper}
 */
const setupMount = (secretWOrd = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

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
