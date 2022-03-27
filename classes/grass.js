var Creature = require("./creature") 
module.exports = class Grass extends Creature{
    mul() {
        let emptyCells = this.chooseCell(0)
        this.multiply++
        if (emptyCells.length != 0 && this.multiply >= 5) {
            let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            let x = randomCell[0]
            let y = randomCell[1]
            matrix[y][x] = 1
            let gr = new Grass(x, y)
            grassArr.push(gr)
            this.multiply = 0
        }
    }
}