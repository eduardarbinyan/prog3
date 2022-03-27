var Creature = require("./creature") 
module.exports = class Grasseater extends Creature{
    constructor(x,y){
        super(x,y);
        this.energy = 8;
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.multiply >= 7) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrass = new Grasseater(newX, newY);
            grassEaterArr.push(newGrass);
            this.multiply = 0;
        }
    }
    move() {
        this.getNewCoordinates()
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            // var newGrassEater = new GrassEater(newX, newY)
            // grassEaterArr.push(newGrassEater)
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy <= 0) {
                this.die()
            }
        }
    }
    eat() {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            this.multiply++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}