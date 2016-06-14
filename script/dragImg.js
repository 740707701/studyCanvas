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
  }
})();