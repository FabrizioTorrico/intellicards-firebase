export default function scroll(id, e) {
  const el = document.getElementById(`${id}`);
  e.preventDefault(); // Stop Page Reloading
  el && el.scrollIntoView({ behavior: "smooth" });
}
