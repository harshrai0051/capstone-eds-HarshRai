export default function decorate(block) {
 
  const img = block.querySelector("img");
 
  if (img) {
    img.removeAttribute("loading"); // remove lazy
    img.setAttribute("loading", "eager");
    img.setAttribute("fetchpriority", "high");
  }
 
}