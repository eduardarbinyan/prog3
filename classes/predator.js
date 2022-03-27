var Creature = require("./creature") 
var Ghost = require("./ghost") 


module.exports = class Predator extends Creature{
    constructor(x,y){
        super(x,y);
        this.energy = 8;
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.multiply >= 6) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            var newPred = new Predator(newX, newY);
            predArr.push(newPred);
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
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy <= 0) {
                this.die()
            }
        }
    }

    kill() {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy += 2
            this.multiply += 6
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 4
            let ghost = new Ghost(this.y, this.x)
            ghostArr.push(ghost)
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }
            this.x = newX
            this.y = newY

        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predArr) {
            if (this.x == predArr[i].x && this.y == predArr[i].y) {
                predArr.splice(i, 1);
                break;
            }
        }
    }
}