/**
 * scrolls to id
 * @param {String} id checks if the id passed as param exists in the dom
 * @param {Event} e needs the event to prevent default reload
 */
export default function scroll(id, e) {
  e.preventDefault(); // Stop Page Reloading
  const el = document.getElementById(`${id}`);
  el && el.scrollIntoView({ behavior: "smooth" });
}
