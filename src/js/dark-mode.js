const checkbox = document.querySelector("#checkbox");

//Establecer segun las preferencias del sistema
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  checkbox.checked = true;
  document.documentElement.classList.add("dark");
}

// Trigger checkbox
checkbox.addEventListener("change", () => {
  document.documentElement.classList.toggle("dark");
});

// Trigger prferencias del sistema
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (e.matches) {
      checkbox.checked = true;
      document.documentElement.classList.add("dark");
    } else {
      checkbox.checked = false;
      document.documentElement.classList.remove("dark");
    }
  });
