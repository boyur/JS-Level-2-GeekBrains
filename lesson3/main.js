//DZ 1
/*
 Напишите регулярное выражение для поиска HTML-цвета, заданного как #ABCDEF, то есть # и содержит затем
 6 шестнадцатеричных символов.
*/

let text = "Текст содержащий #ABCD2F цвет";
let result = text.match(/#[a-f0-9]{6}\b/gi);

console.log(result);

//DZ 2
/*
 Создайте регэксп, который ищет все положительные числа, в том числе и с десятичной точкой. Например,
 var str = "1.5 0 12. 123.4."
 */

let str = "1.5 0 12. 123.4.";
let result2 = str.match(/\d+(\.\d+)?/g);

console.log(result2);

//DZ 3
/*
 Время может быть в формате часы:минуты или часы-минуты. И часы и минуты состоят из двух цифр, например 09:00, 21-30.
 Напишите регулярное выражение для поиска времени
 */

let str2 = "Московское время 17:35, а время +1: 18-35";
let result3 = str2.match(/\d{2}(:||-)\d{2}/g);

console.log(result3);

//DZ 4
/*
 Написать регулярные выражения для следующих сущностей: номер телефона в формате +7(965)-123-45-67, email, серии и
 номера паспорта. Применить написанные регулярные выражения необходимо для валидации произвольной формы, в которой
 обязательно должны присутствовать описанные выше поля. Поля, которые проходят валидацию подсветить зеленым,
 остальные – красным.
 */

let tel = document.getElementById('tel');
let telok = document.getElementById('tel-ok');

let email = document.getElementById('email');
let emailok = document.getElementById('email-ok');

let pasport = document.getElementById('pasport');
let pasportok = document.getElementById('pasport-ok');

let validatePhone = (value) => {
  console.log(value);
  return value.search(/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}/) != -1;
};

let validateMail = (value) => {
  console.log(value);
  return value.search(/[a-z0-9]*@[a-z0-9]*\.[a-z]{2,6}/) != -1;
};

let validatePasport = (value) => {
  console.log(value);
  return value.search(/^\d{4} \d{6}/) != -1;
};

// Телефон
tel.addEventListener("keyup", function () {
  console.log(validatePhone(tel.value));

  if (validatePhone(tel.value)) {
    tel.parentNode.classList.add('has-success');
    telok.classList.add('glyphicon-ok');
  }
});

// E-mail
email.addEventListener("keyup", function () {
  console.log(validateMail(email.value));

  if (validateMail(email.value)) {
    email.parentNode.classList.add('has-success');
    emailok.classList.add('glyphicon-ok');
  }
});

// Pasport
pasport.addEventListener("keyup", function () {
  console.log(validatePasport(pasport.value));

  if (validatePasport(pasport.value)) {
    pasport.parentNode.classList.add('has-success');
    pasportok.classList.add('glyphicon-ok');
  }
});
