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
 * Creates the button to show and hide menu on small screens.
 * @param parentElement - The button parent element.
 */
export const createButton = (parentElement: HTMLElement): void => {
  const bars = 3;
  const width = 24;
  const height = 19;
  const lineY = 9.5;
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  const lineId = "menu-icon-bar";
  line.id = lineId;
  line.setAttribute("x1", "0");
  line.setAttribute("y1", String(lineY));
  line.setAttribute("x2", "24");
  line.setAttribute("y2", String(lineY));
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.appendChild(line);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Show menu");
  svg.appendChild(defs);
  for (let i = 1; i <= bars; i++) {
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.classList.add("icon-bar");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${lineId}`);
    svg.appendChild(use);
  }
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("aria-expanded", "false");
  button.appendChild(svg);
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const ariaExpanded = this.getAttribute("aria-expanded");
    const classNameState = ariaExpanded === "false" ? "open" : "closed";
    const ariaExpandedState = ariaExpanded === "false" ? "true" : "false";
    const buttonLabel = ariaExpanded === "false" ? "Hide menu" : "Show menu";
    this.className = classNameState;
    this.setAttribute("aria-expanded", ariaExpandedState);
    const svg = this.querySelector("svg");
    if (svg) svg.setAttribute("aria-label", buttonLabel);
    const menuList = parentElement.querySelector("ul");
    if (ariaExpanded === "false") unhideMenuList(menuList);
    else hideMenuList(menuList);
  });
  parentElement.insertBefore(button, parentElement.firstChild);
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
