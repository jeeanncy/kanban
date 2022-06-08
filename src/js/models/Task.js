export default class Task {
  constructor(id, title, details, date, menbers, imgUrl) {
    this.id = id;
    this.title = title;
    this.details = details;
    this.date = date.toJSON();
    this.menbers = menbers;
    this.imgUrl = imgUrl;
  }
}
