var socket = io();

side = 10
msize = 80
function setup() {
    createCanvas(msize * side, msize * side);
    background("#acacac");
}

function nkarel(matrix) {
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

}

setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },1000
)
