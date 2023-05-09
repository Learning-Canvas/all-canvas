const main=document.querySelector('#main');
console.log(main)
main.width=window.innerWidth;
main.height=window.innerHeight;
let context=main.getContext('2d');
context.fillStyle='rgb(0,100,20)';
context.fillRect(100,100,200,200);
context.fillStyle='rgb(255,100,20)';

context.fillRect(400,200,200,200);
context.fillStyle='rgb(0,234,200)';
context.fillRect(100,400,200,200);
context.beginPath();
context.moveTo(10, 200);

context.lineTo(300, 100);

context.strokeStyle='pink';
context.stroke();
context.beginPath();
context.arc(100, 100, 80, 0, Math.PI  * 2, false);
context.strokeStyle='blue';

context.stroke();

