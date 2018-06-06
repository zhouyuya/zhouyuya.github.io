

function getSearchString(key) {
  // 获取URL中?之后的字符
  var str="https://www.aroundworld.cn/detail/index.html?env=product&aid=5b0d1eaf4f42bc6b00bd70e1&seek=0"
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
function play (json){

  document.getElementById("video-cover").innerHTML = ` <video id="example-video" width="100%" height="100%" class="video-js vjs-default-skin" data-setup="{}" controls>
            <source
                    src=${json.m3u8}
                    type="application/x-mpegURL">
        </video>`;
  document.querySelector("#main").innerHTML=` <p class="title">${json.title?json.title:json.discribe || '趣发生'}</p>
    <p class="location">${json.fenceCenterAddress}</p>
    <p class="time">${json.pageView} 次播放</p>`;
  document.title=json.title?json.title:json.describe || '趣发生';
  var player = videojs('example-video');
  player.play();
}