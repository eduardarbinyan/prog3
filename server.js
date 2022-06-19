// 
weath = "winter"
//! Requiring modules  --  START
var fs = require("fs")
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/predator.js");
var Ghost = require("./modules/ghost.js");
var Bomber = require("./modules/bomber.js");
var Void = require("./modules/void.js");

let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predArr = [];
bomberArr = [];
ghostArr = [];
matrix = [];
voidArr = [];
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, ghost) {
    for (let i = 0; i < matrixSize; i++) {  
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < ghost; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    matrix[0][0] = 5;
}
matrixGenerator(20, 2, 3, 1, 1);
//! Creating MATRIX -- END

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y);
                predArr.push(pred);
            }
            else if (matrix[y][x] == 4) {
                var ghost = new Ghost(x, y);
                ghostArr.push(ghost);
            }
            else if (matrix[y][x] == 5) {
                var bomb = new Bomber(x, y);
                bomberArr.push(bomb);
            }
            else if (matrix[y][x] == 6) {
                var v =  new Void(x, y);
                voidArr.push(v);
            }
        }
    }
}

function game() {
    if (grassArr[0] !== undefined) {
        if(weath != 'autumn') {
            for (var i in grassArr) {
                grassArr[i].mul();
            }
        }
        
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predArr[0] !== undefined) {
        for (var i in predArr) {
            predArr[i].kill();
        }
    }
    if (ghostArr[0] !== undefined) {
        for (var i in ghostArr) {
            ghostArr[i].consume();
        }
    }
    for (var i in bomberArr) {
        bomberArr[i].fire();
    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)

//// Add event
function kill() {
    grassArr = [];
    grassEaterArr = []
    predArr = []
    ghostArr = [];
    bomberArr = [];
    voidArr=[];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}
io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
});
////   Create static Json
var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)
