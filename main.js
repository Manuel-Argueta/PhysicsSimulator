let environment = document.getElementById('physicsEnvironment');
let etx = canvas.environment.getContext('2d');

class Block {
    constructor(posX, posY, vX, vY, color, length) {
        this.posX = posX;
        this.posY = posY;
        this.vX = vX;
        this.vY = vY;
        this.color = color;
        this.length = length;
    }

    drawBlock() {
        etx.beginPath();
        etx.rect(this.posX,this.posY,this.length,this.length);
        etx.closePath();
        etx.fillStyle = this.color;
        etx.fill();
    }
}

function drawEnvironment() {

}