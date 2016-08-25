////////////////////////  top-page ///////////////////////////////////////////

$(document).on('pageinit','#map-page',function(){
    $("#id_slidingMenu").attr({swipeable: "false"});
    myModal.show();
    // 高精度の位置情報を要求する(衛星による測位)
    var options = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};
    console.log(1);
    navigator.geolocation.getCurrentPosition(function(position) {
        createMap(position);
        }, function(result) {
            myModal.hide();
            onError(result);
        }, options);
    
    //$(document).on('click', '.put-marker', function() {
    //    putMarker();
    //});
    $('#map').click(function(){
        console.log('click map1');
    });
    b_map_view = true;
});

function createMap(position) {
    console.log("createMap Enter");
    console.log(2);
    /* createMap()関数の記述 */ 
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // 地図のズーム値、センター位置、タイプを指定
    var mapOption = {
        zoom: 14,
        center: latlng,
        heading: 180 ,
        rotateControl: true,
        compassenabled: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    console.log(3);
    // 地図を作成
    map = new google.maps.Map($('#map')[0]);
    map.setOptions(mapOption);
    
    console.log(map.getHeading());//heading の set , get はできている。。。
    console.log(4);
    google.maps.event.addListener(map, "tilesloaded", function() {
        myModal.hide();
    })
    //現在地マーカー
    putMarker();
    
};

function putMarker() {
    /* putMarker()関数の記述 */
    if (map) {
        var options = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};
        navigator.geolocation.getCurrentPosition(function(position) {
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            marker = new google.maps.Marker({position: latlng, map: map});
        }, onError, options);
    } 
};

function onError(positionError) {
    /* onError()関数の記述 */
    var code = positionError.code;
    switch(code) {
        case 1:
            errorMessage = '位置情報の取得がユーザーによって許可されていません。';
            break;
        case 2:
            errorMessage = '位置情報の取得が行えません。';
            break;
        case 3:
            errorMessage = '時間切れです。位置情報が利用できない可能性があります。';
            break;    
        default:
            errorMessage = 'エラーが発生しました。' + code;
    }
    ons.notification.alert({ message: errorMessage });
};

