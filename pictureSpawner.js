var imgCount = 0,
active = 0,
tailLong = 10,
code;

$(document).ready(function(){

	staticColor = [($('.red').val()), ($('.green').val()), ($('.blue').val())];

	$('.tailLong').on("input", function(){
		tailLong = $(".tailLong").val();
	});

	$('.colorChoose').on("input", function(){
		staticColor = [($('.red').val()), ($('.green').val()), ($('.blue').val())];
	});

	$('.clear_button').click(function(){
		$('.area').html(" ");
		imgCount = 0;
	});
	$('.area').mousedown(function(e){
		X = e.clientX;
		Y = e.clientY;
		setTimeout(function(){//setInterval for endless spawn
		$('.coordx').text("position by X: "+Math.round((X-($('.area').offset().left)))+"px");
		$('.coordy').text("position by Y: "+Math.round((Y-($('.area').offset().top)))+"px");

		$('.area').append('<div class="spawned"></div>');
		$('.area').children().eq(imgCount).css("top",  Y-($('.area').offset().top)-($('.spawned').height()/1.7));
		$('.area').children().eq(imgCount).css("left", X-($('.area').offset().left)-($('.spawned').width()/1.7));
		if($('.randomColor:checked').val() == "on"){
			$('.area').children().eq(imgCount).css("backgroundColor", "rgba(" + Math.random()*255 + ", " + Math.random()*255 + ", " + Math.random()*255 + ", 1)");
		}
		else
			$('.area').children().eq(imgCount).css("backgroundColor", "rgba("+staticColor[0]+", "+staticColor[1]+", "+staticColor[2]+")");
		$('.area').children().eq(imgCount).css("transform", "scale(" + Math.random()*20.5 + ")"+" rotate("+Math.random()*360+"deg)");

		let color = ($('.area').children().eq(imgCount).css("backgroundColor"));
		setTimeout(function(){
			$('.color').text(color);
			$('.color').css("backgroundColor", color);
		}, 50);
		imgCount++;
}, 1)

	});

	$(window).keydown(function(e){
		code = e.keyCode;
		if(code === 16 && active == 0){
			active = 1;
			$('.tracer_mode').text('tracer mode: enabled ');
			$('.area').css("cursor", "none");
			$('.area').mousemove(function(e){
				if(active == 1){
					let X = e.clientX,
					Y = e.clientY;

					$('.coordx').text("position by X: "+Math.round((X-($('.area').offset().left)))+"px");
					$('.coordy').text("position by Y: "+Math.round((Y-($('.area').offset().top)))+"px");


					$('.area').append('<div class="spawned"></div>');
					$('.area').children().eq(imgCount).css("top",  Y-($('.area').offset().top)-($('.spawned').height()/1.7));
					$('.area').children().eq(imgCount).css("left", X-($('.area').offset().left)-($('.spawned').width()/1.7));
					
					if($('.randomColor:checked').val() == "on"){
						$('.area').children().eq(imgCount).css("backgroundColor", "rgba(" + Math.random()*255 + ", " + Math.random()*255 + ", " + Math.random()*255 + ", 1)");
					}
					else{
						$('.area').children().eq(imgCount).css("backgroundColor", "rgba("+staticColor[0]+", "+staticColor[1]+", "+staticColor[2]+")");
					}
					$('.area').children().eq(imgCount).css("transform", "scale(" + Math.random()*2.5 + ")");

					if($('.endless:checked').val() == "on"){
						$('.area').children().eq(imgCount-tailLong).css("transform", "scale(0)");

					}
					let color = ($('.area').children().eq(imgCount).css("backgroundColor"));
					$('.color').text(color);
					$('.color').css("backgroundColor", color);
					imgCount++;

					console.log("\n\nx-pos: "+X+"\n y-pos: "+Y);
				}
			});
		}
		else if(code === 16 && active == 1){
			active = 0;
			$('.tracer_mode').text('tracer mode: disabled ');
			$('.area').css("cursor", "pointer");

		}

		else if(active_marker == 0){
			console.log("can't be played");
		}
	});

});
