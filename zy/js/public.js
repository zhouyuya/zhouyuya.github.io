// JavaScript Document

$(document).ready(function (){
	
	//最上面右边二维码的显示隐藏
	var oQrCode=$('#qr_code');
	$('#show_qr_code').hover(function (){
		oQrCode.css('display','inline-block');	
	},function (){
		oQrCode.css('display','none');		
	});
	oQrCode.mouseover(function (){
		alert('k');	
	});
	
	
	
	//搜索栏地址的下拉菜单
	var oAddSelect=$('#address_select');
	$('#select_icon').click(function (){
		if(oAddSelect.css('display')=='none'){
			oAddSelect.css('display','block');
		}
		else {
			oAddSelect.css('display','none');
		}
	});
	


	//导航栏欢迎的滚动
	var oRollingLi=$('#rolling_text').children('li')[0];
	
	oRollingLi.innerHTML+=oRollingLi.innerHTML;
	
	setInterval(function (){
		oRollingLi.style.left=oRollingLi.offsetLeft-5+'px';
		
		if(oRollingLi.offsetLeft<-oRollingLi.offsetWidth/2){
			oRollingLi.style.left=0;
		}
	},300);
		
});