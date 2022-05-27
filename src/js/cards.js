import Sortable from "sortablejs";

const toDoCards = document.getElementById("to-do-cards");
const doingCards = document.getElementById("doing-cards");
const underReviewCards = document.getElementById("under-review-cards");
const doneCards = document.getElementById("done-cards");

const group = "table";

const setDragCursor = (value) => {
  const html = document.getElementsByTagName("html").item(0);
  html.classList.toggle("grabbing", value);
};

const createSortable = (element) =>
  new Sortable(element, {
    animation: 300,
    group,
    forceFallback: true,
    ghostClass: "sortable-ghost",
    dragClass: "sortable-drag",
    onStart: () => {
      setDragCursor(true);
    },
    onEnd: () => {
      setDragCursor(false);
    },
  });

const toDoSortable = createSortable(toDoCards);
const doingSortable = createSortable(doingCards);
const underReviewSortable = createSortable(underReviewCards);
const doneSortable = createSortable(doneCards);
