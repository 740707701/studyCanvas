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
			//ͼƬ
			$("#history_"+i).attr("src",dataUrl);
			//��������
			$("#history_download_"+i).attr("href",dataUrl);
			//ɾ������
			$("#history_del_"+i).attr("href","javascript:void(0)");
		}else{
			//ͼƬ
			$("#history_"+i).attr("src",'image/noimg.png');
			//��������
			$("#history_download_"+i)[0].removeAttribute('href');  
			//ɾ������
			$("#history_del_"+i)[0].removeAttribute('href');  
			
		}
	}
}

//����
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



