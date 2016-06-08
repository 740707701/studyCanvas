//����
var canvas ;
var context ;
//�ɰ�
var canvas_bak;
var context_bak;

var canvasWidth = 500;
var canvasHeight = 400;

var canvasTop;
var canvasLeft;

//���ʴ�С
var size = 1;
var color  = '#000000';

//��ͼ��
var draw_graph = function(graphType,obj){	

	//���ɰ���ڻ�������
	$("#canvas_bak").css("z-index",1);
	//�Ȼ����ɰ��� �ٸ��Ƶ�������
		
	chooseImg(obj);			
	var canDraw = false;	
	
	var startX;
	var startY;

	//��갴�»�ȡ ��ʼxy��ʼ��ͼ
	var mousedown = function(e){
		context.strokeStyle= color;
		context_bak.strokeStyle= color;
		context_bak.lineWidth = size;
		e=e||window.event;
		startX = e.clientX - canvasLeft;
		startY = e.clientY - canvasTop;
		context_bak.moveTo(startX ,startY );
		canDraw = true;			
		
		if(graphType == 'pencil'){
			context_bak.beginPath();
		}else if(graphType == 'circle'){
			context.beginPath();
			context.moveTo(startX ,startY );
			context.lineTo(startX +2 ,startY+2);
			context.stroke();	
			
		}else if(graphType == 'rubber'){							
			context.clearRect(startX - size * 10 ,  startY - size * 10 , size * 20 , size * 20);				
		}	
	};	

	//����뿪 ���ɰ�canvas��ͼƬ���ɵ�canvas��
	var mouseup = function(e){
		e=e||window.event;
		canDraw = false;
		var image = new Image();
		if(graphType!='rubber'){	
			
			image.src = canvas_bak.toDataURL();
			image.onload = function(){
				context.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , canvasWidth , canvasHeight);
				clearContext();
				saveImageToAry();
			}
			var x = e.clientX   - canvasLeft;
			var y = e.clientY  - canvasTop;	
			context.beginPath();
			context.moveTo(x ,y );
			context.lineTo(x +2 ,y+2);
			context.stroke();	
		}
	};

	//ѡ���ܰ�ť �޸���ʽ
	function chooseImg(obj){
		var imgAry  = $("#drawController img");
		for(var i=0;i<imgAry.length;i++){
			$(imgAry[i]).removeClass('border_choose');
			$(imgAry[i]).addClass('border_nochoose');				
		}
		$(obj).removeClass("border_nochoose");
		$(obj).addClass("border_choose");
	}

	// ����ƶ�
	var  mousemove = function(e){
		e=e||window.event;
		var x = e.clientX   - canvasLeft;
		var y = e.clientY  - canvasTop;	
		//����  4��ֱ�߸㶨
		if(graphType == 'square'){
			if(canDraw){
				context_bak.beginPath();
				clearContext();
				context_bak.moveTo(startX , startY);						
				context_bak.lineTo(x  ,startY );
				context_bak.lineTo(x  ,y );
				context_bak.lineTo(startX  ,y );
				context_bak.lineTo(startX  ,startY );
				context_bak.stroke();
			}
		//ֱ��
		}else if(graphType =='line'){						
			if(canDraw){
				context_bak.beginPath();
				clearContext();
				context_bak.moveTo(startX , startY);
				context_bak.lineTo(x  ,y );
				context_bak.stroke();
			}
		//����
		}else if(graphType == 'pencil'){
			if(canDraw){
				context_bak.lineTo(e.clientX   - canvasLeft ,e.clientY  - canvasTop);
				context_bak.stroke();						
			}
		//Բ δ����ʱ�� ����һ��СԲ
		}else if(graphType == 'circle'){						
			clearContext();
			if(canDraw){
				context_bak.beginPath();			
				var radii = Math.sqrt((startX - x) *  (startX - x)  + (startY - y) * (startY - y));
				context_bak.arc(startX,startY,radii,0,Math.PI * 2,false);									
				context_bak.stroke();
			}else{	
				context_bak.beginPath();					
				context_bak.arc(x,y,20,0,Math.PI * 2,false);
				context_bak.stroke();
			}
		//Ϳѻ δ����ʱ�� ����һ��СԲ
		}else if(graphType == 'handwriting'){											
			if(canDraw){
				context_bak.beginPath();	
				context_bak.strokeStyle = color;
				context_bak.fillStyle  = color;
				context_bak.arc(x,y,size*10,0,Math.PI * 2,false);		
				context_bak.fill();
				context_bak.stroke();
				context_bak.restore();
			}else{	
				clearContext();
				context_bak.beginPath();					
				context_bak.fillStyle  = color;
				context_bak.arc(x,y,size*10,0,Math.PI * 2,false);
				context_bak.fill();
				context_bak.stroke();
			}
		//��Ƥ�� ������û���ڻ�������С���� ������� ��ʼ�������
		}else if(graphType == 'rubber'){	
			context_bak.lineWidth = 1;
			clearContext();
			context_bak.beginPath();			
			context_bak.strokeStyle =  '#000000';						
			context_bak.moveTo(x - size * 10 ,  y - size * 10 );						
			context_bak.lineTo(x + size * 10  , y - size * 10 );
			context_bak.lineTo(x + size * 10  , y + size * 10 );
			context_bak.lineTo(x - size * 10  , y + size * 10 );
			context_bak.lineTo(x - size * 10  , y - size * 10 );	
			context_bak.stroke();		
			if(canDraw){							
				context.clearRect(x - size * 10 ,  y - size * 10 , size * 20 , size * 20);
										
			}			
		}
	};


	//����뿪�������� ����Ϳѻ �����
	var mouseout = function(){
		if(graphType != 'handwriting'){
			clearContext();
		}
	}

	$(canvas_bak).unbind();
	$(canvas_bak).bind('mousedown',mousedown);
	$(canvas_bak).bind('mousemove',mousemove);
	$(canvas_bak).bind('mouseup',mouseup);
	$(canvas_bak).bind('mouseout',mouseout);
}






//��ղ�
var clearContext = function(type){
	if(!type){
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
	}else{
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
	}
}

