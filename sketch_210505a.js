// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let c1, c2;
let xStep = 0;
let fps = 12;

//let capturer = new CCapture({ format: 'png', framerate: fps });

function setup() {
  createCanvas(400, 400);
  frameRate(50);
  c1 = color(255, 0, 0);
  c2 = color(255,255,255);
  c3 = color(0, 0, 255);
}


function draw() {
  
  //Background;
  push();
    clear();
    translate(0,xStep);
    setGradient(0, 0, width, height, c1, c2, c3, Y_AXIS);
    setGradient(0, -height, width, height, c1, c2, c3, Y_AXIS);
    if (frameCount % 400 == 0){
        xStep = 0;
    }else{
       xStep++;  
    }
    
  pop();
  
    
  push();
  rotate(-HALF_PI)
  translate(0, 0);
  setCircle(width * -0.5, height  * 0.5, width*0.8, c3, c2, c1);
  pop();
  
  /*
  if (frameCount === 1) {
    // start the recording on the first frame
    // this avoids the code freeze which occurs if capturer.start is called
    // in the setup, since v0.9 of p5.js
    capturer.start();
  }

  if (frameCount === 400) {
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    return;
  }

  // handle saving the frame
  console.log('capturing frame');
  capturer.capture(document.getElementById('defaultCanvas0'));
  */
}

function setGradient(x, y, w, h, c1, c2, c3, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, (y + h) - ((h/2)), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (y + h) - ((h/2)) ,  y + h , 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(c);
      line(x, i, x + w, i);
      
       if ( i <= (y + h) - ((h/2))){
        stroke(c);
        line(x, i, x + w, i);
      }else{
        stroke(p);
        line(x, i, x + w, i);
      }
      
      
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function setCircle(x, y, d, c1, c2, c3) {
 let c = 100;
 //circle(x,y,d);
 
 
 for (let i=0; i<c; i++) {
   let col = lerpColor(c1, c2, (i/c)*2 );
   let col02 = lerpColor(c2, c3, ((i - (c/2))/(c/2)));
   let a = lerp(PI, 0, i/c);
   
   if ( i <= c/2){
      fill(col);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }else{
      fill(col02);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }   

 }
}
