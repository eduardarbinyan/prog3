module.exports = class Bomber{
    constructor(x, y) {
        this.x = x
        this, y = y
    }
    fire() {
        var random1 = Math.floor(Math.random()*matrix.length)
        var random2 = Math.floor(Math.random()*matrix.length)
        matrix[random1][random2] = 0
        matrix[random1 + 1][random2 + 1] = 0
        matrix[random1 - 1][random2 - 1] = 0
        matrix[random1 - 1][random2] = 0
        matrix[random1][random2 - 1] = 0
        matrix[random1 + 1][random2] = 0
        matrix[random1][random2 + 1] = 0
        matrix[random1 - 1][random2 + 1] = 0
        matrix[random1 + 1][random2 - 1] = 0
    }
}