import Sortable from "sortablejs";
import { DateTime } from "luxon";
import groups from "../assets/default-data";

const boardContent = document.getElementById("board-content");

// const toDoCards = document.getElementById("to-do-cards");
// const doingCards = document.getElementById("doing-cards");
// const underReviewCards = document.getElementById("under-review-cards");
// const doneCards = document.getElementById("done-cards");

// const setDragCursor = (value) => {
//   const html = document.getElementsByTagName("html").item(0);
//   html.classList.toggle("grabbing", value);
// };

// const createSortable = (element, groupName, groups) =>
//   new Sortable(element, {
//     animation: 300,
//     group: {
//       name: groupName,
//       pull: groups,
//       put: groups,
//     },
//     delay: 90,
//     delayOnTouchOnly: true,
//     forceFallback: true,
//     ghostClass: "sortable-ghost",
//     dragClass: "sortable-drag",
//     onStart: () => {
//       setDragCursor(true);
//     },
//     onEnd: ({ to, from }) => {
//       setDragCursor(false);
//       console.log(`to: ${to.id}\nfrom: ${from.id}`);
//     },
//   });

// const list = [
//   { element: toDoCards, groupName: "toDoCards" },
//   { element: doingCards, groupName: "doingCards" },
//   { element: underReviewCards, groupName: "underReviewCards" },
//   { element: doneCards, groupName: "doneCards" },
// ];

// const groupsNames = list.map(({ groupName }) => groupName);

// list.forEach(({ element, groupName }) =>
//   createSortable(
//     element,
//     groupName,
//     groupsNames.filter((item) => item !== groupName)
//   )
// );

groups.forEach(({ name, title, color_class, tasks }) => {
  const contenedor = document.createElement("div");
  contenedor.className = "flex flex-col gap-4";

  contenedor.innerHTML = `
  <div class="flex items-center gap-3">

    <div class="${color_class} w-4 h-4 rounded"></div>
    <span class="font-bold">${title}</span>
  <i class="fa-solid fa-plus text-gray-400/95 hover-scale-item"></i>
  </div>
  `;

  const contenedorContent = document.createElement("div");
  contenedorContent.setAttribute("id", name);
  contenedorContent.className =
    "flex-1 space-y-5 w-60 overflow-x-hidden overflow-y-auto pr-1.5";

  tasks.forEach(({ title, description, date, img_url, participants }) => {
    contenedorContent.innerHTML += `
    <!-- Card -->
          <div class="card">
          <!-- Card img -->
          ${
            img_url
              ? `
              <!-- Card img -->
              <img class="w-full h-24 object-cover rounded-2xl" src=${img_url} alt="">`
              : ""
          }
            <!-- Content -->
            <div class="flex gap-1.5">
              <div class="flex-1 space-y-1.5">
                <span class="font-bold block">${title}</span>
                <span class="text-xs line-clamp-3 text-gray-400/95">
                ${description}
                </span>
              </div>
              <i class="fa-solid fa-ellipsis-vertical text-gray-400/95 text-xl"></i>
            </div>
            <!-- Details -->
            <div class="flex justify-between items-center">
              <!-- Date -->
              <div class="text-gray-400/95 text-[0.8rem] space-x-1">
                <i class="fa-solid fa-calendar-days"></i>
                <span>${DateTime.fromISO(date).toFormat("D")}</span>
              </div>
              <!-- Menbers -->
              <div class="flex flex-row items-center -space-x-2">
              ${participants
                .slice(0, 2)
                .map(
                  ({ img_url }) => `
              <img class="w-6 h-6 object-cover border-2 border-white dark:border-[#282A43] rounded-full" src=${img_url} alt="user">
              `
                )
                .join("")}
                ${
                  participants.slice(2).length > 0
                    ? `
                <div
                  class="w-5 h-5 bg-sky-100 dark:bg-purple-300 flex items-center justify-center rounded-full text-[7px] font-semibold text-black">
                  +${participants.slice(2).length}
                </div>
                `
                    : ""
                }
              </div>
            </div>
          </div>
    `;
  });

  contenedor.appendChild(contenedorContent);

  boardContent.appendChild(contenedor);
});
