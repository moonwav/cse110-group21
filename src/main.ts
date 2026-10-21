import Konva from "konva";

const stage = new Konva.Stage({
  container: "game",
  width: 800,
  height: 500,
});

const layer = new Konva.Layer();
layer.add(
  new Konva.Text({
    x: 40,
    y: 40,
    text: "Percentage Trip Game setup",
    fontSize: 28,
  })
);
stage.add(layer);