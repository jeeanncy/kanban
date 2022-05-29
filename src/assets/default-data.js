import { DateTime } from "luxon";

import bg1 from "../img/bg1.jpeg";
import bg2 from "../img/bg2.jpg";
import bg3 from "../img/bg3.jpg";
import user1 from "../img/user1.png";
import user2 from "../img/user2.png";
import user3 from "../img/user3.png";
import user4 from "../img/user4.png";

const groups = [
  {
    name: "to-do",
    title: "Por hacer",
    color_class: "bg-[#FF2373]",
    tasks: [
      {
        title: "Hacer un nuevo post",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        img_url: bg3,
        participants: [
          {
            id: 4,
            name: "Carla",
            img_url: user4,
          },
          {
            id: 3,
            name: "Tony",
            img_url: user3,
          },
          {
            id: 2,
            name: "Diana",
            img_url: user2,
          },
        ],
      },
      {
        title: "Hacer el prototipado de la página",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ month: 1 }).toJSON(),
        participants: [
          {
            id: 2,
            name: "Diana",
            img_url: user2,
          },
          {
            id: 1,
            name: "Uriel",
            img_url: user1,
          },
        ],
      },
    ],
  },
  {
    name: "doing",
    title: "En proceso",
    color_class: "bg-[#FFA943]",
    tasks: [
      {
        title: "Verificar materiales de diseño",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ month: 1 }).toJSON(),
        img_url: bg2,
        participants: [
          {
            id: 1,
            name: "Uriel",
            img_url: user1,
          },
          {
            id: 4,
            name: "Carla",
            img_url: user4,
          },
          {
            id: 2,
            name: "Diana",
            img_url: user2,
          },
        ],
      },
    ],
  },
  {
    name: "under-review",
    title: "Bajo revisión",
    color_class: "bg-[#1CAEFF]",
    tasks: [
      {
        title: "Discutir presupuesto anual",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        participants: [
          {
            id: 3,
            name: "Tony",
            img_url: user3,
          },
          {
            id: 2,
            name: "Diana",
            img_url: user2,
          },
          {
            id: 1,
            name: "Uriel",
            img_url: user1,
          },
          {
            id: 4,
            name: "Carla",
            img_url: user4,
          },
        ],
      },
      {
        title: "Plan de contenido",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        img_url: bg1,
        participants: [
          {
            id: 4,
            name: "Carla",
            img_url: user4,
          },
          {
            id: 1,
            name: "Uriel",
            img_url: user1,
          },
        ],
      },
    ],
  },
  {
    name: "done",
    title: "Finalizado",
    color_class: "bg-[#40A736]",
    tasks: [
      {
        title: "Programar reunión semanal",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        participants: [
          {
            id: 2,
            name: "Diana",
            img_url: user2,
          },
          {
            id: 1,
            name: "Uriel",
            img_url: user1,
          },
        ],
      },
      {
        title: "Discutir un nuevo concepto",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        participants: [
          {
            id: 3,
            name: "Tony",
            img_url: user3,
          },
          {
            id: 4,
            name: "Carla",
            img_url: user4,
          },
        ],
      },
      {
        title: "Programar reunión semanal",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        participants: [
          {
            id: 1,
            name: "Uriel",
            img_url: user1,
          },
          {
            id: 3,
            name: "Tony",
            img_url: user3,
          },
          {
            id: 2,
            name: "Diana",
            img_url: user2,
          },
          {
            id: 4,
            name: "Carla",
            img_url: user4,
          },
        ],
      },
    ],
  },
];

console.log(groups);

export default groups;
