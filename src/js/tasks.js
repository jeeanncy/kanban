import Sortable from "sortablejs";
import { DateTime } from "luxon";
import defaultGroups from "../assets/default-data";

const boardContent = document.getElementById("board-content");
const search = document.getElementById("search");

const setDragCursor = (value) => {
  const html = document.getElementsByTagName("html").item(0);
  html.classList.toggle("grabbing", value);
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
    delayOnTouchOnly: true,
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

const verifyData = () => {
  let groups = JSON.parse(localStorage.getItem("groups"));
  if (groups === null) {
    localStorage.setItem("groups", JSON.stringify(defaultGroups));
    generateGroups(defaultGroups);
  } else {
    generateGroups(groups);
  }
};

const generateGroups = (groups) => {
  boardContent.innerHTML = "";

  Object.keys(groups).forEach((key) => {
    const { title, color_class, tasks } = groups[key];
    const group = document.createElement("div");
    group.className = "flex flex-col gap-4";

    group.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="${color_class} w-4 h-4 rounded"></div>
      <span class="font-bold">${title}</span>
      <i class="fa-solid fa-plus text-gray-400/95 hover-scale-item"></i>
    </div>
    `;

    const groupTasks = document.createElement("div");
    groupTasks.setAttribute("id", key);
    groupTasks.className =
      "flex-1 space-y-5 w-60 overflow-x-hidden overflow-y-auto pr-1.5";

    if (tasks !== null) {
      tasks.forEach(
        ({ id, title, description, date, img_url, participants }) => {
          groupTasks.innerHTML += `
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
        }
      );
    }

    createSortable(
      groupTasks,
      key,
      Object.keys(groups).filter((item) => item !== key)
    );

    group.appendChild(groupTasks);

    boardContent.appendChild(group);
  });
};

verifyData();

search.addEventListener("keyup", (e) => {
  let groups = JSON.parse(localStorage.getItem("groups"));

  const searchValue = e.target.value.trim();
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
});
