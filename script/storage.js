var putStorage = function(key,value){
	window.localStorage.setItem(key,value);
}


var getStorage = function(key){
	return window.localStorage.getItem(key);
}


var removeStorage = function(key){
	window.localStorage.removeItem(key);
}


var callBackStorage = function(e){
	initHistorty();
}


var initHistorty = function(){

	for(var i=1;i<5;i++){
		var dataUrl = getStorage(i);
		if(dataUrl!=null&&dataUrl!=''){
			//Í¼Æ¬
			$("#history_0"+i).attr("src",dataUrl);
			//ÏÂÔØÁ´½Ó
			$("#down_0"+i).attr("href",dataUrl);
			//É¾³ýÁ´½Ó
			$("#del_0"+i).attr("href","javascript:void(0)");
		}else{
			//Í¼Æ¬
			$("#history_0"+i).attr("src",'images/drawingBoard/noimg.png');
			//ÏÂÔØÁ´½Ó
			$("#down_0"+i)[0].removeAttribute('href');  
			//É¾³ýÁ´½Ó
			$("#del_0"+i)[0].removeAttribute('href');  
			
		}
	}
}

//±£´æ
var save = function(){
	for(var i = 1;i<=4;i++){
		var dataUrl = getStorage(i);
		if(dataUrl == null || dataUrl == ''){
			putStorage(i,canvas.toDataURL());
			$("#history_0"+i).attr("src",canvas.toDataURL());

			initHistorty();
			return ;
		}
	}			
}


$(function(){
	if (window.addEventListener) {    
		window.addEventListener("storage", callBackStorage, false); 
	} else {     
		window.attachEvent("onstorage", callBackStorage); 
	};

	

	initHistorty();


	$("table tr td a").click(function(){
		var id = $(this).attr("id");
		if(id.indexOf("del")!='-1'){
			var index = id.substring(id.length-1);
			removeStorage(index);
			initHistorty();
		}
	});

});



