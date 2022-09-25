
class KingPosition {
    constructor(level) { this.level = level; }
    draw(play) {
        const w = play.width; const h = play.height; 
        let msg = '';
        
        context.clearRect(0, 0, w, h);
        context.textAlign = 'center';

        context.fillStyle = "purple";
        context.font = "40px Comic Sans MS";
        this.level > 10 ? msg="🎈✨🎉🎊[KING/🦁🐲🐳🤴👨‍🚀/QUEENY]🎊🎉✨🎈" : msg="WONDERRRRFULLLL";
        context.fillText(msg, w/2, ((h/2)-120));

        context.fillStyle = "aliceblue";
        context.font = "35px Comic Sans MS";
        context.fillText(`let's go to level ${play.level} <-----> actual score: ${play.score}`, w/2, ((h/2)-50));
        context.fillText("press 'ENTER' to continue", w/2, ((h/2)+20));
    }
    keyDown(play, keyboardCode) {
        if (keyboardCode===13) play.goToPosition(new TransferPosition(this.level));
    }
}