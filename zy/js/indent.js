// JavaScript Document
$(document).ready(function (){

    var oPay=$('.go').eq(0);
    var AaddressCard=$('.address_card');
    var i=0;


    //点击付款
    oPay.click(function(){
        window.location.href='indent_success.html';

    })

    //点击选择地址
     for(i=0;i<AaddressCard.length;i++)
    {
        AaddressCard.click(function (){
            k=$(this).index();
            $(this).addClass('selected').parents('li').siblings('li').children('a').removeClass('selected');
        });
    }

});






