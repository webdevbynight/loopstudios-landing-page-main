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

window.addEventListener("load", () => {
  const selectors = ["#hero picture", "#hero section", ".creations h2", ".creations p", ".creations ul a"];
  const observedElements = document.querySelectorAll(selectors.join(", "));
  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "0% 0% -7.5%"
  };
  const observer = new IntersectionObserver((entries, _observer) => {
    for (const entry of entries) {
      const { target } = entry;
      if (entry.isIntersecting) target.classList.add("active");
      else target.classList.remove("active");
    }
  }, observerOptions);
  for (const observedElement of observedElements) {
    if (observedElement) observer.observe(observedElement);
  }
});
