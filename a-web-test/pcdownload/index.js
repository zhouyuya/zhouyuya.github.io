/**
 * Created by lenovo on 2018/3/5.
 */
window.onload=function (){
    var aClick=document.getElementsByClassName('click');  //被点击的tab
    var aContent=document.getElementsByClassName('content');  //每个tab对应的内容
    var oTabLeft=document.getElementById('tab_left');    //顶部左边的logo

    for(var i=0;i<aClick.length;i++){
        aClick[i].index=i;
        aClick[i].onclick=function(){
            console.log(this.index);
            for(var j=0;j<aClick.length;j++){
                aClick[j].className='click';
                aContent[j].style.display='none';
            }
            //被点击后，被点击的tab的字变化（改变class即可）
            //对应内容呈现
            aClick[this.index].className='click isclick';
            aContent[this.index].style.display='block';

            //不是首页的时候，顶部左边logo出现
            if(this.index==0){
                oTabLeft.style.display='none';
            }else{
                oTabLeft.style.display='inline-block';
            }
        }

    }
}