
let h = window.innerHeight;


kaboom({

    width: window.innerWidth,
    height: window.innerHeight,
    fullscreen: true,
    global: true,
    scale: 1,
    debug: true,
    gravity: 800,
  
});
// Set background color to blue
setBackground(Color.fromHex("#000000"));


const RADIUS = 12;
const SPEED_FACTOR = 50;
let kill = false;
let
gx = 0,
gy = 0,
ex = 100,
ey = 100;


loadSprite("background", "./Bg.png");
loadSprite("Box", "./Box.png");
loadSprite("enemy", "./Enemy.gif");
loadSprite("Box2", "./Box2.png");
loadSprite("Box3", "./Box3.png");
loadSprite("Boom", "./Boom.svg");

//setGravity(1000);



const ball = add([
    circle(RADIUS),
    pos(center()),
    color(78, 90, 220),
    outline(1),
    body({
        isStatic: false
    }),
    area(),
    "player",
]);

// Modified enemy creation with proper component initialization
function em() {
    const myLevel = addLevel(
        map[1],
        {
            tileWidth: 32,
            tileHeight: 32,
            tiles: {
                "=": () => [
                    sprite("Box"),
                    area(),
                    scale(.225),
                    body({
                        isStatic: true
                    }),
                    "box"
                ],

                "#": () => [
                    sprite("Box2"),
                    area(),
                    scale(.225),
                    body({
                        isStatic: true
                    }),
                    "box2"
                ],
                "&": () => [
                    sprite("Box3"),
                    area(),
                    scale(.225),
                    body({
                        isStatic: true
                    }),
                    "box3"
                ],
            }
        });
}

em();
onCollideUpdate("box", "player", (box) => {
    if (kill) {
        destroy(box);
    }
});

const boomButton = add([
    sprite("Boom"),
    pos(20, h - 100),
    scale(0.8),
    area(),
    fixed(),
    z(100),
    "boomButton" // Added tag
]);

onClick("boomButton", () => {
    alert("Boom button clicked!");
});

for (let i = 0; i <= 0; i++) {
    // Store the enemy reference when it's created
    enemy = add([
        circle(4),
        pos(ex, ey), // Initial position
        color(178, 170, 20),
        outline(1),
        body({
            isStatic: false
        }),
        area(),
        "Enemy",
    ]);
}


/*onClick(() => {

})*/


enemy.vel.x = 1.5;
enemy.vel.y = 1.5;
onCollide("Enemy", "box", (enemy, box) => {



    //   enemy.vel = vec2(-enemy.vel.x, -enemy.vel.y);



    enemy.vel.x = -enemy.vel.x;
    enemy.vel.y = -enemy.vel.y;




    console.log(enemy.vel)


});
/*
onCollide("Enemy", "box2", (enemy, box2) => {
    enemy.vel.x = -enemy.vel.x;
    enemy.vel.y = -enemy.vel.y;
    console.log(enemy.vel)


});

onCollide("Enemy", "box3", (enemy, box3) => {
    enemy.vel.x = -enemy.vel.x;
    enemy.vel.y = -enemy.vel.y;
    console.log(enemy.vel)


});*/
onUpdate(() => {
    const vx = (window.normalizedX || 0) * SPEED_FACTOR;
    const vy = (window.normalizedY || 0) * SPEED_FACTOR;



    ball.move(vx, vy);
    camPos(ball.pos);
    enemy.pos = enemy.pos.add(enemy.vel);




});