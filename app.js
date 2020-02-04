//canvas는 canvas 안에 있는 pixel을 다룸
const canvas = document.getElementById("jsCanvas");
//canvas안의 context는 pixel을 control함에 있음 여기서는 2d
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clear = document.getElementById("clear_canvas")

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 550;
//canvas가 다루는 pixel의 크기 css 와 동일하게 주면 좋음
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//그릴 선들이(context안에 있는 선)strokestyle의 색을 갖는다
//default 색은 블랙
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 1.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}
//클릭하지 않고 mouse를 움직였을 때 path를 시작
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) { //path 는 선!
        console.log("creating path in ", x, y);
        //path를 만들면 마우스의 x, y의 좌표로 path를 이동
        //mouse를 움직일때 path를 생성
        //path의 시작점은 mouse가 있는 곳
        //mouse를 움직이는 동안 계속 발생
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else { //click을 하게 되면 line을 그린다
        console.log("creating line in ", x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; //default색을 override 함
    ctx.fillStyle = color;
}

function handleRangeChange() {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
//mouse 우클릭 방지
function handleCM(event) {
    event.preventDefault();
}
//canvas의 data를 image로 얻는다
function handleSaveClick() {
    //기본은 png, jpeg로 변경 -> toDataURL("image/jpeg")
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image; //href = canvas.toDataURL();
    link.download = "PaintJS[🎨]"; //download = 이름지정
    link.click();
}

function canvasClear() {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.strokeStyle = INITIAL_COLOR;
    range.value = 2.5;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
//array constructor로부터 array.from method를 호출 -> object로부터 array를 만듦
//array안에서 forEach로 color를 돌려 addEventListener를 호출
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) { //range 이벤트는 input에 반응
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if (clear) {
    clear.addEventListener("click", canvasClear);
}