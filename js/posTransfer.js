
class TransferPosition {
    constructor(level) {
        this.level = level;
        this.fontSize = 95;
        this.color = 0;
    }
    update(play) {
        this.fontSize--;
        this.color++;
        if(this.fontSize<1) play.goToPosition( new InGamePosition(play.settings, this.level) );
    }
    draw(play) {
        const w = play.width; const h = play.height;
        context.clearRect(0, 0, w, h);
        context.font = `${this.fontSize}px Comic Sans MS`;
        context.textAlign = "center";
        context.fillStyle = `rgba(255, ${this.color}, ${this.color}, 1)`;
        context.fillText(`GET READY FOR LEVEL ${this.level}`, (w/2), (h/2)); 
    }
}