// Initialize game parameters
function initialize()
{
	start_x = 185;
	start_y = 490;
	num_lives = 3;
	game_over = false;
	time = 0;
	log_row1 = 120;
	log_row2 = 160;
	log_row3 = 200;
	log_row4 = 240;
	vehicle_row1 = 320;
	vehicle_row2 = 350;
	log_speed = 5;
	vehicle_speed = 3;
	score = 0;
	level = 1;
	highscore = 0;
}

//draw game canvas
function start_game()
{
	initialize();
	
	canvas = document.getElementById('game');
	// Check if canvas is supported on browser
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
	    ctx.fillStyle = '#191970';
	    ctx.fillRect (0, 0, 399, 283);
	    ctx.fillStyle = '#000000';
	    ctx.fillRect (0, 283, 399, 283);
		ctx.fillStyle = '#FFFFFF';
		img = new Image();
		img.src = 'assets/frogger_sprites.png';
		ctx.drawImage(img,0,0,398,115,0,0,398,115); //title
		ctx.drawImage(img,0,162,199,30,0,log_row1,199,30); //long log
		ctx.drawImage(img,0,226,96,30,350,log_row1,96,30); //short log
		ctx.drawImage(img,0,194,132,30,130,log_row2,132,30); //med log
		ctx.drawImage(img,0,226,96,30,-70,log_row3,96,30); //short log
		ctx.drawImage(img,0,194,132,30,200,log_row3,132,30); //med log
		ctx.drawImage(img,0,162,199,30,70,log_row4,199,30); //long log
		ctx.drawImage(img,0,114,398,40,0,275,398,40); //purple strip
		ctx.drawImage(img,100,300,60,30,180,vehicle_row1,60,30); //white truck
		ctx.drawImage(img,43,261,30,30,60,vehicle_row2,30,30); //white car
		ctx.drawImage(img,0,114,398,40,0,480,398,40); //purple strip
		ctx.drawImage(img,8,365,30,30,start_x,start_y,30,30); //frogger
		for(i = 0; i < num_lives; i++)
		{
			ctx.drawImage(img,9,332,25,25,15*i,523,18,18); //frogger lives
		}
		ctx.fillStyle = '#00FF00';
		ctx.font="20px Arial Bold";
		ctx.fillText("LEVEL " + level,55,540);
		ctx.font="12px Arial Bold";
		ctx.fillText("Score: " + score,2,560);
		ctx.font="12px Arial Bold";
		ctx.fillText("Highscore: " + highscore,85,560);
		}
	else {
		alert('Sorry, canvas is not supported on your browser!');
	}
}
