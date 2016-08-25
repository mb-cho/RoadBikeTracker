// This is a JavaScript file
// aoki.js
//data/class_value.xml から各class の表示文字を各言語に合わせて変更

//public var
var l_from = 'en';//ここで言語を設定する
var l_to = 'ja';//ここで言語を設定する

var map;//地図object
//var b_GPS = false;  //GPS使用= true ,非使用=false
var head = 90; // 地図のhead=方向を設定 0:北　90:東
var b_heading = false;  //地図をheadingする:true
var b_tracking = false; //GPS trackingする:true
var watchID = null;     //compass で使用する
var trackingId  = null; //TRACKING で使用する
var marker = null;      //mapに表示する marker
// アプリ終了
function Exit(){
    navigator.notification.confirm($('.exit').text() + '?',ExitConfirm,' ', ['Resume','Exit'] );
}
function ExitConfirm(buttonIndex) {
    if(buttonIndex == 2){
        navigator.app.exitApp();
    }
}

//結果の保存
function Save(){
    navigator.notification.confirm($('.exit').text() + '?',ExitConfirm,' ', ['Resume','Exit'] );
}

function ExitConfirm(buttonIndex) {
    if(buttonIndex == 2){
        navigator.app.exitApp();
    }
}


//default_lang から l_to , l_from   を get する
function get_to_from(){
     // 初期値をlocalStorageに保存（初回ロード時のみ）
    /*
    var obj = {
        l_to: l_to,
        l_from: l_from
    };
    var data = getObject();
    if (!data) {
        setObject(obj);
    }
    */
    
    var str = localStorage.getItem('obj');
    
    //取得に失敗　または　初回起動時
    if(! str){
        var obj = {
            l_to: l_to,
            l_from: l_from
        };
    }else{ //成功
        var obj = JSON.parse(str);
    }
    
    l_to = obj.l_to;
    l_from = obj.l_from;
    console.log('l_to :: ' + obj.l_to);
    console.log('l_from :: ' + obj.l_from);
    
    //class_text();//設定変更をすぐに反映
    
}
    
//default_lang に l_to , l_from   を set する
function set_to_from(){
               
    var obj = {
        l_to: l_to,
        l_from: l_from
    };
    
    localStorage.setItem('obj', JSON.stringify(obj));
    console.log('Json :: '+JSON.stringify(obj));
    
    get_to_from();//設定変更をすぐに反映
}

function class_text(){
    
    //default_lang から l_to , l_from   を set する
    get_to_from();

    $(".h_to").text(l_to);
    $(".h_from").text(l_from);
    
    $.support.cors = true;
                             
    $.ajax({
        url:'data/class_value.xml',
        timeout:1000,
        success:function(xml){
            $(xml).find(l_to).each(function() {
                $(this).children().each(function(){
                    $('.' + $(this).prop('tagName').toLowerCase()).text($(this).text());
                });
            });
        },
        error:function() {
            console.log('class_value.xml load error')
        }
    });
}

//data/lang.xml から    Target Language を読み込む
function set_from_to_lang(){
    
    $.support.cors = true;
    $select_to = $('#to_lang');
    $select_from = $('#from_lang');
    $.ajax({
        url:'data/lang.xml',
        timeout:1000,
        success:function(xml){
            $(xml).find('item').each(function() {
                var value = $('value',this).text();
                var text = $('text',this).text();
                isSelected = (value === l_to);
                $option = $('<option>')
                    .val(value)
                    .text(text)
                    .prop('selected', isSelected);
                $select_to.append($option);
                
                isSelected = (value === l_from);
                $option = $('<option>')
                    .val(value)
                    .text(text)
                    .prop('selected', isSelected);
                $select_from.append($option);
            });
            
            
        },
        error:function() {
            console.log('lang.xml load error')
        }
    });
}

//////////// timer 初期設定
def_count = 60;
function timer_count_start() {
    $('#counter').val(def_count);
    //カウント開始
    count = $('#counter').val();
	timerID = setInterval('timer_countdown()',1000);
}

function timer_countdown() {
	//カウント表示
	count--;
	//document.ktimer.counter.value = count;	
    $('#counter').val(count);
    if (count <= 0) {
		timer_count_stop();
	}
}

function timer_count_stop() {
	//カウント停止
	clearInterval(timerID);
}

////////////// Start monitoring the compass
function changeWatchCompass(){
    if(b_heading){ //ON -> OFF 
        stopWatchCompass();
        b_heading = false;
        f_switch_compass_view();//表示切替
        app.slidingMenu.closeMenu();
    }else{ // OFF -> ON
        startWatchCompass();
        b_heading = true;
        f_switch_compass_view();
        app.slidingMenu.closeMenu();
    }
}

function startWatchCompass() {

  // Update the compass every 3 seconds
  var options = { frequency: 3000 };

  watchID = navigator.compass.watchHeading(onSuccessCompass, onErrorCompass, options);
}

// Stop monitoring the compass
function stopWatchCompass() {
  if (watchID) {
      navigator.compass.clearWatch(watchID);
      watchID = null;
      console.log('Stop Watch');
  }
}

// onSuccess: Get the current orientation
function onSuccessCompass(heading) {
    console.log('heading:'+heading.magneticHeading);
    $('#heading_val').text(heading.magneticHeading);
    //map.setHeading(heading.magneticHeading);

}

// onError: Failed to get the orientation
function onErrorCompass(compassError) {
  alert('Compass encountered an error: ' + compassError.code);
}

function f_switch_compass_view(){
    if(b_heading){
        $('#compass_switch').text(':OFF');
        console.log('View Switch OFF');
    }else{
        $('#compass_switch').text(':ON');
        console.log('View Switch ON');
    }
}


////////////// Start GPS tracking
function changeTracking(){
    console.log('Enter changeTracking');
    if(b_tracking){ //ON -> OFF 
        stopTracking();
        b_tracking = false;
        f_switch_tracking_view();//表示切替
        app.slidingMenu.closeMenu();
    }else{ // OFF -> ON
        startTracking();
        b_tracking = true;
        f_switch_tracking_view();
        app.slidingMenu.closeMenu();
    }
}

function startTracking() {
    console.log('Enter startTracking');
    //開始時刻
    timStart = new Date();
    //状況初期化
    // _changeButton(1);
    //タイマー起動(45秒後にGPS停止)
    //timerID = setTimeout( function () { stopTracking(); }, 45000);
    //グラフデータ用配列クリア
    d1 = [];
    //GPS起動
    // Update the tracking every 3 seconds
    var options = { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true  };
    trackingId = navigator.geolocation.watchPosition(
        onSuccessTracking, 
        onErrorTracking, 
        options); 
}

// Stop  tracking
function stopTracking() {
    console.log('Enter stopTracking');
    if(trackingId){
        //記録終了
        navigator.geolocation.clearWatch(trackingId);
        trackingId = null;
        console.log('Stop Tracking');
        
        //状況変更
        /*
        _changeButton(2);
        //グラフデータあるか？
        if (d1.length == 0) {
            $('#chart').html("GPSデータ取得 0 件");
        }
        */
    }
    
}

// onSuccess: Get the current orientation
function onSuccessTracking(p) {
    var timNow = new Date();
    //経過時間を秒換算
    var time = (timNow.getTime() - timStart.getTime()) / 1000;
    //誤差取得
    var acc = p.coords.accuracy;
    //測定データをコンソールに表示
    console.log("緯度:" + p.coords.latitude +
                ",経度:" + p.coords.longitude +
                ",誤差:" + acc);
    
    //var latlng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);   
    var myLatLng = {lat: p.coords.latitude, lng: p.coords.longitude};
    
    marker = new google.maps.Marker({   position: myLatLng, 
                                        map: map,
                                        icon:'./images/mark01.png'});
    
    /*
    //グラフデータ追加
    d1.push([time, acc]);
    var optData = [];
    var optData1 =  {
            label: "誤差",  
            data: d1,
            lines: { show: true },
            points: { show: true }
    };
    optData.push(optData1);
    //グラフ描画
    $.plot($("#chart"), optData,
            {
            xaxis: optXaxis,
            yaxis: optYaxis,
            grid: optGrid
            }
    );
    */
}

// onError: Failed to get the orientation
function onErrorTracking(trackingError) {
  alert('tracking encountered an error: ' + trackingError.code);
}

function f_switch_tracking_view(){
    if(b_tracking){
        $('#tracking_switch').text(':OFF');
        console.log('Tracking Switch OFF');
    }else{
        $('#tracking_switch').text(':ON');
        console.log('Tracking Switch ON');
    }
}






