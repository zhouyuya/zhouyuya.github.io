// JavaScript Document
$(document).ready(function (){
	var pass=null;
	var passD=null;
	/*电话号码验证11位*/
	$('#num').on('blur',function (){
		if(this.value.length==11){
			$('#numError').css('display','none');	
		}
		else{
			$('#numError').css('display','inline-block');
		}
	});
	
	/*密码验证8位*/
	$('#pass').on('blur',function (){
		if(this.value.length<8){
			$('#passError').css('display','inline-block');	
		}
		else{
			$('#passError').css('display','none');	
		}
		pass=$('#pass').val();
		/*避免确认密码后再次修改密码*/
		if(passD!=null)
		{
			$('#passDError').css('display','inline-block');	
		}
	});
	
	/*确认密码验证*/
	$('#passD').on('blur',function (){
		if(this.value!=pass){
			$('#passDError').css('display','inline-block');	
		}
		else {
			$('#passDError').css('display','none');	
		}
		passD=$('#passD').val();
	});
	
	/*手机验证码*/
	$('#txtBtn').on('click',function (){
		$('#txt').attr('disabled',false);
	});
	
	/*打开提交按钮*/
	$('#read').on('click',function (){
		if($(this).is(':checked')==true){
			$('#btn_submit').attr('class','btn_submit btn_submit_red');	
		}
		else{
			$('#btn_submit').attr('class','btn_submit btn_submit_gray');
		}
	});
	
});













