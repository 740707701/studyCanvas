# studyCanvas
canvas demo

###下面是canvas fabric.js的用法###

锁住	lockMovementX	lockMovementY	lockRotation  	lockScalingX	lockScalingY	
			
选中元素时去掉连接线	object.hasBorders = false;

选中元素时去掉四边的框 object.hasControls=false，

设置选中元素时的样子
object.set({
  borderColor: 'red',
  cornerColor: 'green',
  cornerSize: 6
});


设置元素不能被操作 Object.selectable=false 

设置背景图
canvas.setBackgroundImage('img/golfball.png',canvas.renderAll.bind(canvas));	

设置背景透明显示
canvas.setOverlayImage('../assets/jail_cell_bars.png', canvas.renderAll.bind(canvas));

事件：
mouse:up mouse:move mouse:dowm
object:modified object:moving  object:selected object:scalig object:rotating 
before:selection:cleared  selection:cleared
after：render
"path:created"  "object:added" "object:removed"

添加线
var line = new fabric.Line([10, 10, 100, 100], {
  fill: 'green',
  stroke: 'green'
});
canvas.add(line);


添加矩形
var canvas = new fabric.Canvas('c');
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20
});

canvas.add(rect);

移动到指定位置

rect.set({ left: 20, top: 50 });
canvas.renderAll();



设置一些属性
rect.set('fill', 'red');
rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
rect.set('angle', 15).set('flipY', true);

添加圆和三角形
var circle = new fabric.Circle({
  radius: 20, fill: 'green', left: 100, top: 100
});
var triangle = new fabric.Triangle({
  width: 20, height: 30, fill: 'blue', left: 50, top: 50
});

canvas.add(circle, triangle);

椭圆
var ellipse = new fabric.Ellipse({
  rx: 45,
  ry: 80,
  fill: 'yellow',
  stroke: 'red',
  strokeWidth: 3,
  angle: 30,
  left: 100,
  top: 100
});
canvas.add(ellipse);

Canvas中操作一些元素的方法

var canvas = new fabric.Canvas('c');
var rect = new fabric.Rect();

canvas.add(rect); // add object

canvas.item(0); // reference fabric.Rect added earlier (first object)
canvas.getObjects(); // get all objects on canvas (rect will be first and only)

canvas.remove(rect); // remove previously-added fabric.Rect


加载图片的方法
var canvas = new fabric.Canvas('c');
var imgElement = document.getElementById('my-image');
var imgInstance = new fabric.Image(imgElement, {
  left: 100,
  top: 100,
  angle: 30,
  opacity: 0.85
});
canvas.add(imgInstance);

--------------------------------
fabric.Image.fromURL('my_image.png', function(oImg) {
  canvas.add(oImg);
});
-------------------------------
fabric.Image.fromURL('my_image.png', function(oImg) {
  // scale image down, and flip it, before adding it onto canvas
  oImg.scale(0.5).setFlipX(true);
  canvas.add(oImg);
});

通过画路径为形状
var canvas = new fabric.Canvas('c');
var path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
path.set({ left: 120, top: 120 });
canvas.add(path);
----------------------------------------------------------
可以设置路径样式
path.set({ fill: 'red', stroke: 'green', opacity: 0.5 });

动画
rect.animate('angle', 45, {
  onChange: canvas.renderAll.bind(canvas)
});
或
rect.animate('left', '+=100', { onChange: canvas.renderAll.bind(canvas) });
或
rect.animate('angle', '-=5', { onChange: canvas.renderAll.bind(canvas) });
或
rect.animate('left', 500, {
  onChange: canvas.renderAll.bind(canvas),
  duration: 1000,
  easing: fabric.util.ease.easeOutBounce
});

组合的使用
var circle = new fabric.Circle({
  radius: 100,
  fill: '#eef',
  scaleY: 0.5,
  originX: 'center',
  originY: 'center'
});

var text = new fabric.Text('hello world', {
  fontSize: 30,
  originX: 'center',
  originY: 'center'
});

var group = new fabric.Group([ circle, text ], {
  left: 150,
  top: 100,
  angle: -10
});

canvas.add(group);

设置组合中的元素
group.item(0).setFill('red');
group.item(1).set({
  text: 'trololo',
  fill: 'white'
});

序列化
var canvas = new fabric.Canvas('c');
JSON.stringify(canvas);
或
canvas.toDatalessJSON()

反序列化
canvas.loadFromJSON（JSON.stringify(canvas)）



透时图片随mouse移动显示
(function() {
  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';


  fabric.loadSVGFromURL('../assets/135.svg', function(objects) {

    var obj = objects[0].scale(0.25);
    canvas.centerObject(obj);
    canvas.add(obj);

    obj.clone(function(c) {
      canvas.add(c.set({ left: 100, top: 100, angle: -15 }));
    });
    obj.clone(function(c) {
      canvas.add(c.set({ left: 480, top: 100, angle: 15 }));
    });
    obj.clone(function(c) {
      canvas.add(c.set({ left: 100, top: 400, angle: -15 }));
    });
    obj.clone(function(c) {
      canvas.add(c.set({ left: 480, top: 400, angle: 15 }));
    });

    canvas.on('mouse:move', function(options) {

      var p = canvas.getPointer(options.e);

      canvas.forEachObject(function(obj) {
        var distX = Math.abs(p.x - obj.left),
            distY = Math.abs(p.y - obj.top),
            dist = Math.round(Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)));

        obj.setOpacity(1 / (dist / 20));
      });

      canvas.renderAll();
    });
  });
})();

锁定旋转
var canvas = new fabric.Canvas('c6');
  canvas.add(new fabric.Rect({ width: 50, height: 50, fill: '#77f', top: 100, left: 100 }));
  canvas.item(0).lockRotation = true;
  this.__canvases.push(canvas);

锁定大小缩放

var canvas = new fabric.Canvas('c7');
  canvas.add(new fabric.Rect({ width: 50, height: 50, fill: '#77f', top: 100, left: 100 }));
  canvas.item(0).lockScalingX = canvas.item(0).lockScalingY = true;
  this.__canvases.push(canvas);

锁定X轴移动
 var canvas = new fabric.Canvas('c8');
  canvas.add(new fabric.Rect({ width: 50, height: 50, fill: '#77f', top: 100, left: 100 }));
  canvas.item(0).lockMovementX = true;
  this.__canvases.push(canvas);

锁定Y轴移动
var canvas = new fabric.Canvas('c9');
  canvas.add(new fabric.Rect({ width: 50, height: 50, fill: '#77f', top: 100, left: 100 }));
  canvas.item(0).lockMovementY = true;
  this.__canvases.push(canvas);

设置背景图
var canvas = new fabric.Canvas('c17');
  canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
  canvas.setBackgroundImage('../assets/pug.jpg', canvas.renderAll.bind(canvas));
  this.__canvases.push(canvas);

设置背景图前显
  
var canvas = new fabric.Canvas('c13');
  canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
  canvas.setOverlayImage('../assets/jail_cell_bars.png', canvas.renderAll.bind(canvas));
  this.__canvases.push(canvas);

设置背景色
var canvas = new fabric.Canvas('c5');
  canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
  canvas.backgroundColor = 'rgba(0,0,255,0.3)';
  canvas.renderAll();
  this.__canvases.push(canvas);

锁定某个元素不能操作
 var canvas = new fabric.Canvas('c4');
  canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
  canvas.add(new fabric.Rect({ left: 50, top: 50, fill: 'green', width: 30, height: 30 }));
  canvas.add(new fabric.Rect({ left: 150, top: 50, fill: 'green', width: 30, height: 30 }));
  canvas.add(new fabric.Rect({ left: 150, top: 150, fill: 'green', width: 30, height: 30 }));
  canvas.add(new fabric.Rect({ left: 50, top: 150, fill: 'green', width: 30, height: 30 }));

  canvas.item(0).selectable = false;
  this.__canvases.push(canvas);

Mouse选择时变成手形
 var canvas = new fabric.Canvas('c11');
  canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
  canvas.hoverCursor = 'pointer';
  this.__canvases.push(canvas);

Mouse选中时没有任何效果
var canvas = new fabric.Canvas('c10');
  canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
  canvas.item(0).hasControls = canvas.item(0).hasBorders = false;

  canvas.on({
    'mouse:down': function(e) {
      if (e.target) {
        e.target.opacity = 0.5;
        canvas.renderAll();
      }
    },
    'mouse:up': function(e) {
      if (e.target) {
        e.target.opacity = 1;
        canvas.renderAll();
      }
    },
    'object:moved': function(e) {
      e.target.opacity = 0.5;
    },
    'object:modified': function(e) {
      e.target.opacity = 1;
    }
  });
  this.__canvases.push(canvas);

Mouse选择中时没四边操作位
var canvas = new fabric.Canvas('c16');
  canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
  canvas.item(0).hasControls = false;
  canvas.setActiveObject(canvas.item(0));
  this.__canvases.push(canvas);

Mouse选择中的一些样式
var canvas = new fabric.Canvas('c1');
  canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));

  canvas.selectionColor = 'rgba(0,255,0,0.3)';
  canvas.selectionBorderColor = 'red';
  canvas.selectionLineWidth = 5;
  this.__canvases.push(canvas);

-------------------------------------------------
 var canvas = new fabric.Canvas('c3');
  canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));

  canvas.item(0).set({
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6,
    transparentCorners: false
  });
  canvas.setActiveObject(canvas.item(0));
  this.__canvases.push(canvas);
--------------------------------------------------

var canvas = new fabric.Canvas('c19');
  canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));

  canvas.item(0).set({
    borderColor: 'gray',
    cornerColor: 'black',
    cornerSize: 12,
    transparentCorners: true
  });
  canvas.setActiveObject(canvas.item(0));
  this.__canvases.push(canvas);
---------------------------------------------------
var canvas = new fabric.Canvas('c15');
  canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
  canvas.item(0).hasBorders = false;
  canvas.setActiveObject(canvas.item(0));
  this.__canvases.push(canvas);

--------------------------------------------------------------------
璇转回复
(function() {
  fabric.Object.prototype.transparentCorners = false;

  var canvas = this.__canvas = new fabric.Canvas('c', {
    backgroundColor: '#333',
    HOVER_CURSOR: 'pointer'
  });

  var PolaroidPhoto = fabric.util.createClass(fabric.Object, fabric.Observable, {
    H_PADDING: 20,
    V_PADDING: 50,
    originX: 'center',
    originY: 'center',
    initialize: function(src, options) {
      this.callSuper('initialize', options);
      this.image = new Image();
      this.image.src = src;
      this.image.onload = (function() {
        this.width = this.image.width;
        this.height = this.image.height;
        this.loaded = true;
        this.setCoords();
        this.fire('image:loaded');
      }).bind(this);
    },
    _render: function(ctx) {
      if (this.loaded) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(
          -(this.width / 2) - this.H_PADDING,
          -(this.height / 2) - this.H_PADDING,
          this.width + this.H_PADDING * 2,
          this.height + this.V_PADDING * 2);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
      }
    }
  });
  var photo = new PolaroidPhoto('../assets/pug.jpg', {
    top: 200,
    left: 200,
    scaleX: 0.2,
    scaleY: 0.2
  });
  photo.on('image:loaded', canvas.renderAll.bind(canvas));
  photo.drawBorders = photo.drawCorners = function() { return this };

  function makeHandler(arg) {
    return function(e) {
      if (e.target) {
        e.target.animate('angle', arg, {
          duration: 100,
          onChange: canvas.renderAll.bind(canvas)
        });
      }
    };
  }
  canvas.on({
    'mouse:down': makeHandler('+10'),
    'mouse:up': makeHandler('-10')
  });
  canvas.add(photo);
})();

以点拉线
(function() {
  var canvas = this.__canvas = new fabric.Canvas('c', { selection: false });
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

  function makeCircle(left, top, line1, line2, line3, line4) {
    var c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 5,
      radius: 12,
      fill: '#fff',
      stroke: '#666'
    });
    c.hasControls = c.hasBorders = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;
    c.line4 = line4;

    return c;
  }

  function makeLine(coords) {
    return new fabric.Line(coords, {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      selectable: false
    });
  }

  var line = makeLine([ 250, 125, 250, 175 ]),
      line2 = makeLine([ 250, 175, 250, 250 ]),
      line3 = makeLine([ 250, 250, 300, 350]),
      line4 = makeLine([ 250, 250, 200, 350]),
      line5 = makeLine([ 250, 175, 175, 225 ]),
      line6 = makeLine([ 250, 175, 325, 225 ]);

  canvas.add(line, line2, line3, line4, line5, line6);

  canvas.add(
    makeCircle(line.get('x1'), line.get('y1'), null, line),
    makeCircle(line.get('x2'), line.get('y2'), line, line2, line5, line6),
    makeCircle(line2.get('x2'), line2.get('y2'), line2, line3, line4),
    makeCircle(line3.get('x2'), line3.get('y2'), line3),
    makeCircle(line4.get('x2'), line4.get('y2'), line4),
    makeCircle(line5.get('x2'), line5.get('y2'), line5),
    makeCircle(line6.get('x2'), line6.get('y2'), line6)
  );

  canvas.on('object:moving', function(e) {
    var p = e.target;
    p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
    p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
    p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
    p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
    canvas.renderAll();
  });
})();

由滚动条控制图片
(function() {
  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.transparentCorners = false;

  var $ = function(id){return document.getElementById(id)};

  var rect = new fabric.Rect({
    width: 100,
    height: 100,
    top: 100,
    left: 100,
    fill: 'rgba(255,0,0,0.5)'
  });

  canvas.add(rect);

  var angleControl = $('angle-control');
  angleControl.onchange = function() {
    rect.setAngle(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  };

  var scaleControl = $('scale-control');
  scaleControl.onchange = function() {
    rect.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
  };

  var topControl = $('top-control');
  topControl.onchange = function() {
    rect.setTop(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  };

  var leftControl = $('left-control');
  leftControl.onchange = function() {
    rect.setLeft(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  };

  function updateControls() {
    scaleControl.value = rect.getScaleX();
    angleControl.value = rect.getAngle();
    leftControl.value = rect.getLeft();
    topControl.value = rect.getTop();
  }
  canvas.on({
    'object:moving': updateControls,
    'object:scaling': updateControls,
    'object:resizing': updateControls,
    'object:rotating': updateControls
  });
})();

静态的canvas
(function() {
  var canvas = this.__canvas = new fabric.StaticCanvas('c');

  canvas.add(
    new fabric.Rect({ top: 100, left: 100, width: 50, height: 50, fill: '#f55' }),
    new fabric.Circle({ top: 140, left: 230, radius: 75, fill: 'green' }),
    new fabric.Triangle({ top: 300, left: 210, width: 100, height: 100, fill: 'blue' })
  );

  fabric.Image.fromURL('../lib/pug.jpg', function(img) {
    canvas.add(img.set({ left: 400, top: 350, angle: 30 }).scale(0.25));
  });

  function animate() {
    canvas.item(0).animate('top', canvas.item(0).getTop() === 500 ? '100' : '500', { 
      duration: 1000,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: animate
    });
  }
  animate();
})();

对象外面包矩形
(function() {
  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.transparentCorners = false;

  var rect = new fabric.Rect({
    left: 100,
    top: 50,
    width: 100,
    height: 100,
    fill: 'green',
    angle: 20,
    padding: 10
  });
  canvas.add(rect);

  fabric.loadSVGFromURL('../assets/15.svg', function(objects, options) {

    var shape = fabric.util.groupSVGElements(objects, options);
    canvas.add(shape.scale(0.6));
    shape.set({ left: 200, top: 100 }).setCoords();
    canvas.renderAll();

    canvas.forEachObject(function(obj) {
      var setCoords = obj.setCoords.bind(obj);
      obj.on({
        moving: setCoords,
        scaling: setCoords,
        rotating: setCoords
      });
    })
  });

  canvas.on('after:render', function() {
    canvas.contextContainer.strokeStyle = '#555';

    canvas.forEachObject(function(obj) {
      var bound = obj.getBoundingRect();

      canvas.contextContainer.strokeRect(
        bound.left + 0.5,
        bound.top + 0.5,
        bound.width,
        bound.height
      );
    })
  });
})();

元素移动到别的元素上时
(function() {
  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.transparentCorners = false;

  var rect1 = new fabric.Rect({
    width: 200, height: 100, left: 0, top: 50, angle: 30,
    fill: 'rgba(255,0,0,0.5)'
  });

  var rect2 = new fabric.Rect({
    width: 100, height: 100, left: 350, top: 250, angle: -10,
    fill: 'rgba(0,200,0,0.5)'
  });

  var rect3 = new fabric.Rect({
    width: 50, height: 100, left: 275, top: 350, angle: 45,
    stroke: '#eee', strokeWidth: 10,
    fill: 'rgba(0,0,200,0.5)'
  });

  var circle = new fabric.Circle({
    radius: 50, left: 275, top: 75, fill: '#aac'
  });

  var triangle = new fabric.Triangle({
    width: 100, height: 100, left: 50, top: 300, fill: '#cca'
  });

  canvas.add(rect1, rect2, rect3, circle, triangle);
  canvas.on({
    'object:moving': onChange,
    'object:scaling': onChange,
    'object:rotating': onChange,
  });

  function onChange(options) {
    options.target.setCoords();//坐标
    canvas.forEachObject(function(obj) {
      if (obj === options.target) return;
      obj.setOpacity(options.target.intersectsWithObject(obj) ? 0.5 : 1);
    });
  }
})();

关于mouse移动的一些操作

(function() {
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

  var canvas = this.__canvas = new fabric.Canvas('c');
  var status = document.getElementById('status');
  var mouseShape;

  // add shapes
  var shapes = [];
  for (var i=1; i < 30; i++) {
    for (var j=1; j < 40; j++) {
      var circle = new fabric.Circle({
        radius: 10
      });
      var text = new fabric.Text(i+','+j, {
        fill: '#fff',
        fontSize: 8,
        fontFamily: 'sans-serif'
      });
      shapes.push(new fabric.Group([circle, text], {
        left: j * 25,
        top: i * 25,
        hasControls: false
      }));
    }
  }
  canvas.add.apply(canvas, shapes);
  
  function start() {
    // cache the shapes
    // ??

    // disable editing
    __canvas.selection = false;
    __canvas.skipTargetFind = true;

    // do some intensive animation
    __canvas.on('mouse:move', function(o) {
        var pos = __canvas.getPointer(o.e);
        if (mouseShape) {
          mouseShape.set({ left: pos.x, top: pos.y });
          __canvas.renderAll();
        }
        else {
          mouseShape = new fabric.Circle({
            selectable: false,
            radius: 30,
            fill: 'rgba(0,0,255,0.5)',
            left: pos.x,
            top: pos.y
          });
          __canvas.add(mouseShape);
        }
    });

    status.innerHTML = 'started';
  }

  document.getElementById("start").addEventListener("click", start);
  document.getElementById("stop").addEventListener("click", function() {
    // remove shapes from cache

    // ??
    // enable editing
    __canvas.selection = true;
    
    // remove animation
    __canvas.off('mouse:move');
    __canvas.remove(mouseShape);
    mouseShape = null;

    status.innerHTML = 'stopped';
  });

  start();
})();

---------------------------------------

(function() {
  fabric.util.addListener(fabric.window, 'load', function() {
    var canvas = this.__canvas || this.canvas,
        canvases = this.__canvases || this.canvases;

    canvas && canvas.calcOffset && canvas.calcOffset();

    if (canvases && canvases.length) {
      for (var i = 0, len = canvases.length; i < len; i++) {
        canvases[i].calcOffset();
      }
    }
  });
})();


//Canvas中两张图交互和包含时获取向对的元素

  var c = canvas.getActiveObject();
  var t;
//交互时获取另一个元素
  for (var i = 0; i < canvas.getObjects().length; i++) {
        
        if (canvas.getObjects()[i] === c)
        {
            ci = i;
        }
      //判断是否是交互的元素，一般为TRUE时是本身元素和被包含的元素
        var b = c.intersectsWithObject(canvas.getObjects()[i]);
       

        if (b && canvas.getObjects()[i]!=c)
        {
            t = canvas.getObjects()[i];
            if (t === c) continue;
          
        }
        if (canvas.getObjects()[i] === t) {
            ti = i;
        }

    }

//包含时获取对应的元素
  for (var i = 0; i < canvas.getObjects().length; i++) {

            if (canvas.getObjects()[i] === c) {
                ci = i;
            }
            //判断是否是包含的元素，一般为TRUE时是本身元素和被包含的元素
            var b = c.isContainedWithinObject(canvas.getObjects()[i]);


            if (b && canvas.getObjects()[i] != c) {
                t = canvas.getObjects()[i];
                if (t === c) continue;
               
            }

            if (canvas.getObjects()[i] === t) {
                ti = i;
            }

//被包含时获取对应的元素

        for (var i = 0; i < canvas.getObjects().length; i++) {

            if (canvas.getObjects()[i] === c) {
                ci = i;
            }

            //判断是否是被包含的元素，一般为TRUE时是本身元素和被包含的元素
            var b = canvas.getObjects()[i].isContainedWithinObject(c);


            if (b && canvas.getObjects()[i] != c) {
                t = canvas.getObjects()[i];
                if (t === c) continue;
               
            }

            if (canvas.getObjects()[i] === t) {
                ti = i;
            }



        }

        }

//设置选中项
 canvas.setActiveObject(canvasimg)

//设置可见
 line2.set({ visible: true });

//设置图层
FlowChar.sendToBack = function() {
	   var activeObject = this.canvas.getActiveObject();
	   if (activeObject)
	   {
				canvas.sendToBack(activeObject);
		 }
};

/////////////////////////////////////////////////////////////////////////////////////

canvas.on('mouse:over', function(e) {
    e.target.setFill('red');
    canvas.renderAll();
  });

  for (var i = 15; i--; ) {
    var dim = fabric.util.getRandomInt(30, 60);
    var klass = ['Rect', 'Triangle', 'Circle'][fabric.util.getRandomInt(0,2)];
    var options = {
      top: fabric.util.getRandomInt(0, 600),
      left: fabric.util.getRandomInt(0, 600),
      fill: 'green'
    };
    if (klass === 'Circle') {
      options.radius = dim;
    }
    else {
      options.width = dim;
      options.height = dim;
    }
    canvas.add(new fabric[klass](options));
  }
})();

//自由绘画
var canvas = new fabric.Canvas('c', { isDrawingMode: true });

//加载到集合中的位置
canvas.insertAt(rect4,0);//

//获取mouse光标在canvas中的位置

canvas.on("mouse:move",function(o){
	var pointer=canvas.getPointer(o.e);
	
	
	
	$("#div1").html(pointer.x+"---"+pointer.y);
	
	
	
	
	
});

//判断选中的类型
canvas.getActiveObject().type == "line"

//一些功能
selectable,visible

//锁定移动
 var activeObject = canvas.getActiveObject();

        if (String(activeObject.type) == "rect") {
            activeObject.lockMovementX = true;

            activeObject.lockMovementY = true;
        } 

//合并组

 var activeGroup = this.canvas.getActiveGroup();

    if (activeGroup) {
        var objectsInGroup = activeGroup.getObjects();

        canvas.discardActiveGroup();

        var objs = new Array();
        for (var obj in objectsInGroup) {
            objs.push(objectsInGroup[obj]);
            this.canvas.remove(objectsInGroup[obj]);
        }
        var group = new fabric.Group(objs);
        this.canvas.add(group);
    }

//编历 canvas中元素的另一种方法
for (var i = 0; i < canvas.getObjects().length; i++) {

    var elem = canvas.getObjects()[i];

}


//绑定各个元素的方法

canvas.on('object:selected', function (options) {

   

    alert(String(options.target.type));
   
});

//mouse状态
canvas.hoverCursor = 'pointer';
canvas.defaultCursor = 'pointer';
canvas.moveCursor = 'pointer';

//一些属性
evented 
hasBorders //没四边
hasControls//不能控件
hasRotatingPoint //控制旋转点不可见
includeDefaultValues//为 false 时不可以序列化
lockMovementX
lockMovementY
lockScalingX
lockScalingY
lockUniScaling//只能成比例缩放
selectable
visible 

//组中图片更换 src

 var objs = ao.getObjects();

 var t = objs[0];

 t._element.attributes[0].nodeValue = isrc;


//你发的那个置底的没有效果 
//我还是用循环去遍历了 
 var _allObjects = canvas.getObjects();
        var _tempObjects = new Array();
        var selectObject = canvas.getActiveObject();
        _tempObjects.push(selectObject);
        for (var i = 0; i < _allObjects.length; i++) {
            if (_allObjects[i] != selectObject)
                _tempObjects.push(_allObjects[i]);
        }
        for (var k = 0; k < _tempObjects.length; k++) {
            for (var j = 0; j < _allObjects.length; j++) {
                if (_tempObjects[k] == _allObjects[j]) {
                    canvas.remove(_allObjects[j]);
                    canvas.add(_tempObjects[k]);
                }
            }
        }
        
        canvas.renderAll();



//获取元素位置
 var c = canvas.getActiveObject();

        if (c == null) return;

        

        alert(canvas.getObjects().indexOf(c));

//更换图片src

 activeObject._element.src;

//无素框
 var bound = obj.getBoundingRect();

/////////////////////

你可以得到z - index:canvas.getObjects().indexOf(some_object)。
四个命令可以改变叠加顺序:
some_object.sendBackwards()
some_object.sendToBack()
some_object.bringForward()
some_object.bringToFront()。


//////////在一个固定的范圈内拖动

var goodtop, goodleft, boundingObject;

canvas.on("object:moving", function(){
    var obj = this.relatedTarget;
    var bounds = boundingObject;
    obj.setCoords();
    if(!obj.isContainedWithinObject(bounds)){
        obj.setTop(goodtop);
        obj.setLeft(goodleft);
        canvas.refresh();    
    } else {
        goodtop = obj.top;
        goodleft = obj.left;
    }  
});

///////////////
var canvas = new fabric.Canvas("bounded");

var boundingBox = new fabric.Rect({
  fill: "none",
  width: 600,
  height: 400,
  hasBorders: false,
  hasControls: false,
  lockMovementX: true,
  lockMovementY: true,
  evented: false,
  stroke: "red"
});

var movingBox = new fabric.Rect({
  width: 100,
  height: 100,
  hasBorders: false,
  hasControls: false
});

canvas.on("object:moving", function() {
  var top = movingBox.top;
  var bottom = top + movingBox.height;
  var left = movingBox.left;
  var right = left + movingBox.width;

  var topBound = boundingBox.top;
  var bottomBound = topBound + boundingBox.height;
  var leftBound = boundingBox.left;
  var rightBound = leftBound + boundingBox.width;

  // capping logic here
  movingBox.setLeft(Math.min(Math.max(left, leftBound), rightBound - movingBox.width));
  movingBox.setTop(Math.min(Math.max(top, topBound), bottomBound - movingBox.height));
});

canvas.add(boundingBox);
canvas.add(movingBox);

//去掉边框

canvas.item(0).hasControls = canvas.item(0).hasBorders = false;

//mouse指针
canvas.hoverCursor = 'pointer';
canvas.moveCursor = 'pointer';

//指针样式
text是移动到文本上的那种效果 
wait是等待的那种效果 
default是默认效果 
e-resize是向右的箭头 
ne-resize是向右上的箭头 
n-resize是向上的箭头 
nw-resize是向左上的箭头 
w-resize是向左的箭头 
sw-resize是左下的箭头 
s-resize是向下的箭头 
se-resize是向右下的箭头 
auto是由系统自动给出效果

//
canvas.getActiveObject();
canvas.discardActiveObject(); 

//画图完成后可以选中

	var objs= canvas.getObjects();
       	 	for(var obj in objs)
		    {
		    	objs[obj].setCoords();
		    	
		    }    


//循环canvas

canvas.forEachObject(function(obj){
			
			
		});   	








		

