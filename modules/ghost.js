
const { format } = require("express/lib/response");
var Creature = require("./LiveForm")

module.exports = class Ghost extends Creature{
    
    consume() {
        this.getNewCoordinates();      
        var emptyCells = this.chooseCell(0);  
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if(emptyCells[0]!=undefined){
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 6
            this.x = newX
            this.y = newY
        }
       
    }
}