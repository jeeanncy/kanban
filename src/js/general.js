import Sortable from "sortablejs";
import { DateTime } from "luxon";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import defaultBoard from "./default-data";
import Task from "./models/Task";

const boardSelection = document.getElementById("board-selection");
const boardMenbers = document.getElementById("board-menbers");
const boardContent = document.getElementById("board-content");
const search = document.getElementById("search");
const logo = document.getElementById("logo");
const overlay = document.getElementById("overlay");
const modalForm = document.getElementById("modal-form");
const modalTitle = document.getElementById("modal-title");

const setLocalBoard = (board) => {
  localStorage.setItem("board", JSON.stringify(board));
};

const getLocalBoard = () => JSON.parse(localStorage.getItem("board"));

const loadBoardHeader = (title, menbers) => {
  boardSelection.textContent = title;

  let headerMenbers = menbers.slice(0, 3).map(
    ({ imgUrl }) => `
    <img class="w-11 h-11 object-cover border-2 border-[#EEF2F5] dark:border-[#191B2B] rounded-full hover-scale-item" src=${imgUrl} alt="user">
  `
  );

  headerMenbers = [
    ...headerMenbers,
    menbers.slice(3).length > 0
      ? `<div class="w-11 h-11 border-2 border-[#EEF2F5] dark:border-[#191B2B] bg-blue-900 flex items-center justify-center text-white rounded-full text-xs font-semibold hover-scale-item">
+${menbers.slice(3).length}
</div>`
      : "",
  ];

  boardMenbers.innerHTML = headerMenbers.join("");
};

const loadBoardContent = (groups) => {
  const content = groups.map(
    ({ id: groupId, title: groupTitle, className, tasks }) => `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <div class="${className} w-4 h-4 rounded"></div>
        <span class="font-bold">${groupTitle}</span>
        <i id="${groupId}-add" class="fa-solid fa-plus text-gray-400/95 hover-scale-item hover:-translate-y-0 cursor-pointer"></i>
      </div>
      <div id=${groupId} class="flex-1 space-y-5 w-60 overflow-x-hidden overflow-y-auto pr-1.5">
      ${
        tasks
          ? tasks
              .map(
                ({
                  id: taskId,
                  title: taskTitle,
                  details,
                  date,
                  imgUrl,
                  menbers,
                }) => `
              <!-- Card -->
                    <div id=${taskId} class="card">
                    <!-- Card img -->
                    ${
                      imgUrl
                        ? `
                        <!-- Card img -->
                        <img class="w-full h-24 object-cover rounded-2xl" src=${imgUrl} alt="">`
                        : ""
                    }
                      <!-- Content -->
                      <div class="flex gap-1.5">
                        <div class="flex-1 space-y-1.5">
                          <span class="font-bold block">${taskTitle}</span>
                          <span class="text-xs line-clamp-3 text-gray-400/95">
                          ${details}
                          </span>
                        </div>
                        <i id="opt-${taskId}" class="fa-solid fa-ellipsis-vertical h-fit text-gray-400/95 text-xl px-1.5 hover-scale-item hover:-translate-y-0">
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
                        ${menbers
                          .slice(0, 2)
                          .map(
                            ({ imgUrl: participantsImgUrl }) => `
                        <img class="w-6 h-6 object-cover border-2 border-white dark:border-[#282A43] rounded-full" src=${participantsImgUrl} alt="user">
                        `
                          )
                          .join("")}
                          ${
                            menbers.slice(2).length > 0
                              ? `
                          <div
                            class="w-5 h-5 bg-sky-100 dark:bg-purple-300 flex items-center justify-center rounded-full text-[7px] font-semibold text-black">
                            +${menbers.slice(2).length}
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
    `
  );

  boardContent.innerHTML = content.join("");
};

const setDragCursor = (value) => {
  const html = document.getElementsByTagName("html").item(0);
  html.classList.toggle("grabbing", value);
};

const createSortable = (element, groupName, groupsNames) =>
  new Sortable(element, {
    animation: 300,
    group: {
      name: groupName,
      pull: groupsNames,
      put: groupsNames,
    },
    delay: 90,
    forceFallback: true,
    ghostClass: "sortable-ghost",
    dragClass: "sortable-drag",
    onStart: () => {
      setDragCursor(true);
    },
    onEnd: ({ item, from, to, newIndex }) => {
      setDragCursor(false);
      const localBoard = getLocalBoard();
      const fromGroup = localBoard.groups.find(({ id }) => id === from.id);
      const task = fromGroup.tasks.find(({ id }) => id === item.id);
      const newBoard = { ...localBoard };

      if (from.id !== to.id) {
        const toGroup = localBoard.groups.find(({ id }) => id === to.id);

        const newFromGroup = {
          ...fromGroup,
          tasks: fromGroup.tasks.filter(({ id }) => id !== item.id),
        };

        const newToGroup = {
          ...toGroup,
          tasks: [
            ...toGroup.tasks.slice(0, newIndex),
            task,
            ...toGroup.tasks.slice(newIndex),
          ],
        };

        newBoard.groups[newBoard.groups.indexOf(fromGroup)] = newFromGroup;
        newBoard.groups[newBoard.groups.indexOf(toGroup)] = newToGroup;
      } else {
        const temporalTasks = fromGroup.tasks.filter(
          ({ id }) => id !== item.id
        );

        const newFromGroup = {
          ...fromGroup,
          tasks: [
            ...temporalTasks.slice(0, newIndex),
            task,
            ...temporalTasks.slice(newIndex),
          ],
        };

        newBoard.groups[newBoard.groups.indexOf(fromGroup)] = newFromGroup;
      }
      setLocalBoard(newBoard);
    },
  });

const buscar = (searchValue) => {
  const localBoard = getLocalBoard();
  searchValue.trim();
  if (searchValue !== "") {
    const filteredBoard = {
      ...localBoard,
      groups: localBoard.groups.map((group) => ({
        ...group,
        tasks: group.tasks.filter(({ title }) =>
          title.toLowerCase().includes(searchValue.toLowerCase())
        ),
      })),
    };

    // eslint-disable-next-line no-use-before-define
    loadBoard(filteredBoard);
  } else {
    // eslint-disable-next-line no-use-before-define
    loadBoard();
  }
};

const eliminar = (taskId) => {
  const localBoard = getLocalBoard();

  const filteredBoard = {
    ...localBoard,
    groups: localBoard.groups.map((group) => ({
      ...group,
      tasks: group.tasks.filter(({ id }) => id !== taskId),
    })),
  };

  setLocalBoard(filteredBoard);
  if (search.value !== "") buscar(search.value);
  // eslint-disable-next-line no-use-before-define
  else loadBoard();
};

const setFormOnSubmit = (callback) => {
  modalForm.onsubmit = (e) => {
    e.preventDefault();
    const {
      title: titleInput,
      date: dateInput,
      details: detailsInput,
    } = modalForm.elements;

    callback(titleInput.value, dateInput.value, detailsInput.value);

    overlay.classList.add("opacity-0");
    overlay.classList.add("invisible");

    titleInput.value = "";
    dateInput.value = "";
    detailsInput.value = "";
  };
};

const editar = (groupId, { id: taskId, title, date, details }) => {
  const localBoard = getLocalBoard();
  const fromGroup = localBoard.groups.find(({ id }) => id === groupId);

  const targetTask = fromGroup.tasks.find(({ id }) => id === taskId);
  const newTask = { ...targetTask, title, date, details };

  const newFromGroup = {
    ...fromGroup,
    tasks: [
      ...fromGroup.tasks.slice(0, fromGroup.tasks.indexOf(targetTask)),
      newTask,
      ...fromGroup.tasks.slice(fromGroup.tasks.indexOf(targetTask) + 1),
    ],
  };

  const newBoard = { ...localBoard };
  newBoard.groups[newBoard.groups.indexOf(fromGroup)] = newFromGroup;

  setLocalBoard(newBoard);
  if (search.value !== "") buscar(search.value);
  // eslint-disable-next-line no-use-before-define
  else loadBoard();
};

const setSortablesAndOptions = (groups) => {
  groups.forEach(({ id: groupId, tasks }) => {
    createSortable(
      document.getElementById(groupId),
      groupId,
      groups.map(({ id }) => id).filter((item) => item !== groupId)
    );

    tasks.forEach(({ id, title, date, details }) => {
      tippy(`#opt-${id}`, {
        content: `<div class="space-y-2 text-[0.85rem]">
                    <span id="opt-edit-${id}" class="block">Editar</span>
                    <span id="opt-delete-${id}" class="block text-red-500 font-semibold"'>Eliminar</span>
                  </div>`,
        interactive: true,
        arrow: true,
        placement: "bottom",
        animation: "scale",
        trigger: "click",
        theme: "my-theme",
        allowHTML: true,
        onCreate(instance) {
          instance.popper
            .querySelector(`#opt-edit-${id}`)
            .addEventListener("click", () => {
              instance.hide();
              modalTitle.textContent = "Editar tarea";
              const {
                title: titleInput,
                date: dateInput,
                details: detailsInput,
              } = modalForm.elements;
              titleInput.value = title;
              dateInput.value = DateTime.fromISO(date).toFormat("yyyy-LL-dd");
              detailsInput.value = details;
              setFormOnSubmit((titleForm, dateForm, detailsForm) => {
                editar(groupId, {
                  id,
                  title: titleForm,
                  date: dateForm,
                  details: detailsForm,
                });
              });

              overlay.classList.remove("opacity-0");
              overlay.classList.remove("invisible");
            });

          instance.popper
            .querySelector(`#opt-delete-${id}`)
            .addEventListener("click", () => {
              eliminar(id);
            });
        },
      });
    });
  });
};

const agregar = (groupId, { title, date, details }) => {
  const localBoard = getLocalBoard();

  const totalTasks = localBoard.groups
    .map(({ tasks }) => tasks.length)
    .reduce((a, b) => a + b, 0);

  const fromGroup = localBoard.groups.find(({ id }) => id === groupId);

  const newTask = new Task(
    `task${totalTasks + 1}`,
    title,
    details,
    DateTime.fromISO(date),
    []
  );

  const newFromGroup = {
    ...fromGroup,
    tasks: [newTask, ...fromGroup.tasks],
  };

  const newBoard = { ...localBoard };
  newBoard.groups[newBoard.groups.indexOf(fromGroup)] = newFromGroup;

  setLocalBoard(newBoard);
  if (search.value !== "") buscar(search.value);
  // eslint-disable-next-line no-use-before-define
  else loadBoard();
};

const setAddButtons = (groups) => {
  groups.forEach(({ id: groupId }) => {
    const addButton = document.getElementById(`${groupId}-add`);

    addButton.addEventListener("click", () => {
      modalTitle.textContent = "Agregar tarea";
      const {
        title: titleInput,
        date: dateInput,
        details: detailsInput,
      } = modalForm.elements;

      titleInput.value = "";
      dateInput.value = "";
      detailsInput.value = "";

      setFormOnSubmit((titleForm, dateForm, detailsForm) => {
        agregar(groupId, {
          title: titleForm,
          date: dateForm,
          details: detailsForm,
        });
      });

      overlay.classList.remove("opacity-0");
      overlay.classList.remove("invisible");
    });
  });
};

const loadBoard = ({ title, menbers, groups } = getLocalBoard()) => {
  loadBoardHeader(title, menbers);
  loadBoardContent(groups);
  setSortablesAndOptions(groups);
  setAddButtons(groups);
};

const resetear = () => {
  setLocalBoard(defaultBoard);
  loadBoard();
};

search.addEventListener("keyup", (e) => {
  buscar(e.target.value);
});

logo.addEventListener("click", () => {
  resetear();
});

window.onclick = (event) => {
  if (event.target === overlay) {
    overlay.classList.add("opacity-0");
    overlay.classList.add("invisible");
  }
};

tippy(logo, {
  content: "Resetear",
  placement: "bottom",
  theme: "my-theme",
});

const verifyData = () => {
  if (getLocalBoard() === null) {
    setLocalBoard(defaultBoard);
    loadBoard();
  } else {
    loadBoard();
  }
};

verifyData();
