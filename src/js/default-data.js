import { DateTime } from "luxon";
import Menber from "../js/models/Menber";
import Task from "../js/models/Task";
import Group from "../js/models/Group";
import Board from "../js/models/Board";

import bg1 from "../img/bg1.jpeg";
import bg2 from "../img/bg2.jpg";
import bg3 from "../img/bg3.jpg";
import user1Img from "../img/user1.png";
import user2Img from "../img/user2.png";
import user3Img from "../img/user3.png";
import user4Img from "../img/user4.png";

// Crear mienbros
const menber1 = new Menber(1, "Uriel", user1Img);
const menber2 = new Menber(2, "Daniela", user2Img);
const menber3 = new Menber(3, "Tony", user3Img);
const menber4 = new Menber(4, "Carla", user4Img);
const menbers = [menber1, menber2, menber3, menber4];

const task1 = new Task(
  "task1",
  "Hacer un nuevo post",
  "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
  DateTime.now().plus({ days: 2 }),
  menbers.filter(({ id }) => [1, 2, 4].includes(id)),
  bg3
);
const task2 = new Task(
  "task2",
  "Hacer el prototipado de la página",
  "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
  DateTime.now().plus({ month: 1 }),
  menbers.filter(({ id }) => [1, 3].includes(id))
);
const group1 = new Group("to-do", "Por hacer", "#FF2373", [task1, task2]);

const task3 = new Task(
  "task3",
  "Verificar materiales de diseño",
  "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
  DateTime.now().plus({ days: 2 }),
  menbers.filter(({ id }) => [2, 3, 4].includes(id)),
  bg2
);
const group2 = new Group("doing", "En proceso", "#FFA943", [task3]);

const task4 = new Task(
  "task4",
  "Discutir presupuesto anual",
  "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
  DateTime.now().plus({ days: 2 }),
  menbers
);
const task5 = new Task(
  "task5",
  "Plan de contenido",
  "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
  DateTime.now().minus({ days: 7 }),
  menbers.filter(({ id }) => [1, 4].includes(id)),
  bg1
);
const group3 = new Group("under_review", "Bajo revisión", "#1CAEFF", [
  task4,
  task5,
]);

const task6 = new Task(
  "task6",
  "Programar reunión semanal",
  "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
  DateTime.now().minus({ days: 2 }),
  menbers.filter(({ id }) => [1, 2].includes(id))
);
const task7 = new Task(
  "task7",
  "Discutir un nuevo concepto",
  "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
  DateTime.now().minus({ week: 1 }),
  menbers.filter(({ id }) => [3, 4].includes(id))
);
const task8 = new Task(
  "task8",
  "Discutir presupuesto mensual",
  "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
  DateTime.now().minus({ month: 1 }),
  menbers
);
const group4 = new Group("done", "Finalizado", "#40A736", [
  task6,
  task7,
  task8,
]);

const board = new Board("board1", "Michilala Store", menbers, [
  group1,
  group2,
  group3,
  group4,
]);

export default board;
