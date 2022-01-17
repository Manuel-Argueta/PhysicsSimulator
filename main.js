let environment = document.getElementById('physicsEnvironment');
let etx = environment.getContext('2d');
let raf;

class Block {
    constructor(posX, posY, vX, vY, mass, color, length) {
        this.posX = posX;
        this.posY = posY;
        this.vX = vX;
        this.vY = vY;
        this.mass = mass;
        this.color = color;
        this.length = length;
    }

    renderBlock() {
        etx.beginPath();
        etx.rect(this.posX,this.posY,this.length,this.length);
        etx.closePath();
        etx.fillStyle = this.color;
        etx.fill();
    }

    checkBoundaries() {
        if ((this.posY+this.length) > environment.height || (this.posY) < 0) {
            this.vY = -this.vY;
        }
        if ((this.posX+this.length) > environment.width || (this.posX) < 0) {
            this.vX = -this.vX;
        }
    }

    checkCollision(object) {
        if (this.vX < 0 && object.vX > 0) {
            console.log("here")
            if ((this.posX+this.length) == object.posX) {
                object.vX = this.vX;
                this.vX = -this.vX;
            }
        } else { 
            if ((this.posX) == object.posX) {
                object.vX = this.vX;
                this.vX = -this.vX;
            }
        }


        if ((this.posY) == object.posY){
            object.vY =  this.vY;
            this.vY = -this.vY;
        }
    }

}


let Block1 = new Block(100,275,-2,0,100,'blue',25);
let Block2 = new Block(150,275,2,0,10,'red',25);
//let Block3 = new Block(100,275,-2,5,10,'black',25);
let blocks = [Block1,Block2]
function drawEnvironment() {
    etx.clearRect(0,0,environment.width,environment.height)
    for (let i = 0; i < blocks.length;i++) {
        blocks[i].renderBlock();
        blocks[i].posX += blocks[i].vX;
        blocks[i].posY += blocks[i].vY;
        blocks[i].checkBoundaries();
        if (i == blocks.length-1) {
            blocks[i].checkCollision(blocks[0])
        }  else {
            blocks[i].checkCollision(blocks[i+1])

        }
    }
    window.requestAnimationFrame(drawEnvironment)
}

for (let i = 0; i < blocks.length;i++) {
    blocks[i].renderBlock();
}

window.requestAnimationFrame(drawEnvironment)