
class GameOverPosition {
    draw(play) {
        const w = play.width; const h = play.height;
        context.clearRect(0, 0, w, h);
        context.textAlign = 'center';

        context.fillStyle = "#ff0000";
        context.font = "40px Comic Sans MS";
        context.fillText("GAME OVER !", w/2, ((h/2)-120));

        context.fillStyle = "aliceblue";
        context.font = "35px Comic Sans MS";
        context.fillText(`Level: ${play.level} <<------->> Score: ${play.score}`, w/2, ((h/2)-50));
        context.fillText("press 'ENTER' to continue", w/2, ((h/2)+20));
    }
    keyDown(play, keyboardCode) {
        if (keyboardCode===13) play.goToPosition(new OpeningPosition());
    }
}