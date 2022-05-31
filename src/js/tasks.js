import Sortable from "sortablejs";
import { DateTime } from "luxon";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import defaultGroups from "../assets/default-data";

const boardContent = document.getElementById("board-content");
const search = document.getElementById("search");

const setDragCursor = (value) => {
  const html = document.getElementsByTagName("html").item(0);
  html.classList.toggle("grabbing", value);
};

const eliminar = (taskId) => {
  let groups = JSON.parse(localStorage.getItem("groups"));

  const filteredGroups = {};

  Object.keys(groups).forEach((key) => {
    filteredGroups[key] = {
      ...groups[key],
      tasks: groups[key].tasks.filter(({ id }) => id !== taskId),
    };
  });

  localStorage.setItem("groups", JSON.stringify(filteredGroups));
  generateGroups(filteredGroups);
};

const buscar = (searchValue) => {
  let groups = JSON.parse(localStorage.getItem("groups"));
  searchValue.trim();
  if (searchValue !== "") {
    const filteredGroups = {};

    Object.keys(groups).forEach((key) => {
      filteredGroups[key] = {
        ...groups[key],
        tasks: groups[key].tasks.filter(({ title }) =>
          title.toLowerCase().includes(searchValue.toLowerCase())
        ),
      };
    });
    generateGroups(filteredGroups);
  } else {
    generateGroups(groups);
  }
};

const createSortable = (element, groupName, groups) =>
  new Sortable(element, {
    animation: 300,
    group: {
      name: groupName,
      pull: groups,
      put: groups,
    },
    // sort: false,
    delay: 90,
    forceFallback: true,
    ghostClass: "sortable-ghost",
    dragClass: "sortable-drag",
    onStart: () => {
      setDragCursor(true);
    },
    onEnd: ({ item, from, to, newIndex }) => {
      setDragCursor(false);

      let groups = JSON.parse(localStorage.getItem("groups"));
      let fromGroup = groups[from.id];
      let task = fromGroup.tasks.find(({ id }) => id === item.id);

      if (from.id !== to.id) {
        let toGroup = groups[to.id];

        let newFromGroup = {
          ...fromGroup,
          tasks: fromGroup.tasks.filter(({ id }) => id != item.id),
        };

        let newToGroup = {
          ...toGroup,
          tasks: [
            ...toGroup.tasks.slice(0, newIndex),
            task,
            ...toGroup.tasks.slice(newIndex),
          ],
        };

        groups[from.id] = newFromGroup;
        groups[to.id] = newToGroup;
      } else {
        let temporalTasks = fromGroup.tasks.filter(({ id }) => id != item.id);
        let newFromGroup = {
          ...fromGroup,
          tasks: [
            ...temporalTasks.slice(0, newIndex),
            task,
            ...temporalTasks.slice(newIndex),
          ],
        };

        groups[from.id] = newFromGroup;
      }
      localStorage.setItem("groups", JSON.stringify(groups));
    },
  });

const generateGroups = (groups) => {
  const content = Object.keys(groups).map((key) => {
    const { title: groupTitle, color_class, tasks } = groups[key];
    return `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <div class="${color_class} w-4 h-4 rounded"></div>
        <span class="font-bold">${groupTitle}</span>
        <i class="fa-solid fa-plus text-gray-400/95 hover-scale-item hover:-translate-y-0 cursor-not-allowed"></i>
      </div>
      <div id=${key} class="flex-1 space-y-5 w-60 overflow-x-hidden overflow-y-auto pr-1.5">
        ${
          tasks
            ? tasks
                .map(
                  ({
                    id,
                    title: taskTitle,
                    description,
                    date,
                    img_url,
                    participants,
                  }) => `
                <!-- Card -->
                      <div id=${id} class="card">
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
                            <span class="font-bold block">${taskTitle}</span>
                            <span class="text-xs line-clamp-3 text-gray-400/95">
                            ${description}
                            </span>
                          </div>
                          <i id="${id}-opt" class="fa-solid fa-ellipsis-vertical h-fit text-gray-400/95 text-xl px-1.5 hover-scale-item hover:-translate-y-0">
                          </i>
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
                `
                )
                .join("")
            : ""
        }
        </div>
    </div>
    `;
  });

  boardContent.innerHTML = content.join("");

  Object.keys(groups).forEach((key) => {
    createSortable(
      document.getElementById(key),
      key,
      Object.keys(groups).filter((item) => item !== key)
    );

    const { tasks } = groups[key];
    tasks.forEach(({ id }) => {
      tippy(`#${id}-opt`, {
        content: `<div class="space-y-2 text-[0.85rem]">
                    <span class="block cursor-not-allowed">Editar</span>
                    <span id="${id}-delete" class="block text-red-500 font-semibold"'>Eliminar</span>
                  </div>`,
        interactive: true,
        arrow: true,
        placement: "bottom",
        animation: "scale",
        trigger: "click",
        theme: "my-theme",
        allowHTML: true,
        onCreate(instance) {
          instance.popper.querySelector(`#${id}-delete`).onclick = () => {
            eliminar(id);
          };
        },
      });
    });
  });
};

search.addEventListener("keyup", (e) => {
  buscar(e.target.value);
});

const verifyData = () => {
  let groups = JSON.parse(localStorage.getItem("groups"));
  if (groups === null) {
    localStorage.setItem("groups", JSON.stringify(defaultGroups));
    generateGroups(defaultGroups);
  } else {
    generateGroups(groups);
  }
};

verifyData();
