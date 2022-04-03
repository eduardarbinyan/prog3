var Creature = require("./creature")

module.exports = class Ghost extends Creature{
    consume() {
        this.getNewCoordinates()
        var emptyCells = this.directions
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var newX = newCell[0]
        var newY = newCell[1]
        console.log(newX,newY)
        matrix[newY][newX] = 4
        matrix[this.y][this.x] = 5
        this.x = newX
        this.y = newY
    }
}