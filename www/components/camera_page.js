////////// camera-page  ///////////////
$(document).on('pageinit','#camera-page',function(){
    
    var base64_data = ''; //https に引き渡す 画像 base64
    var image_URI = '';   //https に引き渡す URI
    
    var options = {
        quality: 50, 
        sourceType: Camera.PictureSourceType.CAMERA,   // 撮影モード
        saveToPhotoAlbum: true,  // 撮影後、写真を端末に保存
        destinationType:Camera.DestinationType.FILE_URI //保存場所を返す
        //destinationType:Camera.DestinationType.DATA_URL,//base64 を返す
    };
          
    document.addEventListener ("deviceready", onDeviceReady, false);
    //This function is executed when PhoneGap loading completed.
    function onDeviceReady () {
        console.log('Loading PhoneGap is completed、Camera is now ready to be used.');
        $('.cmd_trans').css('display', 'none');
    
        // カメラを起動
        navigator.camera.getPicture(onSuccess, onError, options);

        // 撮影完了したときに呼び出される
        function onSuccess(imageURI){
            
            image_URI = imageURI;
            console.log(imageURI);
            var image = document.getElementById ('picture');
            image.src = imageURI;
            $('.cmd_trans').css('display', 'block');
            
        }
        
        // 撮影完了したときに呼び出される
        //base64で取得、しかし保存されないので不可
        function onSuccess_imageData(imageData){
            var image = document.getElementById('picture');
            image.src = "data:image/jpeg;base64," + imageData;
            base64_data = imageData;
            console.log ('Camera BASE64:'+imageData);
            $('.cmd_trans').css('display', 'block');

        }
        // 撮影キャンセルしたときに呼び出される
        function onError(message){
            alert("エラー: " + message);
        }
        
    }
    
    
    $('.cmd_trans').click(function(){
        https_trans_camera(image_URI);
    });

});

