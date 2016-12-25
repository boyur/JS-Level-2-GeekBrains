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
        td.setAttribute("data-position", `${String.fromCharCode(65 + b)}${size - a}`);
        tr.appendChild(td);

        if ((a%2 == 0 && b%2 == 0) || (a%2 != 0 && b%2 != 0) ) {
          td.style.background = "#442f20";
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
      if (e.target.tagName != 'TD') return;

      info.textContent = e.target.attributes['data-position'].value;
      console.log(e.target.attributes['data-position'].value);
    })
  }

}

const chess = new ChessBoard('#board');

chess.createBoard(8);
chess.activateBoard('#info');

// let test = document.querySelector('td[data-position="A1"]');
// console.log(test);
// let test2 = document.createElement('div');
// test2.classList.add('figureKingWhite');
// test.appendChild(test2);
//
// test = document.querySelector('td[data-position="B1"]');
// console.log(test);
// test2 = document.createElement('div');
// test2.classList.add('figureQueenWhite');
// test.appendChild(test2);

let startPosition = {
  "white": {
    "w-pawn1": {
      "pos": "A2",
      "class": "figurePawnWhite"
    },
    "w-pawn2": {
      "pos": "B2",
      "class": "figurePawnWhite"
    },
    "w-pawn3": {
      "pos": "C2",
      "class": "figurePawnWhite"
    },
    "w-pawn4": {
      "pos": "D2",
      "class": "figurePawnWhite"
    },
    "w-pawn5": {
      "pos": "E2",
      "class": "figurePawnWhite"
    },
    "w-pawn6": {
      "pos": "F2",
      "class": "figurePawnWhite"
    },
    "w-pawn7": {
      "pos": "G2",
      "class": "figurePawnWhite"
    },
    "w-pawn8": {
      "pos": "H2",
      "class": "figurePawnWhite"
    },
    "w-rook1": {
      "pos": "A1",
      "class": "figureRookWhite"
    },
    "w-horse1": {
      "pos": "B1",
      "class": "figureHorseWhite"
    },
    "w-elephant1": {
      "pos": "C1",
      "class": "figureElephantWhite"
    },
    "w-queen": {
      "pos": "D1",
      "class": "figureQueenWhite"
    },
    "w-king": {
      "pos": "E1",
      "class": "figureKingWhite"
    },
    "w-elephant2": {
      "pos": "F1",
      "class": "figureElephantWhite"
    },
    "w-horse2": {
      "pos": "G1",
      "class": "figureHorseWhite"
    },
    "w-rook2": {
      "pos": "H1",
      "class": "figureRookWhite"
    }
  },
  "black": {
    "b-pawn1": {
      "pos": "A7",
      "class": "figurePawnBlack"
    },
    "b-pawn2": {
      "pos": "B7",
      "class": "figurePawnBlack"
    },
    "b-pawn3": {
      "pos": "C7",
      "class": "figurePawnBlack"
    },
    "b-pawn4": {
      "pos": "D7",
      "class": "figurePawnBlack"
    },
    "b-pawn5": {
      "pos": "E7",
      "class": "figurePawnBlack"
    },
    "b-pawn6": {
      "pos": "F7",
      "class": "figurePawnBlack"
    },
    "b-pawn7": {
      "pos": "G7",
      "class": "figurePawnBlack"
    },
    "b-pawn8": {
      "pos": "H7",
      "class": "figurePawnBlack"
    },
    "b-rook1": {
      "pos": "A8",
      "class": "figureRookBlack"
    },
    "b-horse1": {
      "pos": "B8",
      "class": "figureHorseBlack"
    },
    "b-elephant1": {
      "pos": "C8",
      "class": "figureElephantBlack"
    },
    "b-queen": {
      "pos": "D8",
      "class": "figureQueenBlack"
    },
    "b-king": {
      "pos": "E8",
      "class": "figureKingBlack"
    },
    "b-elephant2": {
      "pos": "F8",
      "class": "figureElephantBlack"
    },
    "b-horse2": {
      "pos": "G8",
      "class": "figureHorseBlack"
    },
    "b-rook2": {
      "pos": "H8",
      "class": "figureRookBlack"
    }
  }
};

console.log(startPosition["white"]);

for (let key in startPosition["white"]) {
  creatFigure(key, startPosition["white"]);
}

for (let key in startPosition["black"]) {
  creatFigure(key, startPosition["black"]);
}

function creatFigure(idFigure, obj) {
  let div = document.createElement('div');
  div.id = idFigure;
  div.classList.add('figure');
  div.classList.add(obj[idFigure]['class']);
  div.style.top = '0px';
  div.style.left = '0px';
  let td = document.querySelector(`td[data-position="${obj[idFigure]['pos']}"]`);
  console.log(td);
  td.appendChild(div);

  console.log(`Фигура ${idFigure} создана!`);

  // Вешаю обработчики
  let targetItem = {};
  let targetOffset = {};
  let flag = false;

  // Зажатие клавиши мыши
  div.addEventListener("mousedown", function (e) {

    if (e.target.tagName == "BODY" || e.target.tagName == "TABLE") {
      return;
    }

    flag = true;

    targetItem = e.target;

    console.log(targetItem);

    targetOffset.x = e.clientX - e.target.style.left.replace(/[^-0-9]/gim,'');
    targetOffset.y = e.clientY - e.target.style.top.replace(/[^-0-9]/gim,'');

    console.log(`x: ${e.target.style.top}; y:${e.target.style.left}`);
    console.log(targetOffset);
  });

  // Движение мыши
  div.addEventListener("mousemove", function (e) {
    if (!flag) {
      return;
    }

    let target = e.target;

    console.log(targetItem);

    targetItem.style.top = e.clientY - targetOffset.y + "px";
    targetItem.style.left = e.clientX - targetOffset.x + "px";
    console.log(e.clientX);
    console.log(targetOffset.x);
    console.log(target.style.top);
  });

  // Отпустить мыш
  div.addEventListener("mouseup", function (e) {
    let target = e.target;
    let position = false;
    flag = false;
    targetItem = null;
    console.log(target);

    // Смотрим что за позиция
    let elem = document.elementFromPoint(e.clientX, e.clientY);

    if (elem.tagName != 'TD') {
      elem.style.display = 'none';
      position = document.elementFromPoint(e.clientX, e.clientY).getAttribute('data-position');
      console.log(position);
      elem.style.display = 'block';
    }

    // Меняем позицию
    console.log(e.target);
    e.target.remove();

    let td = document.querySelector(`td[data-position="${position}"]`);
    console.log(td);
    td.appendChild(target);
    target.style.top = '0px';
    target.style.left = '0px';
  });
}