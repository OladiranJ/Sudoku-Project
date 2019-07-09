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
        for(let i = 0; i < game.board.length; i++){

            for(let j = 0; j < game.board[i].length; j++){
                $(`div#${tileId}`).text(Math.round(Math.random() * 8) + 1)
                tileId++;
            }

        }
    },
}

game.populate();
game.render();
game.addNumbers();