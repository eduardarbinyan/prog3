var r = require("./Creature")

module.exports = class Ghost extends Creature{
    consume() {
        var emptyCells = this.chooseCells(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 5
            this.x = newX
            this.y = newY
        }
        else this.die()
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in ghostArr) {
            if (this.x == ghostArr[i].x && this.y == ghostArr[i].y) {
                ghostArr.splice(i, 1);
                break;
            }
        }
    }
}