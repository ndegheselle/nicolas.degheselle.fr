import { SVG } from "@svgdotjs/svg.js";

let canvas;
let background;
let texts = {
  main: null,
  top: null,
  bot: null,
};
let size = {x: 150, y: 100};

export function createBackground() {
  canvas = SVG().addTo(".svg-container");
  canvas.size("15rem", "10rem").viewbox(0, 0, size.x, size.y);

  console.log("createBackground", size);
  const rect = canvas.rect(size.x, size.y).fill("#000");
  texts.main = canvas.text("7").font({ size: size.y, fill: "#fff" }).move(0, 0);
  texts.top = canvas.text("1").font({ size: size.y / 4, fill: "#fff" }).move(size.x / 3, size.y / 3);
  texts.bot = canvas.text("1").font({ size: size.y / 4, fill: "#fff" }).move(size.x / 3, size.y / 1.8);

  const group = canvas.group();
  group.add(rect);
  group.add(texts.main);
  group.add(texts.top);
  group.add(texts.bot);

  let gradient = canvas.gradient("linear", function (add) {
    add.stop(0, "var(--color-bg-secondary)");
    add.stop(0.5, "var(--color-bg-secondary)");
    add.stop(0.5, "var(--color-primary-dim)");
    add.stop(1, "var(--color-primary)");
  });
  gradient.from(0, 0).to(0, 1);

  canvas.add(group);
  background = canvas.rect(size.x, size.y * 2).fill(gradient).move(0, -size.y/2);
  background.maskWith(group);
}

export function animate(percent) {
  background.animate().move(0, percent * 15 - 15);
}

export function updateText(main, top, bot) {
  texts.main.text(main);
  texts.top.text(top);
  texts.bot.text(bot);
}

createBackground();
updateText("2", "years", "10 months");