// JavaScript Document
$(document).ready(function (){
	
	//吸顶效果
	var oFixed=$('#fixed_top_out');
	
	window.onscroll=function (){
		var t=document.documentElement.scrollTop || document.body.scrollTop;
		if(t>256)
		{
			oFixed.css('display','block');	
		}
		else 
		{
			oFixed.css('display','none');
		}
	};


	
	//最上面右边二维码的显示隐藏
	var oQrCode=$('#qr_code');
	$('#show_qr_code').hover(function (){
		oQrCode.css('display','inline-block');	
	},function (){
		oQrCode.css('display','none');		
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
	
	
	
	//banner大海报滚动
	var oPics=document.getElementById('pics');
	var oPic=oPics.getElementsByTagName('li');
	var oLibs=document.getElementById('libs');
	var oLib=oLibs.getElementsByTagName('li');
	var timer=null;
	var i=0;
	        
	oPics.innerHTML+=oPics.innerHTML;  //将ul里面的内容在复制一份放在后面，避免滚动到最后一张时，后面接的空白
	oPics.style.width=oPic[0].offsetWidth*oPic.length+'px';
	
	function move(){
		timer=setInterval(function (){
		
			oPics.style.left=oPics.offsetLeft-8+'px';
			
			if(oPics.offsetLeft<-oPics.offsetWidth/2)
			{
				oPics.style.left='0px';   //bug1：当满足条件时，会执行下面的if操作关闭定时器，3秒后启动
			}
			else if(oPics.offsetLeft>0)
			{
				oPics.style.left=-oPics.offsetWidth/2+'px';
			}
			
			
			//当某张图片处于正中时
			//第二三个条件是为了解决bug1，使得在满足上面的if,ifelse时不执行，重新赋值后再执行
			if(oPics.offsetLeft%oPic[0].offsetWidth==0
			&&oPics.oddsetLeft!=0&&oPics.offsetLeft!=-oPics.offsetWidth/2)  
			{
				clearInterval(timer);	//关闭定时器
		
				setTimeout(function (){
					move();
				},3000);  //3秒后开启定时器
				
				
				//第一张图num=0,第二张num=-1,第三张=-2
				var num=oPics.offsetLeft/oPic[0].offsetWidth;  
				num+=2;  //第一张num2,二num=1,三num=0
				
				for(i=0;i<=2;i++)//小圆点与图片对应
				{
					oLib[i].className='lib';
				}
				oLib[2-num].className='lib active';
				
			}
			
		},1);	
	}

	
	//开启定时器
	setTimeout(function (){
		move();
	},3000);
	
	
	
	//商品详情的显示
	var oPros=$('#products');
	var oPro=oPros.children('li');
	var oDeta=oPro.children('div');
	var k=0;
	
	//用JQ实现
	oPro.mouseover(function (){
		k=$(this).index();
		oDeta.eq(k).css('display','block');
	});
	
	oPro.mouseout(function (){
		oDeta.eq(k).css('display','none');
	});
	
	
	//用JS实现
	/*for(i=0;i<oPro.length;i++)
	{		
		oPro[i].index=i;
		oPro[i].onmouseover=function (){
			oDeta[this.index].style.display='block';
		};
		
		oPro[i].onmouseout=function () {
			oDeta[this.index].style.display='none';
		};
	}*/
	
	
	
	//热销商品按钮转换
	var hotPics=$('.hot_pics');
	var hotBtn=$('#hot_btn').children('li');
	var pp=0;
	
	for(i=0;i<hotBtn.length;i++)
	{
		hotBtn.click(function (){
			pp=$(this).index();
			hotBtn.eq(pp).addClass('hot_active').siblings('li').removeClass('hot_active');	
			hotPics.eq(pp).css('display','block').siblings('.hot_pics').css('display','none');
		});
	}	
	
	
	
	//猜你喜欢商品按钮转换
	var likePics=$('.like_pics');
	var likeBtn=$('#like_btn').children('li');
	
	for(i=0;i<likeBtn.length;i++)
	{
		likeBtn.click(function (){
			pp=$(this).index();
			likeBtn.eq(pp).addClass('like_active').siblings('li').removeClass('like_active');	
			likePics.eq(pp).css('display','block').siblings('.like_pics').css('display','none');
		});
	}	
	
	
	
	//1F的商品选项卡
	/*var oLink=$('#link_choose');
	var aLinks=oLink.children('span');
	var aLinks_show=$('#link_show').children('.link_show_choose');
	
	for(i=0;i<aLinks.length;i++)
	{
		aLinks.click(function (){
			pp=$(this).index();
			aLinks.eq(pp).addClass('chose').siblings('span').removeClass('chose');	
			aLinks_show.eq(pp).css('display','block').siblings('div').css('display','none');
		});	
	}*/
	
	
	//floor的商品选项卡
	var a1F_c=$('#1F_chose').children('span');
	var a1F_s=$('#1F_show').children('.link_show_choose');
	var a2F_c=$('#2F_chose').children('span');
	var a2F_s=$('#2F_show').children('.link_show_choose');
	var a3F_c=$('#3F_chose').children('span');
	var a3F_s=$('#3F_show').children('.link_show_choose');
	var obj1,obj2;
	
	function show(pp,obj1,obj2,f) {
		obj1.eq(pp).addClass('chose'+f).siblings('span').removeClass('chose'+f);
		obj2.eq(pp).css('display','block').siblings('div').css('display','none');
	}	
	
	
	for(i=0;i<a1F_c.length;i++)
	{
		a1F_c.click(function (){
			pp=$(this).index();
			show(pp,a1F_c,a1F_s,1);
		});
		
		a2F_c.click(function (){
			pp=$(this).index();
			show(pp,a2F_c,a2F_s,2);
		});
		
		a3F_c.click(function (){
			pp=$(this).index();
			show(pp,a3F_c,a3F_s,3);
		});
	}
	
	
});





















