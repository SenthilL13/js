export default class Alert {
  constructor(alertId) {
    this.alert = document.getElementById(alertId);
    this.success = document.getElementById(alertId);
  }

  show(message) {
    this.alert.classList.remove("d-none");
    this.alert.innerText = message;

    this.success.classList.remove("d-none");
    this.success.innerText = message;
  }

  hide() {
    this.alert.classList.add("d-none");
    this.success.classList.add("d-none");
  }
}
