
class PausePosition {
    draw(play) {
        const w = play.width; const h = play.height;
        context.clearRect(0, 0, w, h);
        context.textAlign = 'center';

        context.fillStyle = "aliceblue";
        context.font = "40px Comic Sans MS";
        context.fillText("GAME PAUSED", w/2, ((h/2)-150));

        context.fillStyle = "#D7DF01";
        context.font = "35px Comic Sans MS";
        context.fillText("P: resume game", w/2, ((h/2)-100));
        context.fillText("Q: quit game", w/2, ((h/2)-50));

        context.fillStyle = "purple";
        context.fillText("Game Controls Reminder", (w/2), ((h/2)+100));
        context.fillText("move left: <=", (w/2), ((h/2)+150));
        context.fillText("move right: =>", (w/2), ((h/2)+200));
        context.fillText("fire: hit SPACE", (w/2), ((h/2)+250));
    }
    keyDown(play, keyboardCode) {
        if (keyboardCode===80) play.positionContainer.pop();
        if (keyboardCode===81) play.positionContainer.push(new GameOverPosition()); 
    }
}