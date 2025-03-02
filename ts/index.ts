import { getBreakpoints, hideMenuList, unhideMenuList } from "./utils.js";

const header = document.getElementById("header");
const menu = document.getElementById("menu");
if (header && menu) {
  const breakpoints = getBreakpoints();
  for (const event of ["load", "resize"]) {
    window.addEventListener(event, () => {
      const visibleMenuBreakpoint = breakpoints.get("visible-menu");
      if (window.matchMedia(`(min-width: ${visibleMenuBreakpoint})`).matches) {
        const buttons = menu.querySelectorAll("button");
        for (const button of buttons) {
          button.remove();
        }
      } else {
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
          this.className = classNameState;
          this.setAttribute("aria-expanded", ariaExpandedState);
          const menuList = menu.querySelector("ul");
          if (ariaExpanded === "false") unhideMenuList(menuList);
          else hideMenuList(menuList);
        });
        menu.insertBefore(button, menu.firstChild);
        hideMenuList(menu.querySelector("ul"));
      }
    });
  }
}
