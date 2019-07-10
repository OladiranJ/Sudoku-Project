const game = {
    board: [],
    initialOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
            $("div.container").append(
              $(
                `<div class="tile bottom right" id="${tileId}">${
                  game.board[i][j]
                }</div>`
              )
            );
            tileId++;
          } else if ((i + 1) % 3 === 0) {
            // console.log("i is 2")
            $("div.container").append(
              $(
                `<div class="tile bottom" id="${tileId}">${
                  game.board[i][j]
                }</div>`
              )
            );
            tileId++;
          } else if ((j + 1) % 3 === 0) {
            $("div.container").append(
              $(
                `<div class="tile right" id="${tileId}">${game.board[i][j]}</div>`
              )
            );
            tileId++;
          } else {
            $("div.container").append(
              $(`<div class="tile" id="${tileId}">${game.board[i][j]}</div>`)
            );
            tileId++;
          }
          console.log(tileId);
        }
      }
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

    hideNumbers(){
        
    },
  
    checkRow(row, num) {
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
    }
  };
  
  game.populate();
  game.fillBoard();
  game.render();