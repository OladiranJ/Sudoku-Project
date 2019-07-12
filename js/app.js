// <----------------------------------------- Game Object -------------------------------------------->
const game = {
    board: [],
    initialOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    selectedTile: null,
    selectedTileId: null,
    boxNumber: 0,

    populate() {
      this.board = new Array(9).fill(0).map(el => {
        return (el = new Array(9).fill(0));
      });
    },

    render() {
      let tileId = 0;
      for (let i = 0; i < game.board.length; i++) {
        for (let j = 0; j < game.board[i].length; j++) {
          if ((i + 1) % 3 === 0 && (j + 1) % 3 === 0) {
            $($("div.row")[i]).append(
              $(
                `<div class="tile bottom right" id="${tileId}">${
                  game.board[i][j]
                }</div>`
              )
            );
            tileId++;
          } else if ((i + 1) % 3 === 0) {
            // console.log("i is 2")
            $($("div.row")[i]).append(
              $(
                `<div class="tile bottom" id="${tileId}">${
                  game.board[i][j]
                }</div>`
              )
            );
            tileId++;
          } else if ((j + 1) % 3 === 0) {
            $($("div.row")[i]).append(
              $(
                `<div class="tile right" id="${tileId}">${game.board[i][j]}</div>`
              )
            );
            tileId++;
          } else {
            $($("div.row")[i]).append(
              $(`<div class="tile" id="${tileId}">${game.board[i][j]}</div>`)
            );
            tileId++;
          }
        //   console.log(tileId);
        }
      }
    },

    getRow(num) {
        return $(num).parent().attr('row')
    },

    getCol(num) {
      const col = [];
      for (let i = 0; i < this.board.length; i++) {
        col.push(this.board[i][num]);
      }
      return col;
    },
  
    getBox(row, col) {
      x = Math.floor(row / 3) * 3;
      y = Math.floor(col / 3) * 3;
  
      const box = [];
  
      for (i = x; i < x + 3; i++) {
        for (j = y; j < y + 3; j++) {
          box.push(this.board[i][j]);
        }
      }
  
      return box;
    },
  
    fillBoard() {
      for (let row = 0; row < 9; row++) {
        let options = [...this.initialOptions];
        for (let col = 0; col < 9; col++) {
          let randIndex = Math.floor(Math.random() * options.length);
          let rand = options[randIndex];
          while (
            !(
              this.checkRow(row, rand) &&
              this.checkCol(col, rand) &&
              this.checkBox(row, col, rand)
            )
          ) {
            randIndex = Math.floor(Math.random() * options.length);
            rand = options[randIndex];
            if (
              options.every(
                option =>
                  this.getCol(col).includes(option) ||
                  this.getBox(row, col).includes(option)
              )
            ) {
              break;
            }
          }
          if (
            options.every(
              option =>
                this.getCol(col).includes(option) ||
                this.getBox(row, col).includes(option)
            )
          ) {
            this.board.forEach(row => row.fill(0));
            row = -1;
            break;
          } else {
            this.board[row][col] = rand;
            options.splice(randIndex, 1);
          }
        }
      }
    },

    hideNumbers(diff){
        const everyTile = [];
        const singleRow = $('div.row')
        // console.log(singleTile)
        for(let i = 0; i < singleRow.length; i++){
            for(let j = 0; j < $(singleRow[i])[0].childNodes.length; j++){
                 // everyTile.push(singleTile);
                if (Math.random() < diff){
                    $(singleRow[i].childNodes[j]).text('')
                    $(singleRow[i].childNodes[j]).css("background-color", "#d6d6d2")
                    $(singleRow[i].childNodes[j]).on("click", (e)=>{
                        let id = e.target.id
                        this.selectedTileId = id
                        this.getRow($(`#${game.selectedTileId}`))
                        if (this.selectedTile){
                            this.selectedTile.css("background-color", "#d6d6d2")
                            this.selectedTile = $(e.target)
                            this.selectedTile.css("background-color", "#a6ff73")
                            this.getRow($(`#${game.selectedTileId}`))
                        } else if(!this.selectedTile){
                            this.selectedTile = $(e.target)
                            this.selectedTile.css("background-color", "#a6ff73")
                            this.getRow($(`#${game.selectedTileId}`))
                        }
                    })
                }
            }
           
        }
        // console.log(everyTile);
    },
  
    checkRow(row, num) {
      console.log('hitting CHECKROW')
      if (this.board[row].includes(num)) {
        return false;
      } else {
        return true;
      }
    },
  
    checkCol(col, num) {
      const colToCheck = this.getCol(col);
      if (colToCheck.includes(num)) {
        return false;
      } else {
        return true;
      }
    },
  
    checkBox(row, col, num) {
      const boxToCheck = this.getBox(row, col);
      if (boxToCheck.includes(num)) {
        return false;
      } else {
        return true;
      }
    },

    checkConflict(){
        // if number is entered into selected tile run checkRow, checkCol, and checkBox
        // if any of the three functions return false, turn inner text to color red
        if(isNaN(this.boxNumber)) {
            $(`#${this.selectedTileId}`).css("background-color", "#a6ff73")
        } else {

            //get the id of the box that was clicked
            // this.selectedTileId
            //get the row with $(`#${this.selectedTileId}`).parent()
            // which row is a number
            const whichRow = $($(`#${this.selectedTileId}`).parent()[0]).attr('row')
            //get the id of the box at position [0] in that row
            const firstBoxInRowId = $($($(`#${this.selectedTileId}`).parent()).children()[0]).attr('id')
            //subtract the id of the box that was clicked from the id of the box at [0] and that gives you the column
            const column = this.selectedTileId - firstBoxInRowId
            //using row and column, see if the number that was input matches the number in that position in the game board
            const numberToCheckAgainst = this.board[whichRow][column]
            if(parseInt(this.boxNumber) === numberToCheckAgainst) {
            } else {
                $(`#${this.selectedTileId}`).css("background-color", "red")
            }

            // if(
            //     this.checkRow(this.getRow($(`#${this.selectedTileId}`)), +this.boxNumber))
            //     // && 
            //     // this.checkCol(this.getCol(this.selectedTile), this.boxNumber) 
            //     // && 
            //     // this.checkBox(this.getBox(this.selectedTile), this.boxNumber)) 
            //     {
            //         console.log('hitting text change')
                    
            //     } else {
            //         console.log('not hitting')
            //         $(`#${this.selectedTileId}`).css("background-color", "red")
            // }
        }
        this.checkForWin()


    },

    checkForWin(){
        const board = $('.row').children()
        console.log(board)

        // for(let i = 0; i < board.length; i++){
        //     const array = [];
        //     array.push(board[i].text)
        // }
        // if(array.length == 81){
        //     console.log('you win')
        // } else{
        //     console.log('keep playing')
        // }
        $.each(board, function(box) {
            const entry = $(box).text()
            if(entry !== ""){
                console.log('you won')
            } else {
                console.log('you lost')
            }
        })
    }

  };


// <--------------------------------------- Button functionality --------------------------------------->



  $('.numbers').on('click', (e)=>{
      $(e.target).text()
      if(game.selectedTile){
          game.selectedTile.text($(e.target).text())
          game.boxNumber = $(`#${game.selectedTileId}`).text()
          game.checkConflict()
      }
  })

  $('#remove-num').on('click', (e)=>{
      const tileEntered = "";
      if(game.selectedTile){
          game.selectedTile.text(tileEntered)
      }

  })

  $('.easy').on('click', (e)=>{
      let diff = 0.10
      $('.button-container').show()
      $('.restart').show()
      $('.difficulty').hide()
      game.populate();
      game.fillBoard();
      game.render();
      game.hideNumbers(diff)
  })

  $('.medium').on('click', (e)=>{
      let diff = 0.59
      $('.button-container').show()
      $('.restart').show()
      $('.difficulty').hide()
      game.populate();
      game.fillBoard();
      game.render();
      game.hideNumbers(diff)
  })

  $('.hard').on('click', (e)=>{
      let diff = 0.691
      $('.button-container').show()
      $('.restart').show()
      $('.difficulty').hide()
      game.populate();
      game.fillBoard();
      game.render();
      game.hideNumbers(diff)
  })


// <----------------------------- Calling Game Functions in Start Button ------------------------------->

$('.begin').hide()
$('.difficulty').hide()
$('.button-container').hide()
$('.instructions').hide()
$('.restart').hide()


$('.start').on('click', (e)=>{
    $('.begin').show()
    $('.instructions').show()
    $('.start').hide()
})

$('.begin').on('click', (e)=>{
    $('.difficulty').show()
    $('.begin').hide()
    $('.instructions').hide()
})

$('.restart').on('click', (e)=>{
    location.reload()
})

//   game.populate();
//   game.fillBoard();
//   game.render();
//   game.checkConflict();
