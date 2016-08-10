////////  result-page ///////
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


