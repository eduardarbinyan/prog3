let express = require('express')
let app = express()
let server = require('http').Server(app)
io = require('socket.io')(server)
let Grass = require("./classes/grass")
let GrassEater = require("./classes/grasseater")
let Bomber = require("./classes/bomber")
let Ghost = require("./classes/ghost")
let Void = require("./classes/void")
let Predator = require("./classes/predator")

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

matrix = []
msize = 80

grassArr = []
grassEaterArr = []
predArr = []
ghostArr = []
voidArr = []
bombArr = []


function generateMatrix(gr, grEat, pred, ghost) {
    for (let i = 0; i < msize; i++) {
        matrix[i] = [];
        for (var j = 0; j < msize; j++) {
            matrix[i][j] = 0;
        }
    }

    for (let i = 0; i < gr; i++) {
        var random1 = Math.floor(Math.random() * msize)
        var random2 = Math.floor(Math.random() * msize)
        if (matrix[random1][random2] == 0) {
            matrix[random1][random2] = 1
        } else {
            i--
        }
    }


    for (let i = 0; i < grEat; i++) {
        var random1 = Math.floor(Math.random() * msize)
        var random2 = Math.floor(Math.random() * msize)
        if (matrix[random1][random2] == 0|| matrix[random1][random2] == 1) {
            matrix[random1][random2] = 2
        } else {
            i--
        }
    }

    for (let i = 0; i < pred; i++) {
        var random1 = Math.floor(Math.random() * msize)
        var random2 = Math.floor(Math.random() * msize)
        if (matrix[random1][random2] == 0|| matrix[random1][random2] == 1){
            matrix[random1][random2] = 3
        } else {
            i--
        }
    }

    for (let i = 0; i < ghost; i++) {
        var random1 = Math.floor(Math.random() * msize)
        var random2 = Math.floor(Math.random() * msize)
        if (matrix[random1][random2] == 0 || matrix[random1][random2] == 1) {
            matrix[random1][random2] = 4
        } else {
            i--
        }
    }

    matrix[msize - 1][msize - 1] = 6
    matrix[0][msize - 1] = 6
    matrix[msize - 1][0] = 6
    
    return matrix

}

io.sockets.emit('send matrix', generateMatrix(100,40,20,1))



function spawn(matrix) {
    console.log('obj???');
    
    for (let i = 0; i < matrix[0].length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (matrix[i][j] == 1) {
                var xot1 = new Grass(i, j);
                grassArr.push(xot1)
            }
            if (matrix[i][j] == 2) {

                var xotaker1 = new GrassEater(i, j);
                grassEaterArr.push(xotaker1)
            }
            if (matrix[i][j] == 3) {

                var pred1 = new Predator(i, j);
                predArr.push(pred1)
            }
            if (matrix[i][j] == 4) {

                var gh = new Ghost(i, j);
                ghostArr.push(gh)
            }
            // if (matrix[i][j] == 6) {

            //     var bombik = new Bomber(i, j);
            //     bombArr.push(bombik)
            // }
        }
    }
io.sockets.emit('send matrix', matrix)
}


function gameupdate() {
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
    io.sockets.emit("send matrix", matrix);
}
setInterval(gameupdate, 1000)

io.on('connection', function () {
    console.log('are connected');
   spawn(matrix)
})

