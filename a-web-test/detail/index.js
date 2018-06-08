

function getSearchString(key) {
  // 获取URL中?之后的字符
  var str="https://www.aroundworld.cn/detail/index.html?env=product&aid=5b026c8f94bb012439617b54&seek=0"
  //var str = location.search;
  str = str.substring(1,str.length);
  // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
  var arr = str.split("&");
  var obj = new Object();
  // 将每一个数组元素以=分隔并赋给obj对象
  for(var i = 0; i < arr.length; i++) {
    var tmp_arr = arr[i].split("=");
    obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
  }
  return obj[key];
}
function fetchVideo(){

  var aid = getSearchString('aid');
  var env = getSearchString('env');
  var obj = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据
  //
  var url = env==='ci'?'https://www.ci.aroundworld.cn/api/activity/':'https://www.aroundworld.cn/api/v2/activity/';
  console.log(url+aid+'/detail');
  obj.open('GET', url+aid+'/detail', true);
  obj.onreadystatechange = function() {
    if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState == 4说明请求已完成
      var json = JSON.parse(obj.responseText);
      console.log(json)
      play(json);
    }else {
      //alert('超时，请刷新页面')
    }
  };
  obj.send();
}
function getdate(timeEnd) {
  if(timeEnd){
    var time=new Date(timeEnd),
        y = time.getFullYear(),
        m = ("0" + (time.getMonth() + 1)).slice(-2),
        d = ("0" + time.getDate()).slice(-2);
    return y + "-" + m + "-" + d + " " + time.toTimeString().substr(0, 8)+'结束';
  }else{
    return '进行中';
  }

}

function play (json){

  var avatar='./assets/avatar.png';
  for(var i=0;i<1;i++){
    avatar=json.contributor[i].avatar;
  }

  var endtime=getdate(json.timeEnd);

  document.getElementById("videoCover").innerHTML = ` <video id="example-video" class="video-js video vjs-big-play-centered" playsinline controls>
            <source
                    src=${json.m3u8}
                    type="application/x-mpegURL">
        </video>`;

  document.getElementById("avatar").setAttribute('src',avatar);
  document.querySelector("#word").innerHTML=` <span class="tag">#${json.tag?json.tag:'趣发生'}</span>
            <span class="detail"><span>${json.title?json.title:json.describe || '趣发生'}</span></span>
            <span class="end_time"><img src="./assets/Mask Group 522.png" /><span>${endtime}</span></span>
            <span class="address"><img src="./assets/Mask Group 521.png" /><span>${json.fenceCenterAddress}</span></span>`;
  document.title=json.title?json.title:json.describe || '趣发生';
  var player = videojs('example-video');

  player.play();

}