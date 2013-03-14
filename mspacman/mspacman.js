function draw() {
	       canvas = document.getElementById('gameboard');
		if (canvas.getContext) {
				ctx = canvas.getContext('2d');
		img = new Image();
		img.src = '../frogger/assets/frogger_sprites.png';
		//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
//ctx.drawImage(img,100,100);
				ctx.drawImage(img,0,0,200,200,0,0,200,200);
	}
	else {
		alert('Sorry, canvas is not supported on your browser!');
	}
}