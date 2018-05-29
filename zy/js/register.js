// JavaScript Document
$(document).ready(function (){
	var pass=null;
	var passD=null;

	var number='';
	var password='';
	/*电话号码验证11位*/
	$('#num').on('blur',function (){
		if(this.value.length==11){
			$('#numError').css('display','none');
			number=$('#num').val();
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
		password=$('#pass').val();
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

	/*提交注册*/
	$('#btn_submit').on('click',function(){
		$.ajax({
			//提交数据的类型 POST GET
			type:"POST",
			//提交的网址
			url:"http://localhost:8080/user/register",
			//提交的数据
			data:{name:String(number),password:String(password)},
			//返回数据的格式
			datatype: "text",//"xml", "html", "script", "json", "jsonp", "text".
			//在请求之前调用的函数
			//beforeSend:function(){$("#msg").html("logining");},
			//成功返回之后调用的函数
			success:function(data){
				alert(data);
				console.log(data);
				//$("#register_msg").html(data);
			},
		});
		setTimeout(function (){window.open('reg_success.html','_self');},2000);
	})
});













