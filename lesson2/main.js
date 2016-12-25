class Chess {

  constructor(div) {
    this.div = document.querySelector(div);
    this.startPosition = {};
    this.history = {};
  }

  // Генерация шахматной доски
  createBoard() {
    console.log(this.div);

    let table = document.createElement('table');

    for (let a = 0; a < 8; a++) {
      let tr = document.createElement('tr');

      for (let b = 0; b < 8; b++) {
        let td = document.createElement('td');
        td.setAttribute("data-position", `${String.fromCharCode(65 + b)}${8 - a}`);
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

  // События для доски (не обязательный)
  activateBoard(div) {
    let info = document.querySelector(div);

    this.div.addEventListener('click', function (e) {
      if (e.target.tagName != 'TD') return;

      info.textContent = e.target.attributes['data-position'].value;
      console.log(e.target.attributes['data-position'].value);
    })
  }

  // Генерация фигуры
  creatFigure(idFigure, obj) {
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

    this.addEvents(div);
  }

  // События для фигуры
  addEvents(div) {
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

  // Вешаем события на все фигуры
  arrangeChees() {
    // Загрузка стартовых позиций
    let p = new Promise(function (resolve) {
      let req = new XMLHttpRequest();
      // Рассположение файла
      req.open('GET', './startPosition.json', true);
      req.onload = function() {
        resolve(JSON.parse(req.response));
      };
      req.send();
    });

    p.then((obj) => {
      this.startPosition = obj;
      console.log(obj);

      for (let key in this.startPosition["white"]) {
        this.creatFigure(key, this.startPosition["white"]);
      }

      for (let key in this.startPosition["black"]) {
        this.creatFigure(key, this.startPosition["black"]);
      }
    });
  }

}

const chess = new Chess('#board');

chess.createBoard();
chess.arrangeChees();