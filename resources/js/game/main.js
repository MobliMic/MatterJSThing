/**
 * Created by Michael on 23/05/14.
 */

var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;
var Composites = Matter.Composites;
var MouseConstraint = Matter.MouseConstraint;
var Events = Matter.Events;

// global variables
var engine;
var scene;

var MatterDemo = {};

MatterDemo.init = function () {

    var container = document.getElementById('main');

    var options = [];

    engine = Engine.create(container, options);

    var borders = [
        Bodies.rectangle(395, 600, 815, 50, {isStatic: true}),
        Bodies.rectangle(395, 0, 815, 50, {isStatic: true}),
        Bodies.rectangle(800, 300, 50, 815, {isStatic: true}),
        Bodies.rectangle(0, 300, 50, 815, {isStatic: true})
    ];

    var mouse = MouseConstraint.create(engine, {
        constraint: {stiffness: 1}
    });

    World.add(engine.world, [mouse, borders]);

    Engine.run(engine);

    scene = 'main';

    MatterDemo[scene]();
};

MatterDemo.main = function () {

    var rock = Bodies.polygon(170, 450, 8, 20);

    var anchor = {x: 170, y: 450};
    var elastic = Constraint.create({pointA: anchor, bodyB: rock, stiffness: 0.1});

    var pyramid = Composites.pyramid(450, 100, 30, 15, 0, 0,
        function (x, y, column, row) {
            return Bodies.rectangle(x, y, 10, 10);
        });

    //var obstacle = Bodies.rectangle(500, 400, 15, 350, {isStatic: true});
    var obstacle = Bodies.rectangle(600, 400, 350, 15, {isStatic: true});

    var stack = Composites.stack(550, 400, 1, 5, 0, 0,
        function (x, y) {
            return Bodies.rectangle(x, y, 25, 25);
        });

    Events.on(engine, 'tick', function (event) {
        if (engine.input.mouse.button === -1 && rock.position.x > 190) {
            rock = Bodies.polygon(170, 450, 7, 20);
            World.add(engine.world, rock);
            elastic.bodyB = rock;
        }
    });

    World.add(engine.world, [obstacle, pyramid, stack, rock, elastic]);


};

window.addEventListener('load', MatterDemo.init);

$(document).ready(function () {
    $('#main').on("mousemove", function (event) {
        $("#sand").text("pageX: " + event.pageX + ", pageY: " + event.pageY);
    });
});
