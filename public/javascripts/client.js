$(function(){
	
	let i=0;
	let canvas=document.getElementById('game');
	let ctx=canvas.getContext('2d');
	let socket = io();

	 function draw_chara(x_,y_,r){
	 	ctx.beginPath();
	 	ctx.arc(x_,y_,r,0,Math.PI*2,false);
	 	ctx.stroke();
	 }



	 function draw(){
	 	i++;
	 	ctx.clearRect(0,0,canvas.width,canvas.height);
	 	draw_chara(10,10+i,3);

	}

	$('#message_form').submit(function(){
		socket.emit('message',$('#input_msg').val());
		$('#input_msg').val('');
		return false;
		});
		socket.on('message',function(msg){
		$('#messages').append('<ul>'+msg+'</ul>');
	});

	setInterval(draw,100);

});