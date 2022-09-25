
class GameObjects {
    spaceship(x, y, spaceship_img) {
        this.x = x;
        this.y = y;
        this.width = 34;
        this.height = 28;
        this.spaceship_img = spaceship_img;
        this.spaceship_img.src = 'img/spaceship.png';
        return this;
    }
    bullet(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    ufo(x, y, line, column, ufo_img) {
        this.x = x;
        this.y = y;
        this.line = line;
        this.column = column;
        this.width = 32;
        this.height = 24;
        this.ufo_img = ufo_img;
        this.ufo_img.src = "img/ufo.png";
        return this;
    }
    bomb(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
}