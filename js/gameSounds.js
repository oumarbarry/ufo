//https://freesound.org for more mp3s

class Sounds {
    constructor() {
        this.muted = false;
        this.allAudios = [];
        
        this.sources = ['sound/bulletShot.mp3', 'sound/ufoBoom.mp3', 'sound/spaceshipBoom.mp3'];
        this.sources.forEach((source, i) => {
            this.allAudios.push(new Audio());
            this.allAudios[i].src = source;
            this.allAudios[i].setAttribute('preload', 'auto');
        });
    }
    playSound(soundName) {
        if (this.muted) return;
        this.allAudios.forEach((audio, i) => {
            if(audio.src.includes(soundName)) {
                this.allAudios[i].play();
                this.allAudios[i].currentTime = 0;
            }
        });
    }
    muteSwitch() { this.muted===false ? this.muted=true: this.muted=false; }
}