import Konva from 'konva';
import MainMenuView from './mainMenuView';
import Question from './question';
import QuestionView from './questionView';
import GameModel from './model';

const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

//const mainMenuView = new MainMenuView(stage.width(), stage.height(), );

//layer.add(instructionView.getPage());

//layer.add(mainMenuView.getPage());
const model = new GameModel('Nicky');
const sampleQuestion = new Question(3, 'Souvenir Shop', 'You set aside $80 for souvenirs. You want to spend 25% of that on a gift. What is the most you can spend?', 20);
const questionView = new QuestionView(stage.width(), stage.height(), model, sampleQuestion, 90);

layer.add(questionView.getPage());