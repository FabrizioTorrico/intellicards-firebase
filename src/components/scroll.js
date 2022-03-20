export default function scroll(id, e) {
  e.preventDefault(); // Stop Page Reloading
  const el = document.getElementById(`${id}`);
  el && el.scrollIntoView({ behavior: "smooth" });
}
