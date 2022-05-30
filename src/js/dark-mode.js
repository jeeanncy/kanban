const checkbox = document.querySelector("#checkbox");

// Funcion que guarda en el local storage
const setDarkMode = (value) => {
  const preferences = {
    dark_mode: value,
  };
  localStorage.setItem("preferences", JSON.stringify(preferences));
};

//Establecer segun las preferencias del sistema por default
const preferences = JSON.parse(localStorage.getItem("preferences"));
const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)");

if (preferences === null) {
  if (isSystemDark.matches) {
    checkbox.checked = true;
    document.documentElement.classList.add("dark");
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }
} else if (preferences.dark_mode) {
  checkbox.checked = true;
  document.documentElement.classList.add("dark");
}

// Trigger checkbox
checkbox.addEventListener("change", (e) => {
  document.documentElement.classList.toggle("dark");
  setDarkMode(e.target.checked);
});

// Trigger prferencias del sistema
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (e.matches) {
      checkbox.checked = true;
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      checkbox.checked = false;
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  });
