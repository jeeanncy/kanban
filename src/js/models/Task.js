export default class Task {
  constructor(id, title, description, date, menbers, imgUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date.toJSON();
    this.menbers = menbers;
    this.imgUrl = imgUrl;
  }
}
