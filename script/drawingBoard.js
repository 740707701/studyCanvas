
//画板
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

//蒙版
var canvas_bak = document.getElementById("canvas_bak");
var ctx_bak = canvas_bak.getContext("2d");

var canvasTop = $(canvas).offset().top;
var canvasLeft = $(canvas).offset().left;

var size = 1;
var color = '#000000';



//撤销的数组
var cancelList = new Array();
//撤销的次数
var cancelIndex = 0;


var draw = function(type,obj){
	//把蒙版放于画板之上
	$("#canvas_bak").css("z-index",1);
	//先画在蒙版上在复制到画板上
	chooseImg(obj);

	var startX;
	var startY;

	var canDraw = false;

	//鼠标按下获取 开始画图
	var mousedown = function(e){
		ctx.strokeStyle = color;
		ctx_bak.strokeStyle = color;
		ctx_bak.lineWidth = size;
		e = e || window.event;
		startX = e.clientX - canvasLeft;
		startY = e.clientY - canvasTop;
		ctx_bak.moveTo(startX,startY);
		canDraw = true;

		if(type == 'pencil'){
			ctx_bak.beginPath();
		}else if(type =='circle'){
			ctx.beginPath();
			ctx.moveTo(startX,startY);
			ctx.lineTo(startX+2,startY+2);
			ctx.stroke();
		}else if(type == 'rubber'){
			ctx.clearRect(startX - size * 10,startY - size * 10,size * 20,size * 20);
		}

	};
	
	//鼠标离开 把蒙版canvas的图片生成到canvas中
	var mouseup = function(e){
		e || window.event;
		canDraw = false;
		var image = new Image();
		if(type != 'rubber'){
			image.src = canvas_bak.toDataURL();
			image.onload = function(){
				ctx.drawImage(image,0,0,image.width,image.height,0,0,canvasWidth,canvasHeight);
				clearContext();
				saveImageToAry();
			}
			var x = e.clientX - canvasLeft;
			var y = e.clientY - canvasTop;
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(x+2,y+2);
			ctx.stroke();
		}
	};

	//鼠标移动
	var mousemove = function(e){
		e = e || window.event;
		var x = e.clientX - canvasLeft;
		var y = e.clientY - canvasTop;
		//方块 4条直线
		if(type == 'square'){
			if(canDraw){
				ctx_bak.beginPath();
				clearContext();
				ctx_bak.moveTo(startX , startY);						
				ctx_bak.lineTo(x  ,startY );
				ctx_bak.lineTo(x  ,y );
				ctx_bak.lineTo(startX  ,y );
				ctx_bak.lineTo(startX  ,startY );
				ctx_bak.stroke();
			}
		//直线
		}else if(type =='line'){						
			if(canDraw){
				ctx_bak.beginPath();
				clearContext();
				ctx_bak.moveTo(startX , startY);
				ctx_bak.lineTo(x  ,y );
				ctx_bak.stroke();
			}
		//画笔
		}else if(type == 'pencil'){
			if(canDraw){
				ctx_bak.lineTo(e.clientX   - canvasLeft ,e.clientY  - canvasTop);
				ctx_bak.stroke();						
			}
		//圆 未画得时候 出现一个小圆
		}else if(type == 'circle'){						
			clearContext();
			if(canDraw){
				ctx_bak.beginPath();			
				var radii = Math.sqrt((startX - x) *  (startX - x)  + (startY - y) * (startY - y));
				ctx_bak.arc(startX,startY,radii,0,Math.PI * 2,false);									
				ctx_bak.stroke();
			}else{	
				ctx_bak.beginPath();					
				ctx_bak.arc(x,y,20,0,Math.PI * 2,false);
				ctx_bak.stroke();
			}
		//涂鸦 未画得时候 出现一个小圆
		}else if(type == 'handwriting'){											
			if(canDraw){
				ctx_bak.beginPath();	
				ctx_bak.strokeStyle = color;
				ctx_bak.fillStyle  = color;
				ctx_bak.arc(x,y,size*10,0,Math.PI * 2,false);		
				ctx_bak.fill();
				ctx_bak.stroke();
				ctx_bak.restore();
			}else{	
				clearContext();
				ctx_bak.beginPath();					
				ctx_bak.fillStyle  = color;
				ctx_bak.arc(x,y,size*10,0,Math.PI * 2,false);
				ctx_bak.fill();
				ctx_bak.stroke();
			}
		//橡皮擦 不管有没有在画都出现小方块 按下鼠标 开始清空区域
		}else if(type == 'rubber'){	
			ctx_bak.lineWidth = 1;
			clearContext();
			ctx_bak.beginPath();			
			ctx_bak.strokeStyle =  '#000000';						
			ctx_bak.moveTo(x - size * 10 ,  y - size * 10 );						
			ctx_bak.lineTo(x + size * 10  , y - size * 10 );
			ctx_bak.lineTo(x + size * 10  , y + size * 10 );
			ctx_bak.lineTo(x - size * 10  , y + size * 10 );
			ctx_bak.lineTo(x - size * 10  , y - size * 10 );	
			ctx_bak.stroke();		
			if(canDraw){							
				ctx.clearRect(x - size * 10 ,  y - size * 10 , size * 20 , size * 20);
										
			}			
		}
		
	};
	/*var mousemove = function(e){
		e = e || window.event;
		var x = e.clientX - canvasLeft;
		var y = e.clientY - canvasTop;
		//方块
		if(type == "square"){
			if(canDraw){
				ctx_bak.beginPath();
				clearContext();
				ctx_bak.moveTo(startX,startY);
				ctx_bak.lineTo(x,startY);
				ctx_bak.lineTo(x,y);
				ctx_bak.lineTo(startX,y);
				ctx_bak.lineTo(startX,startY);
				ctx_bak.stroke();
			}
		}else if(type == "line"){
			if(canDraw){
				ctx_bak.beginPath();
				clearContext();
				ctx_bak.moveTo(startX,startY);
				ctx_bak.lineTo(x,y);
				ctx_bak.stroke();
			}
		}else if(type == "pencil"){
			if(canDraw){
				ctx_bak.lineTo(e.clientX - canvasLeft, e.clientY - canvasTop);
				ctx_bak.stroke();
			}
		}else if(type == "circle"){
			if(canDraw){
				clearContext();
				if(canDraw){
					ctx_bak.beginPath();
					var radii = Math.sqrt(( startX - x)*(startX-x)+(startY - y)*(startY - y));
					ctx_bak.arc(startX,startY,radii,0,Math.PI*2,false);
					ctx_bak.stroke();
				}else{
					ctx_bak.beginPath();
					ctx_bak.arc(x,y,20,0,Math.PI,2,false);
					ctx_bak.stroke();
				}
			}
		}else if(type == "handwriting"){
			if(canDraw){
				ctx_bak.beginPath();
				ctx_bak.strokeStyle = color;
				ctx_bak.fillStyle = color;
				ctx_bak.arc(x,y,size*5,0,Math.PI*2,false);
				ctx_bak.fill();
				ctx_bak.stroke();
				ctx_bak.restore();
			}
		}else if(type == "rubber"){
			ctx_bak.lineWidth = 1;
			clearContext();
			ctx_bak.beginPath();
			ctx_bak.strokeStyle = '#000000';
			//绘制橡皮形状
			ctx_bak.moveTo(x - size * 10 , y - size * 10);
			ctx_bak.lineTo(x + size * 10 , y - size * 10);
			ctx_bak.lineTo(x + size * 10 , y + size * 10);
			ctx_bak.lineTo(x - size * 10 , y + size * 10);
			ctx_bak.lineTo(x - size * 10 , y - size * 10);
			ctx_bak.stroke();
			if(canDraw){
				ctx.clearRect(x - size * 10 , y - size *10 , size * 20 , size * 20);
			}
		}
	};*/

	//鼠标离开区域以外 除了涂鸦 都清空
	var mouseout = function(){
		if(type != 'handwriting'){
			clearContext();
		}
	};

	$(canvas_bak).unbind();
	$(canvas_bak).bind('mousedown',mousedown);
	$(canvas_bak).bind('mouseup',mouseup);
	$(canvas_bak).bind('mousemove',mousemove);
	$(canvas_bak).bind('mouseout',mouseout);

	//选择功能性按钮
	function chooseImg(obj){
		var imgAry = $("#drawController img");
		for(var i = 0;i<imgAry.length;i++){
			$(imgAry[i]).removeClass('border_choose');
			$(imgAry[i]).addClass('border_nochoose');
		}
		$(obj).removeClass('border_nochoose');
		$(obj).addClass('border_choose');
	};
};

//保存历史 用于撤销
var saveImageToAry= function(){
	cancelIndex = 0;
	var dataUrl = canvas.toDataURL();
	cancelList.push(dataUrl);
};

//  清空层
var clearContext = function(type){
	if(!type){
		ctx_bak.clearRect(0,0,canvasWidth,canvasHeight);
	}else{
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		ctx_bak.clearRect(0,0,canvasWidth,canvasHeight);
	}
};


//显示颜色选择框
function showColor(obj){
	var top = $(obj).offset().top;
	var left = $(obj).offset().left;
	$("#color")[0].style.left = $(obj).width + 5 + "px";
	$("#color")[0].style.top = top + "px";
	$("#color").css({'display':'block'});
};

//显示选择的颜色
function chooseColor(obj){
	var objClass = $(this).attr('class');
	$('#chooseColor').attr('class','');
	$('#chooseColor').addClass(objClass).addClass('border_nochoose');
	color = $(this).css('background-color');
	$('#color').hide();
};

//显示线条选择框
function showLineSize(obj){
	if($("#line_size").is(":hidden")){
		var top = $(obj).offset().top;
		var left = $(obj).offset().left;
		$("#line_size")[0].style.top = top + "px";
		$("#line_size")[0].style.left = left + $(obj).width() + 5 +"px";
		$("#line_size").show();
	}else {
		$("#line_size").hide();
	}
};

//显示选择的线条
function chooseLineSize(_size){
	$("#chooseSize").attr("src","images/drawingBoard/line_size_"+_size+".png");
	size = _size;
	$("#line_size").hide();
};

$(function(){
	$("img")[0].click();//默认第一张图片被点击,可直接绘图
	$("#color input").click(chooseColor); //默认第一个颜色
	//draw();
});
