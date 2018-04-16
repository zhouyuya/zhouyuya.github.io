// JavaScript Document
$(document).ready(function (){

    var oCheck1=$('#check1');
    var oCheckAll=$('#checkAll');
    var oPay=$('.go').eq(0);
    var oAmount=$('#amount');
    var oTotal=$('#total');

    //加载完判断是否选中，选中的话，就酱紫
    if(oCheck1.prop('checked')){
        oCheckAll.prop('checked',true);
        oPay.css({'background':'rgb(228,0,17)','color':'#fff'});
        oTotal.text('71.00');
        oAmount.text('1');
    }

    //当商品前的单选框点击时
    oCheck1.click( function () {
        if(oCheck1.prop('checked')){
            oCheckAll.prop('checked',true);
            oPay.css({'background':'rgb(228,0,17)','color':'#fff'});
            oTotal.text('71.00');
            oAmount.text('1');
        }else{
            oCheckAll.prop('checked',false);
            oPay.css({'background':'rgb(226,226,226)','color':'#000'});
            oTotal.text('0.00');
            oAmount.text('0');
        }
    });

    //全选 点击时
    oCheckAll.click( function () {
        if(oCheckAll.prop('checked')){
            oCheck1.prop('checked',true);
            oPay.css({'background':'rgb(228,0,17)','color':'#fff'});
            oTotal.text('71.00');
            oAmount.text('1');

        }else{
            oCheck1.prop('checked',false);
            oPay.css({'background':'rgb(226,226,226)','color':'#000'});
            oTotal.text('0.00');
            oAmount.text('0');
        }
    });

    oPay.click(function(){
        if(oCheck1.prop('checked')){
            window.location.href='indent.html';
        }else{
            alert('请先选择商品')
        }
    })



});






