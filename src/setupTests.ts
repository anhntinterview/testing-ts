import "@testing-library/jest-dom/extend-expect";
import "jest-enzyme";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import enableHooks from "jest-react-hooks-shallow";
import { Component, createElement, ReactElement } from "react";

enableHooks(jest);
configure({ adapter: new Adapter() });

const ThemeProviderWrapper = ({ children }) => {
  createElement(children);
};

function renderWithTheme<P, S>(
  tree: ReactElement<P>,
  options?: any
): cheerio.Cheerio {
  return render(
    createElement(ThemeProviderWrapper, { children: tree }),
    options
  );
}

function shallowWithTheme<C extends Component, P = C["props"], S = C["state"]>(
  tree: ReactElement<P>
) {
  return shallow<C, P, S>(tree, {
    wrappingComponent: ThemeProviderWrapper,
  });
}

function mountWithTheme<C extends Component, P = C["props"], S = C["state"]>(
  tree: ReactElement<P>
) {
  return mount<C, P, S>(tree, {
    wrappingComponent: ThemeProviderWrapper,
  });
}

export function flushPromise() {
  return new Promise(setImmediate);
}

beforeEach(() => {
  global.mountWithTheme = mountWithTheme;
  global.shallowWithTheme = shallowWithTheme;
  global.renderWithTheme = renderWithTheme;
  document.createRange =
    document.createRange ||
    function () {
      return {
        setEnd: function setEnd() {},
        setStart: function setStart() {},
        getBoundingClientRect: function getBoundingClientRect() {
          return {
            right: 0,
          };
        },
        commonAncestorContainer: {
          nodeName: "BODY",
          ownerDocument: document,
        },
      } as any;
    };
});
