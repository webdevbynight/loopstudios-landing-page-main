import { createButton, getBreakpoints, hideMenuList } from "./utils.js";

const header = document.getElementById("header");
const menu = document.getElementById("menu");
if (header && menu) {
  const breakpoints = getBreakpoints();
  for (const event of ["load", "resize"]) {
    window.addEventListener(event, () => {
      const visibleMenuBreakpoint = breakpoints.get("visible-menu");
      const buttons = menu.querySelectorAll("button");
      if (window.matchMedia(`(min-width: ${visibleMenuBreakpoint})`).matches) {
        for (const button of buttons) {
          button.remove();
        }
      } else if (!buttons.length) {
        createButton(menu);
        hideMenuList(menu.querySelector("ul"));
      }
    });
  }
}
