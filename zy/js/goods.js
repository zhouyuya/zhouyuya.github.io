// JavaScript Document
$(document).ready(function () {
	
	
	//点击小图切换大图
	var aSmallPic=$('.small_box').children('ul').children('li');
	var oBigPic=$('#pic').children('img');
	var oBiggerr=$('#big_box');
	var i=0;
	
	for(i=0;i<aSmallPic.length;i++)	
	{
		aSmallPic.click(function (){
			k=$(this).index();
			$(this).addClass('active').siblings('li').removeClass('active');
			oBigPic.attr('src','img/400_'+k+'.jpg');
			oBiggerr.children('div').children('img').attr('src','img/800_'+k+'.jpg');
		});
	}
	
	
	//放大镜效果	
	var oPic=document.getElementById('pic'); //获取本来的图片元素
	var oFloat=document.getElementById('float_box');//跟着鼠标移动的浮动小图
	var oBig=document.getElementById('big_box');//需要显示的放大图放置在这个div里（控制display）
	var oBigImg=oBig.getElementsByTagName('div')[0].getElementsByTagName('img')[0];//需要显示的放大图
	
	/*鼠标不在图上时，不显示浮动小图和放大图*/
	oPic.onmouseout=function () {
		oFloat.style.display='none';
		oBig.style.display='none';
	};
	
	/*鼠标在图上移动时*/
	oPic.onmousemove=function (ev) {
		oFloat.style.display='block';
		oBig.style.display='block'; //显示浮动小图和放大图
		var oEvent=ev || event; //获取事件（鼠标）
		/*滚动条的值*/
		var scrTop=document.body.scrollTop || document.documentElement.scrollTop;
		var scrLeft=document.body.scrollLeft || document.documentElement.scrollLeft;
		/*L和T是浮动小图在大图的left和top，
		  T=鼠标与窗口顶部的距离+滚动了的高度-大图与文档顶部的高度-浮动小图的一半高
		*/
		var L=oEvent.clientX+scrLeft-oPic.offsetLeft-oFloat.offsetWidth/2;
		var T=oEvent.clientY+scrTop-oPic.offsetTop-oFloat.offsetHeight/2;
		/*防止浮动小图溢出大图*/
		if(L<0) {
			L=0;	
		}
		if(L>200) {
			L=200;	
		}
		if(T<0) {
			T=0;	
		}
		if(T>200) {
			T=200;	
		}
		oFloat.style.left=L+'px';
		oFloat.style.top=T+'px';
		/*放大图在放置自己的容器里的left和top*/
		oBigImg.style.left=-L*2+'px';
		oBigImg.style.top=-T*2+'px';
	};
	
	
	//购买数量的改变
	var oMinus=$('.minus');
	var oAdd=$('.add');
	var oAmount=$('.amount').children('span');
	var a=oAmount.html();
	
	oMinus.click(function () {
		if(a>0) {
			a--;
			oAmount.html(a);
		}
	});
	oAdd.click(function () {
		a++;
		oAmount.html(a);
	});
	
	
	//商品详情，评论，售后显示切换
	var aBtn=$('.switch').children('span');
	var aBtn_show=$('.btn_show');
	
	aBtn.click(function () {
		var i=$(this).index();
		
		aBtn.eq(i).addClass('active');
		aBtn.eq(i).siblings('span').removeClass('active');
		
		aBtn_show.eq(i).css('display','block');	
		aBtn_show.eq(i).siblings('.btn_show').css('display','none');
	});
	
	
	//评论的显示切换
	var aComBtn=$('#com_button').children('a');
	var aCom=$('#com_show').children('p');
	
	aComBtn.click(function () {
		i=$(this).index();
		
		aComBtn.eq(i).addClass('active');	
		aComBtn.eq(i).siblings('a').removeClass('active');
		
		aCom.eq(i).css('display','block');
		aCom.eq(i).siblings('p').css('display','none');
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
