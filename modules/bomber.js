module.exports = class Bomber{
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    fire() {
        var i = Math.floor(Math.random()*(matrix.length-1))
        if(i!=0)matrix[i][i] = 0;
        
        
    }
}