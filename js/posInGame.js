
class InGamePosition {
    constructor(settings, level) {
        this.settings = settings;
        this.level = level;
        this.spaceship = null;
        this.sp_img = new Image();
        this.bullets = [];
        this.lastFireTime = null;
        this.ufos = [];
        this.ufo_img = new Image();
        this.bombs = [];
    }
    shoot() {
        const s = this.spaceship; const { bulletMaxFreq } = this.settings; let l = this.lastFireTime;
        if(l===null || (((new Date()).getTime()-l)>bulletMaxFreq)) {
            this.bullets.push((new GameObjects()).bullet(s.x, (s.y-(s.height/2))));
            this.lastFireTime = (new Date()).getTime();
            play.sounds.playSound('bulletShot');
        }
    }
    entry(play) {
        const w = play.width; const h = play.playBoundaries.bottom; const t = play.playBoundaries.top;
        this.spaceship = (new GameObjects()).spaceship((w/2), h, this.sp_img);

        const {ufoLines:lines, ufoColumns:columns} = this.settings;
        for (let l=0; l<lines; l++) {
            for (let c=0; c<columns; c++) {
                let x = (w/2) + (c*50) - ((columns-1)*25);
                let y = (t+30) + (l*30);
                this.ufos.push((new GameObjects()).ufo(x, y, l, c, this.ufo_img));
            }
        }

        let presentLevel = ((this.level > 10) ? 10: this.level);
        this.ufoSpeed = this.settings.ufoSpeed+(presentLevel*7);
        this.ufoTurn = 1;
        this.horizontal = 1;
        this.vertical = 0;
        this.areSinking = false;
        this.ufoPresentSinking = 0;

        this.bombSpeed = this.settings.bombSpeed+(presentLevel*10);
        this.bombFreq = this.settings.bombFreq+(presentLevel*0.05);
    }
    update(play) {
        const s = this.spaceship;
        const params = this.settings;
        
        //FIRE, MOVE LEFT, MOVE RIGHT
        if (play.pressedKeys[32]) this.shoot();
        this.bullets.forEach((bullet, i) => {
            bullet.y -= params.updateSeconds*params.bulletSpeed;
            if (bullet.y<0) this.bullets.splice(i--, 1);
        });
        if (play.pressedKeys[37]) s.x -= params.updateSeconds*params.spaceshipSpeed;
        if (play.pressedKeys[39]) s.x += params.updateSeconds*params.spaceshipSpeed;
        if (s.x < 0) s.x = play.width;
        if (s.x > play.width) s.x = 0;

        /* this.ufos.forEach(u => {
            u.x += (this.ufoSpeed * params.updateSeconds * this.ufoTurn);
            if (u.x < 0) u.x = play.width;
            if (u.x > play.width) u.x = 0;
        }); */
        let sideReached = false;
        this.ufos.forEach(u => {
            const { left, right } = play.playBoundaries;
            let freshx = u.x + (this.ufoSpeed * params.updateSeconds * this.ufoTurn * this.horizontal);
            let freshy = u.y + (this.ufoSpeed * params.updateSeconds * this.vertical);
            if (freshx < left || freshx > right) {
                sideReached=true;
                this.ufoTurn*=-1; 
                this.horizontal = 0;
                this.vertical = 1;
                this.areSinking = true;
            }
            if (sideReached===false) {
                u.x = freshx;
                u.y = freshy;
            }
        });
        if (this.areSinking) {
            this.ufoPresentSinking += (this.ufoSpeed*params.updateSeconds);
            if (this.ufoPresentSinking >= params.ufoSinking) {
                this.horizontal = 1;
                this.vertical = 0;
                this.areSinking = false;
                this.ufoPresentSinking = 0;
            }
        }

        //UFOs & BOMBS MOVMENTS
        const frontUfos = [];
        this.ufos.forEach(u => {
            if (!frontUfos[u.column] || frontUfos[u.column].line < u.line) frontUfos[u.column] = u;
        });
        for (let u of frontUfos) {
            if (!u) continue;
            if ((this.bombFreq*params.updateSeconds)>Math.random()) {
                this.bombs.push( (new GameObjects()).bomb(u.x, (u.y+(u.height/2))) );
            }
        }
        this.bombs.forEach((bomb, i) => {
            bomb.y += params.updateSeconds*this.bombSpeed;
            if (bomb.y > play.height) this.bombs.splice(i--, 1);
        });
        
        //COLLISIONS
        this.ufos.forEach((u, i) => {
            let collision = false;
            this.bullets.forEach((bullet, j) => {
                if ((bullet.x>=(u.x-(u.width/2))) && (bullet.x<=(u.x+(u.width/2))) 
                    && (bullet.y>=(u.y-(u.height/2))) && (bullet.y<=(u.y+(u.height/2)))) {
                    
                    collision = true;
                    this.bullets.splice(j--, 1);
                    play.score += params.pointPerHittedUfo;
                }
            });
            if (collision) {
                this.ufos.splice(i--, 1);
                play.sounds.playSound('ufoBoom');
            }
        });
        this.bombs.forEach((bomb, i) => {
            if (((bomb.x+2)>=(s.x-(s.width/2))) && ((bomb.x-2)<=(s.x+(s.width/2))) 
                && ((bomb.y+6)>=(s.y-(s.height/2))) && (bomb.y<=(s.y-(s.height/2))) ) {
                
                this.bombs.splice(i--, 1);
                play.sounds.playSound('spaceshipBoom');
                play.life--;
            }
        });
        this.ufos.forEach( u => {
            if (((u.x+(u.width/2))>(s.x-(s.width/2))) && ((u.x-(u.width/2))<(s.x-(s.width/2))) 
                && ((u.y+(u.height/2))>(s.y-(s.height/2))) && ((u.y-(u.height/2))<(s.y+(s.height/2)))) {
                
                play.sounds.playSound('spaceshipBoom');
                play.life = 0;
            }
        });

        if (play.life===0) play.goToPosition(new GameOverPosition());
        if (!this.ufos.length) {
            play.level++;
            play.goToPosition(new KingPosition(play.level));
        }
    }
    keyDown(play, keyboardCode) {
        if (keyboardCode===77) play.sounds.muteSwitch(); 
        if (keyboardCode===80) play.positionContainer.push(new PausePosition());
    }
    draw(play) {
        const s = this.spaceship;
        const w = play.width; const h = play.height;
        const { left, right, top, bottom } = play.playBoundaries;

        context.clearRect(0, 0, w, h);
        //SPACESHIP & BULLETS
        context.drawImage(this.sp_img, (s.x-(s.width/2)), (s.y-(s.height/2)));
        context.fillStyle = '#ff0000';
        this.bullets.forEach( b => context.fillRect((b.x-1), (b.y-6), 2, 9) );
        
        //UFOs & BOMBS
        this.ufos.forEach( u => context.drawImage(this.ufo_img, (u.x-(u.width/2)), (u.y-(u.height/2))) );
        context.fillStyle = '#FE2EF7';
        for (let b of this.bombs) context.fillRect((b.x-2), b.y, 4, 9)

        //LEVEL & SCORE:
        context.fillStyle = "aliceblue";
        context.font = "25px Comic Sans MS";
        context.fillText(`LEVEL: ${play.level}`, (left+75), (top-75));
        context.fillText(`SCORE: ${play.score}`, (right-75), (top-75));
        //LIFE:
        if (play.life > 1) {
            context.fillText(`LIFE: ${play.life}`, (w/2), (top-75));
        } else {
            context.fillStyle = "#FF4D4D";
            context.fillText(`WARNING: ${play.life}`, (w/2), (top-75));
        }

        //MUTE & PAUSE
        context.font = "16px Comic Sans MS";
        context.fillStyle = "purple";
        context.textAlign = "right";
        context.fillText("P: to pause game", right, bottom+80);

        context.textAlign = "left";
        context.fillText("M: to sound", left, bottom+80);
        context.fillStyle = "#FF4D4D";
        const soundStatus = (play.sounds.muted===true) ? "on" : "off";
        context.fillText(soundStatus, left+89, bottom+80);   
    }
}