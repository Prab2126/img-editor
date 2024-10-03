
//selection of all the elements
let inputRange=document.querySelector("#range");
let label1=document.querySelector(".range1");
let changeSpan=document.querySelector(".firstSpan");
let firstRange=document.querySelector(".range1");
let brightness=document.querySelector(".brightness");
let contrast=document.querySelector(".contrast");
let grayscale=document.querySelector(".grayscale");
let hueRotate=document.querySelector(".hue-rotate");
let saturate=document.querySelector(".saturate");
let opacity=document.querySelector(".opacity");
let blurs=document.querySelector(".blur");
let imgPreview=document.querySelector(".preview img");

let leftRotate=document.querySelector(".left-rotate");
let rightRotate=document.querySelector(".right-rotate");
let xMirror=document.querySelector(".x-mirror");
let yMirror=document.querySelector(".y-mirror");
let resetButton=document.querySelector("#reset");
let chooseButton=document.querySelector("#choose");
let saveButton=document.querySelector("#save");
let save_a=document.querySelector("#download-button");
let fileChoose=document.querySelector("#select-img");




// All filters

function allFilterLogic(){

  let conditionCheck=null;

  function filterBaap(value,defalutValue,maxValue = 100){
    inputRange.max=maxValue;
    conditionCheck=value;
    inputRange.value=defalutValue;
    inputRange.disabled=false;
  }
  
  brightness.addEventListener("click",()=>{filterBaap("brightness",100,200)});
  contrast.addEventListener("click",()=>{filterBaap("contrast",100,200)});
  grayscale.addEventListener("click",()=>{filterBaap('grayscale',0)});
  hueRotate.addEventListener("click",()=>{filterBaap("hueRotate",0,360)});
  saturate.addEventListener("click",()=>{filterBaap("saturate",50,200)});
  opacity.addEventListener("click",()=>{filterBaap("opacity",1,1)});
  blurs.addEventListener("click",()=>{filterBaap("blurs",0)});
  
  let inputvalueBrightness=100;
  let inputvalueContrast= 100;
  let inputvalueGrayscale= 0;
  let inputvaluehueRotate= 0;
  let inputvalueSaturate= 100;
  let inputvalueOpacity= 1;
  let inputvalueBlurs= 0;
  
  function combo(){
    imgPreview.style.filter=`brightness(${inputvalueBrightness}%) contrast(${inputvalueContrast}%) grayscale(${inputvalueGrayscale}%) hue-rotate(${inputvaluehueRotate}deg) saturate(${inputvalueSaturate}%) opacity(${inputvalueOpacity}) blur(${inputvalueBlurs}px)`;
  }
  inputRange.addEventListener("input", () => {
  let inputvalue = inputRange.value;
  
    if (conditionCheck == "brightness") {
   inputvalueBrightness = inputvalue;
      label1.innerHTML = "brightness";
      changeSpan.innerHTML = inputvalueBrightness + "%";
    }
    else if (conditionCheck == "contrast") {
       inputvalueContrast = inputvalue;
      label1.innerHTML = "contrast";
      changeSpan.innerHTML = inputvalueContrast + "%";
    }
    else if (conditionCheck == "grayscale") {
       inputvalueGrayscale = inputvalue;
      label1.innerHTML = "grayscale";
      changeSpan.innerHTML = inputvalueGrayscale + "%";
    }
    else if (conditionCheck == "hueRotate") {
       inputvaluehueRotate = inputvalue;
      label1.innerHTML = "hue-rotate";
      changeSpan.innerHTML = inputvaluehueRotate + "deg";
    }
    else if (conditionCheck == "saturate") {
       inputvalueSaturate = inputvalue;
      label1.innerHTML = "saturate";
      changeSpan.innerHTML = inputvalueSaturate + "%";
    }
    else if (conditionCheck == "opacity") {
       inputvalueOpacity = inputvalue;
      label1.innerHTML = "opacity";
      changeSpan.innerHTML = inputvalueOpacity;
      inputRange.min = 0.1;
      inputRange.step=0.1;
    }
    else if (conditionCheck == "blurs") {
      inputvalueBlurs = inputvalue;
      label1.innerHTML = "blur";
      changeSpan.innerHTML = inputvalueBlurs + "px";
    }
    combo();
  });
}
//flip button and mirror button

let normal=0;
let adding=90;
leftRotate.addEventListener("click",()=>{
    normal-=adding;
    imgPreview.style.rotate=normal+"deg";
});
rightRotate.addEventListener("click",()=>{
    normal+=adding;
    imgPreview.style.rotate=normal+"deg";
});

let mirror=0;
let mirrorAdding=180;
xMirror.addEventListener("click",()=>{
    mirror-=mirrorAdding;
    imgPreview.style.transform=`rotateY(${mirror}deg)`;
});
yMirror.addEventListener("click",()=>{
    mirror+=mirrorAdding;
    imgPreview.style.transform=`rotateX(${mirror}deg)`;
});





resetButton.addEventListener("click",()=>{
 removeStyle();
})

//choose img


fileChoose.addEventListener("input",()=>{
  fileChoose.style.opacity=0;
  allFilterLogic();
    let file=fileChoose.files[0];
  let url=URL.createObjectURL(file);
  imgPreview.setAttribute("src",`${url}`);
 removeStyle();
  
})
saveButton.addEventListener("click", () => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = imgPreview.naturalWidth;
  canvas.height = imgPreview.naturalHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(canvas.width / 2, canvas.height / 2);

  const rotationAngle = parseFloat(imgPreview.style.rotate) || 0;
  ctx.rotate(rotationAngle * Math.PI / 180);

  const transform = imgPreview.style.transform;
  const mirrorX = transform.includes('rotateX(180deg)');
  const mirrorY = transform.includes('rotateY(180deg)');

  if (mirrorX) {
      ctx.scale(1, -1);
  }
  if (mirrorY) {
      ctx.scale(-1, 1);
  }

  const filters = window.getComputedStyle(imgPreview).filter;
  ctx.filter = filters;

  ctx.drawImage(imgPreview, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

  let imgUrl = canvas.toDataURL("image/jpg");
  save_a.setAttribute("href", `${imgUrl}`);
  let num = Math.trunc(Math.random() * 10000);
  save_a.setAttribute("download", `PK_(:-) ${num}`);
});

//button logic

function removeStyle(){
  imgPreview.style.filter=`brightness(100%) contrast(100%) grayscale(0%) hue-rotate(0deg) saturate(100%) opacity(1) blur(0px)`;
  imgPreview.style.transform=`rotateX(0deg) rotateY(0deg)`;
  imgPreview.style.rotate="0deg";
  mirror=0;
  normal=0;
  inputRange.disabled=true;
}