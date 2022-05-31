import { DateTime } from "luxon";

import bg1 from "../img/bg1.jpeg";
import bg2 from "../img/bg2.jpg";
import bg3 from "../img/bg3.jpg";
import user1 from "../img/user1.png";
import user2 from "../img/user2.png";
import user3 from "../img/user3.png";
import user4 from "../img/user4.png";

const groups = {
  to_do: {
    title: "Por hacer",
    color_class: "bg-[#FF2373]",
    tasks: [
      {
        id: "task1",
        title: "Hacer un nuevo post",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        img_url: bg3,
        participants: [
          {
            id: "user4",
            name: "Carla",
            img_url: user4,
          },
          {
            id: "user3",
            name: "Tony",
            img_url: user3,
          },
          {
            id: "user2",
            name: "Diana",
            img_url: user2,
          },
        ],
      },
      {
        id: "task2",
        title: "Hacer el prototipado de la página",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ month: 1 }).toJSON(),
        participants: [
          {
            id: "user2",
            name: "Diana",
            img_url: user2,
          },
          {
            id: "user1",
            name: "Uriel",
            img_url: user1,
          },
        ],
      },
    ],
  },
  doing: {
    title: "En proceso",
    color_class: "bg-[#FFA943]",
    tasks: [
      {
        id: "task3",
        title: "Verificar materiales de diseño",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ month: 1 }).toJSON(),
        img_url: bg2,
        participants: [
          {
            id: "user1",
            name: "Uriel",
            img_url: user1,
          },
          {
            id: "user4",
            name: "Carla",
            img_url: user4,
          },
          {
            id: "user2",
            name: "Diana",
            img_url: user2,
          },
        ],
      },
    ],
  },
  under_review: {
    title: "Bajo revisión",
    color_class: "bg-[#1CAEFF]",
    tasks: [
      {
        id: "task4",
        title: "Discutir presupuesto anual",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        participants: [
          {
            id: "user3",
            name: "Tony",
            img_url: user3,
          },
          {
            id: "user2",
            name: "Diana",
            img_url: user2,
          },
          {
            id: "user1",
            name: "Uriel",
            img_url: user1,
          },
          {
            id: "user4",
            name: "Carla",
            img_url: user4,
          },
        ],
      },
      {
        id: "task5",
        title: "Plan de contenido",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        img_url: bg1,
        participants: [
          {
            id: "user4",
            name: "Carla",
            img_url: user4,
          },
          {
            id: "user1",
            name: "Uriel",
            img_url: user1,
          },
        ],
      },
    ],
  },
  done: {
    title: "Finalizado",
    color_class: "bg-[#40A736]",
    tasks: [
      {
        id: "task6",
        title: "Programar reunión semanal",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        participants: [
          {
            id: "user2",
            name: "Diana",
            img_url: user2,
          },
          {
            id: "user1",
            name: "Uriel",
            img_url: user1,
          },
        ],
      },
      {
        id: "task7",
        title: "Discutir un nuevo concepto",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        participants: [
          {
            id: "user3",
            name: "Tony",
            img_url: user3,
          },
          {
            id: "user4",
            name: "Carla",
            img_url: user4,
          },
        ],
      },
      {
        id: "task8",
        title: "Discutir presupuesto mensual",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        participants: [
          {
            id: "user1",
            name: "Uriel",
            img_url: user1,
          },
          {
            id: "user3",
            name: "Tony",
            img_url: user3,
          },
          {
            id: "user2",
            name: "Diana",
            img_url: user2,
          },
          {
            id: "user4",
            name: "Carla",
            img_url: user4,
          },
        ],
      },
    ],
  },
};

export default groups;
