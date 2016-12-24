class ChessBoard {

  constructor(div) {
    this.div = document.querySelector(div);
  }

  createBoard(size) {
    console.log(this.div);

    let table = document.createElement('table');

    for (let a = 0; a < size; a++) {
      let tr = document.createElement('tr');

      for (let b = 0; b < size; b++) {
        let td = document.createElement('td');
        td.setAttribute("data-position", `${String.fromCharCode(65 + b)}${1 + a}`);
        tr.appendChild(td);

        if ((a%2 == 0 && b%2 == 0) || (a%2 != 0 && b%2 != 0) ) {
          td.style.background = "black";
        } else {
          td.style.background = "#c7c7c7";
        }

      }

      table.appendChild(tr);
    }

    this.div.appendChild(table);
  }

  activateBoard(div) {
    let info = document.querySelector(div);

    this.div.addEventListener('click', function (e) {
      info.textContent = e.target.attributes['data-position'].value;
      console.log(e.target.attributes['data-position'].value);
    })
  }

}

const chess = new ChessBoard('#board');

chess.createBoard(8);
chess.activateBoard('#info');