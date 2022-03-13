class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCells(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
                if (matrix[y][x] == character)
                    found.push(this.directions[i]);
            }
        }
        return found;
    }
    mul() {
        let emptyCells = this.chooseCells(0)
        this.multiply++
        if (emptyCells.length != 0 && this.multiply >= 5) {
            let randomCell = random(emptyCells)
            let x = randomCell[0]
            let y = randomCell[1]
            matrix[y][x] = 1
            let gr = new Grass(x, y)
            grassArr.push(gr)
            this.multiply = 0
        }
    }
}
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 7;
        this.multiply = 0
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells)
        if (newCell && this.multiply >= 7) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrass = new GrassEater(newX, newY);
            grassEaterArr.push(newGrass);
            this.multiply = 0;
        }
    }
    move() {
        this.getNewCoordinates()
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            // var newGrassEater = new GrassEater(newX, newY)
            // grassEaterArr.push(newGrassEater)
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy <= 0) {
                this.die()
            }
        }
    }
    eat() {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            this.multiply++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 12
        this.multiply = 0
        this.directions = []
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells)
        if (newCell && this.multiply >= 6) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            var newPred = new Predator(newX, newY);
            predArr.push(newPred);
            this.multiply = 0;
        }
    }
    move() {
        this.getNewCoordinates()
        this.energy--
        var emptyCells = this.chooseCell(0)

        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy <= 0) {
                this.die()
            }
        }
    }

    kill() {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy += 2
            this.multiply += 6
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 4
            let ghost = new Ghost(this.y, this.x)
            ghostArr.push(ghost)
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }
            this.x = newX
            this.y = newY

        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predArr) {
            if (this.x == predArr[i].x && this.y == predArr[i].y) {
                predArr.splice(i, 1);
                break;
            }
        }
    }
}
class Ghost {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.directions = []
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCells(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
                if (matrix[y][x] == character)
                    found.push(this.directions[i]);
            }
        }
        return found;
    }
    consume() {
        var emptyCells = this.chooseCells(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 5
            this.x = newX
            this.y = newY
        }
        else this.die()
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in ghostArr) {
            if (this.x == ghostArr[i].x && this.y == ghostArr[i].y) {
                ghostArr.splice(i, 1);
                break;
            }
        }
    }
}
class Void {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
class Bomber {
    constructor(x, y) {
        this.x = x
        this, y = y
    }
    fire() {
        var random1 = Math.floor(random(1, msize - 1))
        var random2 = Math.floor(random(1, msize - 1))
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

