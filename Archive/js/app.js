const game = {
    board: [],
    populate(){
        this.board = new Array(9).fill(0).map(el => {
            return el = new Array(9).fill(0)
        })
    },
    render(){
        let tileId = 0
        for(let i = 0; i < game.board.length; i++){

            for(let j = 0; j < game.board[i].length; j++){
                // console.log(i+1%3, j+1%3)
                if ((i+1)%3 === 0 && (j+1)%3 ===0){
                    $('div.container').append($(`<div class="tile bottom right" id="${tileId}"></div>`));
                    tileId++;
                } else if ((i+1) % 3 === 0){
                    // console.log("i is 2")
                    $('div.container').append($(`<div class="tile bottom" id="${tileId}"></div>`));
                    tileId++;
                } else if ((j+1) % 3 === 0){
                    $('div.container').append($(`<div class="tile right" id="${tileId}"></div>`));
                    tileId++;
                }else{
                    $('div.container').append($(`<div class="tile" id="${tileId}"></div>`));
                    tileId++;
                }
                console.log(tileId)
            }

        }
    },
    addNumbers(){
        let tileId = 0;
        let numbers = []
        for(let i = 0; i < game.board.length; i++){
            numbers = [1,2,3,4,5,6,7,8,9]
            for(let j = 0; j < game.board[i].length; j++){
                let random = Math.round(Math.random() * numbers.length)
                // while(!this.checkAll(numbers[random], i, j)) {
                //     random = Math.round(Math.random() * 8) + 1
                // }
                const mixed = numbers.splice(random, 1)[0]
                console.log(mixed, numbers)
                if (this.checkAll(mixed, i, j)){
                    $(`div#${tileId}`).text(mixed)
                    this.board[i][j] = mixed
                }
                tileId++;
            }

        }
    },

    makeNumber(j,i) {
        // if(checkAll(this.board, mixed, i, j )) {
        //     return mixed
        // } else {
        //     return this.makeNumber(j,i)
        // }
        // while(!checkAll(this.board, mixed, i, j )) {
        //     mixed = Math.round(Math.random() * 8) + 1
        // }

        // let mixed = Math.round(Math.random() * 8) + 1
        // while (!this.checkAll(mixed, i, j )) {
        //     mixed = Math.round(Math.random() * 8) + 1
        // }
        // return mixed
        
    },
    checkRow(array, i, j ){
        for(let i = 0; i < array.length - 1; i++){
            for(let k = i + 1; k < array.length - (i + 1); k++){
                if(array[i] ===  array[k]){

                }
            }
        }
    },
    checkAll(mixed, i, j) {
        return !this.board[i].includes(mixed) && !getCol(this.board, j).includes(mixed) && !gridArray(this.board, j, i).includes(mixed)
    }
    // checkColumn()
}


function getCol(arr, col) {
    const column = []
    for(let i = 0; i < arr.length; i++) {
        column.push(arr[i][col])
    }
    return column
}

function gridArray(puzzle, x, y) {
    x = Math.floor(x / 3) * 3;
    y = Math.floor(y / 3) * 3;
    
    var arr = [];
    
    for (i = x; i < x + 3; i++) {
        for (j = y; j < y + 3; j++) {
            arr.push(puzzle[j][i]);
        }
    }
    
    return arr;
}

game.populate();
game.render();
game.addNumbers();
// game.checkRow();