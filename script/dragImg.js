(function(){
	var canvas = this._canvas = new fabric.Canvas("canvas");
	var rect1 = new fabric.Rect({
		width:200,height:100,left:10,top:10,angle:30,fill:"green"
	});
	var rect2 = new fabric.Rect({
		width:100,height:100,left:210,top:10,angle:-10,fill:"yellow"
	});
	var rect3 = new fabric.Rect({
		width:100,height:200,left:20,top:300,angle:45,stroke:"red",strokeWidth:3,fill:"pink"
	});
	var circle = new fabric.Circle({
		radius:25,left:50,top:200,fill:"blue"
	});
	var triangle = new fabric.Triangle({
		width:100,height:100,left:50,top:200,fill:"purple"
	});
	var img = new fabric.Image.fromURL("images/dragImg/01.jpg",function(img){
		canvas.add(img.set({left:200,top:100,angle:45}));
	});
	var img2 = new fabric.Image.fromURL("images/dragImg/02.jpg",function(img){
		canvas.add(img.set({left:150,top:100,angle:45}));
	});
	var img3 = new fabric.Image.fromURL("images/dragImg/03.jpg",function(img){
		canvas.add(img.set({left:220,top:100,angle:45}));
	});
	var img4 = new fabric.Image.fromURL("images/dragImg/04.jpg",function(img){
		canvas.add(img.set({left:280,top:100,angle:45}));
	});

	canvas.add(rect1,rect2,rect3,circle,triangle);//globalCompositeOperation

	/*
		canvas.on("object:selected",function(options){
			options.target.bringToFront(); //rect circle,triangle,层叠顺序
		});
	*/
   	/*
		四个命令可以改变叠加顺序:
		options.target.sendBackwards()
		options.target.sendToBack()
		options.target.bringForward()
		options.target.bringToFront()
   	*/
	canvas.on({
	   'object:moving': onChange,
	   'object:scaling': onChange,
	   'object:rotating': onChange,
	   "object:selected":onChange,//选中事件
	});

  function onChange(options) {
    options.target.setCoords();//坐标
   	options.target.bringToFront(); //层叠顺序
    canvas.forEachObject(function(obj) {
      	if (obj === options.target) return;
     	//obj.setOpacity(options.target.intersectsWithObject(obj) ? 1 : 1); //透明度
   		obj.hasControls=false; //没有边框
   		obj.hasBorders = false; //没有四边
        //canvas.renderAll.bind(canvas); 
       	// this.__canvases.push(canvas);
    });
  };

  //文字
  var text = new fabric.Text("这是第一段文字",{
  	fontFamily:"Arial",
  	left:200,
  	top:500,
  	fontSize:40,
  	textAlign:"left",
  	fill:"green",
  });
  canvas.add(text);

  //可编辑文字
  var textarea = new fabric.IText("this is textarea\nincluding fontFamily \nor fontSize ",{
  	left:100,
  	top:500,
  	fontFamily:"Courier", 
  	fontSize:20,
  	fill:"#333",
  	styles: {
  		0:{
  			0: {fontSize:50,textBackgroundColor:"green",fill:"yellow",textDecoration:"line-through"},
  			3: {fontSize:50,fill:"red"},
  			10: {fontSize:80,fontWeight:"bold",stroke:"lightgreen",strokeWidth:3,shadow:"rgba(0,0,0,0.3) 5px 2px 2px"}
  		},
  		1: {
  			0:{fontSize:50,fill:"red",shadow:"rgba(0,255,0,0.5) 3px 2px 2px"},
  			5:{fontSize:40,fontStyle:"italic"}
  		}
  	}
  });
  var textarea2 = new fabric.IText("xxxx",{
  	left:500,
  	top:600,
  	fontFamily:"Courier",
  	fontSize:80,
  	padding:0,
  	angle:20,
  	lingHeight:1,
  	styles: {
  		0: {
  			0: {textBackgroundColor:"#555"},
  			1: {textBackgroundColor:"#777"},
  			2: {textBackgroundColor:"#999"},
  			3: {textBackgroundColor:"#ddd"}
  		}
  	}
  });
  canvas.add(textarea,textarea2);

//var canvasUrl = canvas.toDataUrl("image/png");
  var dataUrl = canvas.toDataURL({
    format:"png",
    width:100,
    height:100,
  });
  var a = document.getElementById("a");
  a.href = dataUrl;

})();

