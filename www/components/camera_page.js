////////// camera-page  ///////////////
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
    
    
    $('.cmd_trans').click(function(){
        https_trans();
    });

});

