module.exports = class Bomber{
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    fire() {
        var randomi = Math.floor(Math.random()*(matrix.length-1))
        for(var i = 0; i<matrix.length;i++){
          matrix[randomi][i]=0;
      }
    }
}