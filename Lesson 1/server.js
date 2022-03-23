express = require('express')
app = express()
server = require('http').Server(app)
io = require('socket.io')(server)
Creature = require("./classes/creature")
Grass = require("./classes/grass")
GrassEater = require("./classes/grasseater")
Bomber = require("./classes/bomber")
Ghost = require("./classes/ghost")
Void = require("./classes/void")
Predator = require("./classes/predator")
app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000,  () => {
    console.log('connected');
});

matrix=[]
side=10
msize=80

for (var i = 0; i < msize; i++) {
    matrix[i] = [];
    for (var j = 0; j < msize; j++) {
        matrix[i][j] = 0;
    }
}

io.sockets.emit('send matrix', matrix)

grassArr=[]
grassEaterArr = []
predArr=[]
ghostArr=[]
voidArr=[]
bombArr=[]

function spawn(gr,greater,predator) {
    for (i = 0; i < gr; i++) {
        var random1 = Math.floor(Math.random()*msize)
        var random2 = Math.floor(Math.random()*msize)
        var xot1 = new Grass(random1, random2);
        grassArr.push(xot1)
        matrix[random1][random2] = 1
    }
    for (i = 0; i < greater; i++) {
        var random1 = Math.floor(Math.random()*msize)
        var random2 = Math.floor(Math.random()*msize)
        var xotaker1 = new GrassEater(random1, random1);
        grassEaterArr.push(xotaker1)
        matrix[random1][random2] = 2
    }
    for (i = 0; i < predator; i++) {
        var random1 = Math.floor(Math.random()*msize)
        var random2 = Math.floor(Math.random()*msize)
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

    io.sockets.emit('send matrix', matrix)
}
spawn(10,5,2);
function gameupdate(){
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
    // for (let i in bombArr) {
    //     bombArr[i].fire()
    // }
    io.sockets.emit("send matrix", matrix);
}
setInterval(gameupdate,500)

io.on('connection', function (socket) {
    createObject(matrix)
})

