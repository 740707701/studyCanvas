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
	//circle.set("globalCompositeOperation","source-over"); //重叠属性
	var triangle = new fabric.Triangle({
		width:100,height:100,left:50,top:200,fill:"purple"
	});
	var img = new fabric.Image.fromURL("images/dragImg/01.jpg",function(img){
		canvas.add(img.set({left:200,top:100,angle:45}));
	});
	canvas.add(rect1,rect2,rect3,circle,triangle);
})();