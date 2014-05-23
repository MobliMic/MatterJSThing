/**
 * Created by Michael on 23/05/14.
 */

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events;

function init() {

    var engine = Engine.create(document.body);
    var mouse = MouseConstraint.create(engine, {
        constraint: { stiffness: 1 }
    });

    var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true });
    var rock = Bodies.polygon(170, 450, 8, 20);

    var anchor = { x: 170, y: 450};
    var elastic = Constraint.create({ pointA: anchor, bodyB: rock, stiffness: 0.1 });

    var pyramid = Composites.pyramid(450, 300, 13, 10, 0, 0,
        function (x, y, column, row) {
            return Bodies.rectangle(x, y, 25, 40);
        });

    World.add(engine.world, [mouse, ground, pyramid, rock, elastic]);

    Events.on(engine, 'tick', function (event) {
        if (engine.input.mouse.button === -1 && rock.position.x > 190) {
            rock = Bodies.polygon(170, 450, 7, 20);
            World.add(engine.world, rock);
            elastic.bodyB = rock;
        }
    });

    Engine.run(engine);

}

window.addEventListener('load', init);


