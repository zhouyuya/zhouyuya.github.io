function detail(){
  //方法
  function formatYMDHM(leftTime){
    function add0(m){return m<10?'0'+m:m }
    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var d,h,m,s;
    if (leftTime>=0) {
      d = Math.floor(leftTime/1000/60/60/24);
      h = Math.floor(leftTime/1000/60/60%24);
      m = Math.floor(leftTime/1000/60%60);
      s = Math.floor(leftTime/1000%60);
    }
    return `${add0(d)}天${add0(h)}时${add0(m)}分${add0(s)}秒`;
  }
  function getActivityTime(start,end){
    const nowDate = new Date();
    const timeStart = new Date(start);
    const timeEnd = new Date(end);
    if(!start && !end){
      return '时间：不限'
    }
    else if(nowDate<timeStart){
      return `时间：${formatYMDHM(timeStart-nowDate)}后开始`
    }
    else if(nowDate>timeEnd && timeEnd){
      return '时间：已结束'
    }
    else if(nowDate<timeEnd){
      return `${formatYMDHM(timeEnd-nowDate)}后结束`
    }
  }
  // 1.判断浏览器类型
  function checkVersion() {
    //如果是PC端就直接到下载页面
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      return true;
    } else {
      window.location.href = "./../download/index.html";
      return false;

    }
  }
  // 2. 获取竖屏数据
  function fetchVideo(){
    function getSearchString(key) {
      // 获取URL中?之后的字符
      //var str = location.search;
      var str='https://www.aroundworld.cn/detail/index.html?env=product&aid=5ae02a2051eff008de42837b&seek=0'
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
        play(json);
      }else {
        //alert('超时，请刷新页面')
      }
    };
    obj.send();
  }
  // 3. 播放
  function play (json){
    console.log(json);
    document.title=json.title?json.title:json.describe || '趣发生';
    document.getElementById("describe").innerHTML = json.describe?json.describe:(json.title?json.title:'');
    if(json.videos[0].avatar){
      document.getElementById("myAvatar").src =  `${json.videos[0].avatar}`;
    }
    document.getElementById("myUsername").innerHTML = json.videos[0].creatorName;
    document.getElementById("time").innerHTML = getActivityTime(json.timeStart,json.timeEnd);
    document.getElementById("location").innerHTML = json.fenceCenterAddress?json.fenceCenterAddress:'未填写';
    document.getElementById("right-view-box").style.background = `url(${json.verticalThumbnail})`;
    document.getElementById("right-view-box-p").innerHTML = `1/${json.videos.length}`;
    document.getElementById("example-video").innerHTML = ` <source
                src=${json.verticalUrl}
                type="application/x-mpegURL">`;
    var player = videojs('example-video');
    player.play();
  }

  // do
  if(checkVersion()){
    fetchVideo();
  }
}
detail();