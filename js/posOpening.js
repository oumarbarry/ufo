
class OpeningPosition {
    draw(play) {
        const w = play.width; const h = play.height;

        context.clearRect(0, 0, w, h);
        context.textAlign = "center";

        const gradient = context.createLinearGradient(((w/2)-180), (h/2), ((w/2)+180), (h/2));
        gradient.addColorStop(0.0, 'red');
        gradient.addColorStop(0.5, 'yellow');
        gradient.addColorStop(1.0, 'green');
        context.fillStyle = gradient;
        context.font = "80px Comic Sans MS";
        context.fillText("UFOHUNTER", (w/2), ((h/2)-80));

        context.fillStyle = "#D7DF01";
        context.font = "35px Comic Sans MS";
        context.fillText("Press 'ENTER' to start.", (w/2), (h/2));

        context.fillStyle = "#2E2EF0";
        context.fillText("Game Controls", (w/2), ((h/2)+210));
        context.fillText("move left: <=", (w/2), ((h/2)+260));
        context.fillText("move right: =>", (w/2), ((h/2)+300));
        context.fillText("fire: hit SPACE", (w/2), ((h/2)+340));
    }
    //https://keycode.info
    keyDown(play, keyboardCode) {
        if (keyboardCode===13) {
            play.level = 1;
            play.score = 0;
            play.life = 3;
            play.goToPosition( new TransferPosition(play.level) );
        }
    }
}