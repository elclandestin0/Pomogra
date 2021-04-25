const AFRAME = window.AFRAME;

AFRAME.registerComponent("log-console", {
  schema: {
    message: { type: "string", default: "" },
  },
  init: function () {
    var data = this.data;
    var el = this.el;
    el.addEventListener("mouseenter", () => {
      console.log("hello" + data.message);
    });
  },
});

AFRAME.registerComponent("show-message", {
  schema: {
    show: { type: "boolean", default: "false" },
  },
  init: function () {
    var data = this.data;
    var el = this.el;
    el.addEventListener("mouseenter", () => {
      data.show = true;
      console.log(data.show);
    });
    el.addEventListener("mouseleave", () => {
      data.show = false;
      console.log(data.show);
    });
  },
});

AFRAME.registerComponent("go-to-form", {
  schema: {
    link: { type: "string", default: "/" },
  },
  init: function () {
    var data = this.data;
    var el = this.el;
    el.addEventListener("mouseenter", () => {
      console.log(data.link);
    });
  },
});