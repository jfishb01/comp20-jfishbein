var ctx;
var img;
var dead_img;

// Initialize game parameters
function initialize()
{
	num_lives = 5;
  frogs_home = 0;
	game_over = false;
	time = 0;
	score = 0;
  level = 1;
	highscore = 0;
  short_log_len = 85;
  med_log_len = 117;
  long_log_len = 178;
  log_height = 25;
  truck_size = 46;
  car_size = 30;
  vehicle_height = 25;
  log_row1 = 110;
  log_row2 = 140;
  log_row3 = 170;
  log_row4 = 200;
  log_row5 = 230;
  log_row6 = 260;
  car_row1 = 330;
  car_row2 = 360;  
  car_row3 = 390;  
  car_row4 = 420;  
  car_row5 = 450;  
  jump_distance_y = 32;
  jump_distance_x = 15;
  frogger_x = 185;
  frogger_y = 490;
  frogger_w = 30;
  frogger_h = 17;
  alive = true;
  speeds = new Array()
  speeds[0] = 1;
  speeds[1] = 3;
  speeds[2] = -2;
  speeds[3] = 2;
  speeds[4] = -1;
  speeds[5] = 3;
  speeds[6] = 4;
  speeds[7] = -2;
  speeds[8] = -4;
  speeds[9] = 3;
  speeds[10] = -3;
  
  logs = new Array();
  logs[0] = {sx: 6, sy: 162, w: long_log_len, h: log_height, dx: 0, dy: log_row1, speed: speeds[0]};
  logs[1] = {sx: 6, sy: 226, w: short_log_len, h: log_height,dx: 350, dy: log_row1, speed: speeds[0]};
  logs[2] = {sx: 6, sy: 194, w: med_log_len, h: log_height,dx: 130, dy: log_row2, speed: speeds[1]};
  logs[3] = {sx: 6, sy: 229, w: short_log_len, h: log_height,dx: 390, dy: log_row2, speed: speeds[1]};
  logs[4] = {sx: 6, sy: 226, w: short_log_len, h: log_height,dx: -70, dy: log_row3, speed: speeds[2]};
  logs[5] = {sx: 6, sy: 194, w: med_log_len, h: log_height,dx: 200, dy: log_row3, speed: speeds[2]};
  logs[6] = {sx: 6, sy: 162, w: long_log_len, h: log_height,dx: 70, dy: log_row4, speed: speeds[3]};
  logs[7] = {sx: 6, sy: 194, w: med_log_len, h: log_height,dx: 320, dy: log_row4, speed: speeds[3]};
  logs[8] = {sx: 6, sy: 226, w: short_log_len, h: log_height,dx: 10, dy: log_row5, speed: speeds[4]};
  logs[9] = {sx: 6, sy: 194, w: med_log_len, h: log_height,dx: 280, dy: log_row5, speed: speeds[4]};
  logs[10] = {sx: 6, sy: 162, w: long_log_len, h: log_height,dx: 20, dy: log_row6, speed: speeds[5]};
  logs[11] = {sx: 6, sy: 194, w: med_log_len, h: log_height,dx: 350, dy: log_row6, speed: speeds[5]};

  cars = new Array();
  cars[0] = {sx: 106, sy: 302, w: truck_size, h: vehicle_height, dx: 40, dy: car_row1, speed: speeds[6]};
  cars[1] = {sx: 106, sy: 302, w: truck_size, h: vehicle_height, dx: 200, dy: car_row1, speed: speeds[6]};
  cars[2] = {sx: 106, sy: 302, w: truck_size, h: vehicle_height, dx: 360, dy: car_row1, speed: speeds[6]};
  cars[3] = {sx: 46, sy: 263, w: car_size, h: vehicle_height, dx: -50, dy: car_row2, speed: speeds[7]};
  cars[4] = {sx: 46, sy: 263, w: car_size, h: vehicle_height, dx: 70, dy: car_row2, speed: speeds[7]};
  cars[5] = {sx: 46, sy: 263, w: car_size, h: vehicle_height, dx: 190, dy: car_row2, speed: speeds[7]};
  cars[6] = {sx: 46, sy: 263, w: car_size, h: vehicle_height, dx: 310, dy: car_row2, speed: speeds[7]};
  cars[7] = {sx: 10, sy: 263, w: car_size, h: vehicle_height, dx: -30, dy: car_row3, speed: speeds[8]};
  cars[8] = {sx: 10, sy: 263, w: car_size, h: vehicle_height, dx: 90, dy: car_row3, speed: speeds[8]};
  cars[9] = {sx: 10, sy: 263, w: car_size, h: vehicle_height, dx: 210, dy: car_row3, speed: speeds[8]};
  cars[10] = {sx: 10, sy: 263, w: car_size, h: vehicle_height, dx: 330, dy: car_row3, speed: speeds[8]};
  cars[11] = {sx: 80, sy: 263, w: car_size, h: vehicle_height, dx: -70, dy: car_row4, speed: speeds[9]};
  cars[12] = {sx: 80, sy: 263, w: car_size, h: vehicle_height, dx: 50, dy: car_row4, speed: speeds[9]};
  cars[13] = {sx: 80, sy: 263, w: car_size, h: vehicle_height, dx: 170, dy: car_row4, speed: speeds[9]}; 
  cars[14] = {sx: 80, sy: 263, w: car_size, h: vehicle_height, dx: 290, dy: car_row4, speed: speeds[9]};
  cars[15] = {sx: 10, sy: 301, w: car_size, h: vehicle_height, dx: -30, dy: car_row5, speed: speeds[10]};
  cars[16] = {sx: 10, sy: 301, w: car_size, h: vehicle_height, dx: 90, dy: car_row5, speed: speeds[10]};
  cars[17] = {sx: 10, sy: 301, w: car_size, h: vehicle_height, dx: 210, dy: car_row5, speed: speeds[10]};
  cars[18] = {sx: 10, sy: 301, w: car_size, h: vehicle_height, dx: 330, dy: car_row5, speed: speeds[10]};
}

function startTimer()
{
  myTimer = setInterval(function() {drawBoard()}, 100);
}

document.addEventListener("keydown", function(event) {
  //left arrow key
  if (event.keyCode == 37) 
  {
    document.getElementById("move").play();
    frogger_x -= jump_distance_x;
  }
  //up arrow key
  if (event.keyCode == 38) 
  {  
    document.getElementById("move").play();
    frogger_y -= jump_distance_y;
    score += 10;
  }
  //right arrow key
  if (event.keyCode == 39) 
  {
    document.getElementById("move").play();
    frogger_x += jump_distance_x;
  }
  //down arrow key
  if (event.keyCode == 40) 
  {
    if(frogger_y < 490)
    {
      document.getElementById("move").play();
      frogger_y += jump_distance_y;
    }
  }
  drawBoard();
});

//draw game canvas
function start_game()
{
	initialize();

	canvas = document.getElementById('game');
	// Check if canvas is supported on browser
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
    img = new Image();
    dead_img = new Image();
    img.src = 'assets/frogger_sprites.png';
    dead_img.src = 'assets/dead_frog.png';
    startTimer();
  }
	else {
		alert('Sorry, canvas is not supported on your browser!');
	}
}

function drawBoard()
{
  ctx.clearRect(0, 120, 400, 155);
  ctx.fillStyle = '#191970';
  ctx.fillRect (0, 0, 399, 290);
  ctx.fillStyle = '#000000';
  ctx.fillRect (0, 290, 399, 276);
  ctx.fillStyle = '#FFFFFF';
  ctx.drawImage(img,0,0,398,115,0,0,398,115); //title

  fRight = frogger_x+frogger_w;
  fLeft = frogger_x;
  fBottom = frogger_y+frogger_h;
  fTop = frogger_y;
  var drowned = false;
  if(fBottom < 285 && fBottom > 115)
  {
    drowned = true;
  }
     
  for(var i in logs)
  {
    logs[i].dx -= logs[i].speed;
    if(logs[i].dx < -200) {
      logs[i].dx = 400;
    }
    if(logs[i].dx > 400) {
      logs[i].dx = -200;
    }

    lRight = logs[i].dx+logs[i].w;
    lLeft = logs[i].dx;
    lBottom = logs[i].dy+log_height;
    lTop = logs[i].dy;

    if(fBottom < 285 && fBottom > 115)
    {
      if((fLeft > lLeft && fLeft < lRight) || (fRight > lLeft && fRight < lRight))
      {
        if((fBottom < lBottom && fBottom > lTop) || (fTop < lBottom && fTop > lTop))
        {
          frogger_x -= logs[i].speed;
          drowned = false
        }
      }
    }
    ctx.drawImage(img,logs[i].sx,logs[i].sy,logs[i].w,logs[i].h,logs[i].dx,logs[i].dy,logs[i].w,logs[i].h);
  }
  ctx.drawImage(img,0,114,398,40,0,285,399,40); //purple strip
  for(var i in cars)
  {
    cars[i].dx -= cars[i].speed;
    if(cars[i].dx < -80) {
      cars[i].dx = 400;
    }
    if(cars[i].dx > 400) {
      cars[i].dx = -80;
    }
    
    cRight = cars[i].dx+cars[i].w;
    cLeft = cars[i].dx;
    cBottom = cars[i].dy+vehicle_height;
    cTop = cars[i].dy;
    
    if((fLeft > cLeft && fLeft < cRight) || (fRight > cLeft && fRight < cRight))
    {
      if((fBottom < cBottom && fBottom > cTop) || (fTop < cBottom && fTop > cTop))
      {
          alive = false;
      }
    }
    ctx.drawImage(img,cars[i].sx,cars[i].sy,cars[i].w,cars[i].h,cars[i].dx,cars[i].dy,cars[i].w,cars[i].h);
  }
	ctx.drawImage(img,0,114,398,40,0,480,399,40); //purple strip
  if(fLeft < -5 || fRight > 405)
  {
    alive = false;
  }
  if(alive && !drowned)
  {
    ctx.drawImage(img,13,368,30,17,frogger_x,frogger_y,30,17); //frogger
	}
  else
  {
    ctx.drawImage(dead_img,3,2,23,27,frogger_x,frogger_y,23,27); //frogger
    frogger_death();
  }
  for(i = 0; i < num_lives; i++)
	{
		ctx.drawImage(img,9,332,25,25,15*i,523,18,18); //frogger lives
	}
  if(fBottom < 115)
  {
    frog_home();
  }
	ctx.fillStyle = '#00FF00';
	ctx.font="18px Arial Bold";
	ctx.fillText("Score: " + score,2,560);
  ctx.fillStyle = '#00FF00';
	ctx.font="20px Arial Bold";
	ctx.fillText("Level: " + level,160,550);
}

function frogger_death()
{
  document.getElementById("death").play();
  num_lives -= 1;
  if(num_lives < 0)
  {
    setTimeout(function(){  
      window.alert("Game Over!");
       initialize();
    }, 200);    
  }
  alive = true;
  frogger_x = 185;
  frogger_y = 490;
  clearInterval(myTimer);
  setTimeout(function(){  startTimer()}, 200);
}

function frog_home()
{
  frogs_home += 1;
  if((frogs_home % 5) == 0)
  {
    score += 1000;
    level += 1;
    for(var i in speeds)
    {
      if(speeds[i] > 0)
      {
        speeds[i] += 1;
      }
      else
      {
        speeds[i] -= 1;
      }
    }
  }
  else
  {
    score += 50;
  }
  if(score > 10000 && num_lives < 4)
  {
      num_lives += 1;
  }
  frogger_x = 185;
  frogger_y = 490;
  clearInterval(myTimer);
  setTimeout(function(){  startTimer()}, 200);
}


