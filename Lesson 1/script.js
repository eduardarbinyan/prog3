
var matrix=[]
var side=10
var msize=70
var grassArr=[]
var grassEaterArr = []
var predArr=[]
var ghostArr=[]
var voidArr=[]
var bombArr=[]

for (var i = 0; i < msize; i++) {
    matrix[i] = [];
    for (var j = 0; j < msize; j++) {
        matrix[i][j] = 0;
    }
}
function spawn(gr,greater,predator) {
    for (i = 0; i < gr; i++) {
        var random1 = Math.floor(random(0, msize-1))
        var random2 = Math.floor(random(0, msize-1))
        var xot1 = new Grass(random1, random2);
        grassArr.push(xot1)
        matrix[random1][random2] = 1
    }
    for (i = 0; i < greater; i++) {
        var random1 = Math.floor(random(0, msize-1))
        var random2 = Math.floor(random(0, msize-1))
        var xotaker1 = new GrassEater(random1, random1);
        grassEaterArr.push(xotaker1)
        matrix[random1][random2] = 2
    }
    for (i = 0; i < predator; i++) {
        var random1 = Math.floor(random(0, msize-1))
        var random2 = Math.floor(random(0, msize-1))
        var pred1 = new Predator(random1, random1);
        predArr.push(pred1)
        matrix[random1][random2] = 3
    }
    var bomb1= new Bomber(msize-1,msize-1)
    bombArr.push(bomb1)
    matrix[msize-1][msize-1]=6
    var bomb1= new Bomber(0,msize-1)
    bombArr.push(bomb1)
    matrix[0][msize-1]=6
    var bomb1= new Bomber(msize-1,0)
    bombArr.push(bomb1)
    matrix[msize-1][0]=6
}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("white");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            else if (matrix[y][x] == 6) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (let i in predArr) {
        predArr[i].mul()
        predArr[i].kill()
    }
    for (let i in ghostArr) {
       ghostArr[i].consume()
    }
    for (let i in bombArr) {
        bombArr[i].fire()
     }
}
function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    spawn(40,40,35)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var xot1 = new Grass(x, y);
                grassArr.push(xot1)
            }
            else if (matrix[y][x] == 2) {
                var xotaker1 = new GrassEater(x, y);
                grassEaterArr.push(xotaker1)
            }
            else if (matrix[y][x] == 3) {
                var pred1 = new Predator(x, y);
                predArr.push(pred1)
            }
            else if (matrix[y][x] == 4) {
                var gh1 = new Ghost(x, y);
                ghostArr.push(gh1)
            }
            else if (matrix[y][x] == 5) {
                var v1 = new Void(x, y);
                voidArr.push(v1)
            }
        }
    }
}