import Alert from "./alert.js";

export default class AddTodo {
  constructor() {
    this.btn = document.getElementById("add");
    this.title = document.getElementById("title");
    this.description = document.getElementById("description");

    this.alert = new Alert("alert");
    this.success = new Alert("success");
  }

  onClick(callback) {
    this.btn.onclick = () => {
      if (title.value === "" || description.value === "") {
        this.alert.show("title and description are required");
        this.success.hide();
      } else {
        this.alert.hide();
        callback(this.title.value, this.description.value);
        this.success.show("Task add");
        setTimeout(() => {
          this.success.hide();
        }, 2000);
      }
    };
  }
}
