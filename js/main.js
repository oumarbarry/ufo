
const canvas = document.getElementById('ufoCanvas');
const context = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 750;
window.addEventListener('resize', () => {
    const ratio = canvas.width/canvas.height;
    const height = window.innerHeight - 20;
    const width = height*ratio;
    canvas.style.width = width+'px';
    canvas.style.height = height+'px';
}, false);

class GameBasics {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.playBoundaries = {left: 80, right: 820, top: 150, bottom: 650};
        this.settings = {
            updateSeconds: (1/60), spaceshipSpeed: 200, 
            bulletSpeed: 130, bulletMaxFreq: 500,
            ufoLines: 4, ufoColumns: 8, ufoSpeed: 35, ufoSinking: 30,
            bombSpeed: 75, bombFreq: 0.05,
            pointPerHittedUfo: 3
        };
        this.positionContainer = [];
        this.level = 1;
        this.score = 0;
        this.life = 3;
        this.pressedKeys = {};
    }
    presentPosition() {
        const posC = this.positionContainer;
        return posC.length>0 ? posC[posC.length-1] : null;
    }
    goToPosition(position) {
        if(this.presentPosition()) this.positionContainer.length=0;
        if(position.entry) position.entry(play);
        this.positionContainer.push(position);
    }
    start() {
        setInterval(() => {
            gameLoop(play);
        }, this.settings.updateSeconds*1000);
        this.goToPosition(new OpeningPosition());
    }
    keyDown(keyboardCode) {
        this.pressedKeys[keyboardCode] = true;
        if (this.presentPosition() && this.presentPosition().keyDown) {
            this.presentPosition().keyDown(this, keyboardCode);
        }
    }
    keyUp(keyboardCode) { delete this.pressedKeys[keyboardCode]; }
}
function gameLoop(play) {
    let presentPosition = play.presentPosition();
    if (presentPosition) {
        if(presentPosition.update) {presentPosition.update(play);}
        if(presentPosition.draw) {presentPosition.draw(play);}
    }
}
window.addEventListener('keydown', e => {
    const key = e.key==' ' ? 32: 
        e.key=="ArrowLeft" ? 37: 
            e.key=="ArrowRight" ? 39: 
                e.key=='m' ? 77: 
                    e.key=='p' ? 80:
                        e.key=='q' ? 81:
                            e.key=='Enter'? 13: null;
    if (key==32||key==37||key==39||key==13) e.preventDefault();
    play.keyDown(key);
});
window.addEventListener('keyup', e => {
    const key = e.key==' ' ? 32: 
        e.key=="ArrowLeft" ? 37: 
            e.key=="ArrowRight" ? 39: 
                e.key=='m' ? 77: 
                    e.key=='p' ? 80:
                        e.key=='q' ? 81:
                            e.key=='Enter'? 13: null;
    play.keyUp(key);
});

let play = new GameBasics(canvas);
play.sounds = new Sounds();
play.start();