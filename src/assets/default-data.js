import { DateTime } from "luxon";

const groups = [
  {
    name: "to-do",
    title: "Por hacer",
    color: "#FF2373",
    tasks: [
      {
        title: "Hacer un nuevo post",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        img_url: "./src/img/bg3.jpg",
        participants: [
          {
            id: 4,
            name: "Carla",
            img_url: "./src/img/user4.png",
          },
          {
            id: 3,
            name: "Tony",
            img_url: "./src/img/user3.png",
          },
          {
            id: 2,
            name: "Diana",
            img_url: "./src/img/user2.png",
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
            img_url: "./src/img/user2.png",
          },
          {
            id: 1,
            name: "Uriel",
            img_url: "./src/img/user1.png",
          },
        ],
      },
    ],
  },
  {
    name: "doing",
    title: "En proceso",
    color: "#FFA943",
    tasks: [
      {
        title: "Verificar materiales de diseño",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ month: 1 }).toJSON(),
        img_url: "./src/img/bg2.jpg",
        participants: [
          {
            id: 1,
            name: "Uriel",
            img_url: "./src/img/user1.png",
          },
          {
            id: 4,
            name: "Carla",
            img_url: "./src/img/user4.png",
          },
          {
            id: 2,
            name: "Diana",
            img_url: "./src/img/user2.png",
          },
        ],
      },
    ],
  },
  {
    name: "under-review",
    title: "Bajo revisión",
    color: "#1CAEFF",
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
            img_url: "./src/img/user3.png",
          },
          {
            id: 2,
            name: "Diana",
            img_url: "./src/img/user2.png",
          },
          {
            id: 1,
            name: "Uriel",
            img_url: "./src/img/user1.png",
          },
          {
            id: 4,
            name: "Carla",
            img_url: "./src/img/user4.png",
          },
        ],
      },
      {
        title: "Plan de contenido",
        description:
          "Lorem ipsum dolor, sit amet consectetur elit. Quibusdam soluta quidem fugit aspernatur, tempora veniam molestias quas optio perspiciatis neque eius adipisci rem. Aliquam suscipit illum, eos ex ipsam quaerat.",
        date: DateTime.now().plus({ days: 2 }).toJSON(),
        img_url: "./src/img/bg1.jpeg",
        participants: [
          {
            id: 4,
            name: "Carla",
            img_url: "./src/img/user4.png",
          },
          {
            id: 1,
            name: "Uriel",
            img_url: "./src/img/user1.png",
          },
        ],
      },
    ],
  },
  {
    name: "done",
    title: "Finalizado",
    color: "#40A736",
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
            img_url: "./src/img/user2.png",
          },
          {
            id: 1,
            name: "Uriel",
            img_url: "./src/img/user1.png",
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
            img_url: "./src/img/user3.png",
          },
          {
            id: 4,
            name: "Carla",
            img_url: "./src/img/user4.png",
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
            img_url: "./src/img/user1.png",
          },
          {
            id: 3,
            name: "Tony",
            img_url: "./src/img/user3.png",
          },
          {
            id: 2,
            name: "Diana",
            img_url: "./src/img/user2.png",
          },

          {
            id: 4,
            name: "Carla",
            img_url: "./src/img/user4.png",
          },
        ],
      },
    ],
  },
];

export default groups;
