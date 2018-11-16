$(function(){

	let i=0;
	let canvas=document.getElementById('game');
	let ctx=canvas.getContext('2d');
	let socket = io();
	let players=[];
 	let you={
	    x:0,
	    y:0
  };

	socket.on("initialize",function(players_){
		players=players_;
		for(key in players){
			if(socket.id==key){
				you=players[key];
			}
		}
	});
	socket.on("update",function(players_){
		players=players_;
	});

	 function draw_chara(x_,y_,r){
	 	ctx.beginPath();
	 	ctx.arc(x_,y_,r,0,Math.PI*2,false);
	 	ctx.stroke();
	 }

	 function draw(){
	 	ctx.clearRect(0,0,canvas.width,canvas.height);
	 	draw_chara(you.x,you.y,20);
	 	for(key in players){
	 		if(key!=socket.id){
	 			draw_chara(players[key].x,players[key].y,20);
	 		}
	 	}
	 	update_s();

	}
	function update_s(){
		socket.emit('update',you);
	}

	$('#message_form').submit(function(){
		socket.emit('message',$('#input_msg').val());
		$('#input_msg').val('');
		return false;
		});
		socket.on('message',function(msg){
		$('#messages').append('<ul>'+msg+'</ul>');
	});
	$('html').keydown(function(e){
		if(e.key=="ArrowDown"){
			you.y+=3;
		}
		if(e.key=="ArrowUp"){
			you.y-=3;
		}
		if(e.key=="ArrowLeft"){
			you.x-=3;
		}
		if(e.key=="ArrowRight"){
			you.x+=3;
		}
	})
	setInterval(draw,10);


});