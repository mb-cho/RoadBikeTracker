// This is a JavaScript file
// aoki_trans.js
//data/class_value.xml から各class の表示文字を各言語に合わせて変更
function class_text(){
    
    var lang = 'jp';//ここで言語を設定する
    
        $.support.cors = true;
                                 
        $.ajax({
            url:'data/class_value.xml',
            timeout:1000,
            success:function(xml){
                $(xml).find(lang).each(function() {
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
function set_to_lang(){
    
    var lang = 'jp';//ここで言語を設定する
    
        $.support.cors = true;
                                 
        $.ajax({
            url:'data/lang.xml',
            timeout:1000,
            success:function(xml){
                $(xml).find(lang).each(function() {
                    
                    /*
                    ここで target_langにitemを追加する
                    
                    */
                    
                });
            },
            error:function() {
                console.log('lang.xml load error')
            }
        });
}


// JQuery
//camera
$(document).on('pageinit','#camera-page',function(){
    
    document.addEventListener ("deviceready", onDeviceReady, false);
    //This function is executed when PhoneGap loading completed.
    function onDeviceReady () {
        console.log('Loading PhoneGap is completed、Camera is now ready to be used.');
        $('.cmd_trans').css('display', 'none');
    
        var options = {
            quality: 50, 
            sourceType: Camera.PictureSourceType.CAMERA,   // 撮影モード
            saveToPhotoAlbum: true,  // 撮影後、写真を端末に保存
            destinationType:Camera.DestinationType.FILE_URI
        };
          
        // カメラを起動
        navigator.camera.getPicture(onSuccess, onError, options);

        // 撮影完了したときに呼び出される
        function onSuccess(imageURI){
            console.log(imageURI);
            var image = document.getElementById ('picture');
            image.src = imageURI;
            $('.cmd_trans').css('display', 'block');
        }
        // 撮影キャンセルしたときに呼び出される
        function onError(message){
            alert("エラー: " + message);
        }
        
    }
    
    $('#picture').click(function(){
        alert('hit pic');   
    });
    

});


//photo
$(document).on('pageinit','#photo-page',function(){
    
    document.addEventListener("deviceready", onDeviceReady, false);
    
    $('.cmd_trans').css('display', 'none');
    
    function onDeviceReady () {
        console.log ('Loading PhoneGap is completed');
        getPhoto();
    }
    
    function onSuccess (imageURI) {
        var largeImage = document.getElementById ('picture');
        largeImage.style.display = 'block';
        largeImage.src = imageURI;
        $('.cmd_trans').css('display', 'block');
    }
    
    function getPhoto () {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccess, onFail, 
      { quality: 50,destinationType: Camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM });
    }
    
    function onFail (message) {
      alert('An error occured: ' + message);
    }
    
    $('#picture').click(function(){
        alert('hit pic');   
    });
    
});

$(document).on('pageinit','#setting-page',function(){
    /*
    ons.createPopover('setting.html').then(function(popover) {
        $scope.popover = popover;
    });
    
    $scope.show = function(e) {
        $scope.popover.show(e);
    };
    */
    
});

$(document).on('pageinit','#result-page',function(){
        $('#pic').click(function(){
        takePicture();
        });
       // 写真を撮る
        function takePicture() {
            var options = {
                quality: 50, 
                sourceType: Camera.PictureSourceType.CAMERA,   // 撮影モード
                saveToPhotoAlbum: true   // 撮影後、写真を端末に保存
            };
              
            // カメラを起動
            navigator.camera.getPicture(onSuccess, onError, options);

            // 撮影完了したときに呼び出される
            function onSuccess(imageURI){
                console.log(imageURI);
                
            }
            // 撮影キャンセルしたときに呼び出される
            function onError(message){
                alert("エラー: " + message);
            }
        }
        
        // 写真を見る
        function loadPicture() {
            var options = {
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM   // 読込モード
            };
              
            // 写真を読み込む
            navigator.camera.getPicture(onSuccess, onError, options);
            
            // 読込完了したときに呼び出される
            function onSuccess(imageURI){
                document.getElementById("photo").src = imageURI;
            }
            
            // 読込失敗したときに呼び出される
            function onError(message){
                alert("エラー: " + message);
            }
        }

});