// JavaScript Document
$(document).ready(function (){

    var number='';
    var password='';

    /*电话号码验证11位*/
    $('#username').on('blur',function (){
        if(this.value.length==11){
            number=$('#username').val();
        }
    });

    /*密码验证8位*/
    $('#password').on('blur',function (){
        password=$('#password').val();

    });


    $('#login_btn').on('click',function(){
        $.ajax({
            //提交数据的类型 POST GET
            type: "POST",
            //提交的网址
            url: "http://localhost:8080/user/login",
            //提交的数据
            data: {username: number, password: password},
            //返回数据的格式
            datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
            //在请求之前调用的函数
            //beforeSend:function(){$("#msg").html("logining");},
            //成功返回之后调用的函数
            success: function (data) {
                console.log(data);
                //$("#login_msg").html(data);
            },

        });
       setTimeout(function (){window.open('index.html','_self');},2000);
    })
});













