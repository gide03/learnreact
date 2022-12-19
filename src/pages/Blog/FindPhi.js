let num_of_greens = 0;
let num_of_reds = 0;
let num_of_points = 0;

const FindPhi_1 = (sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(400, 400);
    sketch.background(0);
  };

  sketch.draw = () => {
    sketch.noFill();
    sketch.stroke(0, 200, 200);
    // circle(200,200,width);
    sketch.circle(0, 0, sketch.width * 2);

    sketch.fill(0);
    sketch.stroke(200, 200, 0);
    sketch.rect(8, sketch.height - 50, 264, 35);
    sketch.noStroke();
    sketch.fill(255);
    sketch.textSize(16);
    num_of_points++;
    sketch.text(
      `Estimate phi: ${(4 * num_of_greens) / num_of_points}`,
      12,
      sketch.height - 25
    );

    let _x = Math.floor(Math.random() * sketch.width);
    let _y = Math.floor(Math.random() * sketch.height);
    sketch.noStroke();

    //   MODEL #1
    //   let _z = Math.sqrt((width/2-_x)**2+(height/2-_y)**2);
    //   if(_z <= width/2){
    //     fill(0,255,0);
    //     num_of_greens++;
    //   }else{
    //     fill(255,0,0);
    //     num_of_reds++;
    //   }

    //   MODEL #2
    let _z = Math.sqrt(_x ** 2 + _y ** 2);
    if (_z <= sketch.width) {
      sketch.fill(0, 255, 0);
      num_of_greens++;
    } else {
      sketch.fill(255, 0, 0);
      num_of_reds++;
    }
    sketch.circle(_x, _y, 5);
  };
};
