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
        this.len = length;
    }

    renderBlock() {
        etx.beginPath();
        etx.rect(this.posX,this.posY,this.len,this.len);
        etx.closePath();
        etx.fillStyle = this.color;
        etx.fill();
    }

    checkBoundaries() {
        if ((this.posY+this.len) > environment.height || (this.posY) < 0) {
            this.vY = -this.vY;
        }
        if ((this.posX+this.len) > environment.width || (this.posX) < 0) {
            this.vX = -this.vX;
        }
    }

    checkCollision(object) {   
        if (this.posX == (object.posX+object.len)) {
            console.log("this")   
            object.vX = this.vX;
            this.vX = -this.vX;
        }

        if (this.posX+this.len == object.posX ) {
            console.log("other")
            object.vX = this.vX;
            this.vX = -this.vX;
        }

        if (this.posY == object.posY){
            object.vY =  this.vY;
            this.vY = -this.vY;
        }
    }

}


let Block1 = new Block(200,275,5,0,100,'blue',25);
let Block2 = new Block(100,275,-5,0,10,'red',25);
let Block3 = new Block(100,275,-2,0,10,'black',25);
let blocks = [Block1,Block2,Block3]
function drawEnvironment() {
    etx.clearRect(0,0,environment.width,environment.height)
    for (let i = 0; i < blocks.length;i++) {
        blocks[i].renderBlock();
        blocks[i].posX += blocks[i].vX;
        blocks[i].posY += blocks[i].vY;
        blocks[i].checkBoundaries();
        let closestObject = filterObjectsDistance(blocks[i],blocks);
        console.log(blocks[i].color + " closest to "+ closestObject.color)
        blocks[i].checkCollision(closestObject);
    }
    window.requestAnimationFrame(drawEnvironment)
}

for (let i = 0; i < blocks.length;i++) {
    blocks[i].renderBlock();
}

function filterObjectsDistance(object,objectList) {
    let closestObjectIndex = 0;
    for (let i = 0; i < objectList.length; i++) {
        //How to detremine shortest distance between current position and others current positions
        if (Math.abs(object.posX-objectList[i].posX) < Math.abs(object.posX-objectList[closestObjectIndex].posX)) {
            closestObjectIndex = i;
        }   
        return objectList[closestObjectIndex]
    }


}

window.requestAnimationFrame(drawEnvironment)