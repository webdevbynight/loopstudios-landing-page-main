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
