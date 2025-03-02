import type { Breakpoints, SizeInEm } from "./types.js";

/**
 * Converts a value in pixel to em.
 * @param value - The value, assumed in pixels, to convert.
 * @return The value in em.
 */
const convertPxToEm = (value: number): SizeInEm => `${value / 16}em`;

/**
 * Gets the breakpoints declared as CSS custom properties at the root element.
 * @return A map containing key/value pairs (the breakpoint name as the key and its value converted to em).
 */
export const getBreakpoints = (): Breakpoints => {
  const breakpoints: Breakpoints = new Map();
  const prefix = "--breakpoint-";
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
        for (const property of rule.style) {
          if (property.startsWith(prefix)) breakpoints.set(property.replace(prefix, ""), convertPxToEm(Number(rule.style.getPropertyValue(property))));
        }
      }
    }
  }
  return breakpoints;
};

/**
 * Hides the menu list for screen readers on small screens.
 * @param menuList - The menu list element.
 */
export const hideMenuList = (menuList: HTMLUListElement | null): void => {
  if (menuList) {
    menuList.setAttribute("aria-hidden", "true");
    const links = menuList.querySelectorAll("a");
    for (const link of links) {
      link.tabIndex = -1;
    }
  }
};

/**
 * Unhides the menu list for screen readers on small screens.
 * @param menuList - The menu list element.
 */
export const unhideMenuList = (menuList: HTMLUListElement | null): void => {
  if (menuList) {
    menuList.removeAttribute("aria-hidden");
    const links = menuList.querySelectorAll("a");
    for (const link of links) {
      link.removeAttribute("tabindex");
    }
  }
};
