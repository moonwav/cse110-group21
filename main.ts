import Konva from 'konva';
import { loadFont } from './fonts';
import MainMenuView from './mainMenuView';

const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const mainMenuView = new MainMenuView(stage.width(), stage.height());

layer.add(mainMenuView.getPage());
layer.draw();