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

	for(var i=1;i<9;i++){
		var dataUrl = getStorage(i);
		if(dataUrl!=null&&dataUrl!=''){
			//Í¼Æ¬
			$("#history_"+i).attr("src",dataUrl);
			//ÏÂÔØÁ´½Ó
			$("#history_download_"+i).attr("href",dataUrl);
			//É¾³ýÁ´½Ó
			$("#history_del_"+i).attr("href","javascript:void(0)");
		}else{
			//Í¼Æ¬
			$("#history_"+i).attr("src",'image/noimg.png');
			//ÏÂÔØÁ´½Ó
			$("#history_download_"+i)[0].removeAttribute('href');  
			//É¾³ýÁ´½Ó
			$("#history_del_"+i)[0].removeAttribute('href');  
			
		}
	}
}

//±£´æ
var save = function(){
	for(var i = 1;i<=8;i++){
		var dataUrl = getStorage(i);
		if(dataUrl == null || dataUrl == ''){
			putStorage(i,canvas.toDataURL());
			$("#history_"+i).attr("src",canvas.toDataURL());

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



