/////// photo-page //////////
$(document).on('pageinit','#photo-page',function(){
    
    var base64_data = ''; //https に引き渡す 画像 base64
    
    document.addEventListener("deviceready", onDeviceReady, false);
    
    $('.cmd_trans').css('display', 'none');
    
    function onDeviceReady () {
        console.log ('Loading PhoneGap is completed');
        getPhoto();
    }
    
    function onSuccess (imageData) {
        /*
        image_uri = imageURI;
        var largeImage = document.getElementById ('picture');
        largeImage.style.display = 'block';
        largeImage.src = imageURI;
        $('.cmd_trans').css('display', 'block');
        */
        var image = document.getElementById('picture');
        image.style.display = 'block';
        image.src = "data:image/jpeg;base64," + imageData;
        base64_data = imageData;
        console.log ('BASE64:'+imageData);
    
    }
    
    function getPhoto () {
        //Specify the source to get the photos.
        /*
        navigator.camera.getPicture(onSuccess, onFail, 
          { quality: 50,destinationType: Camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM });
        */
        navigator.camera.getPicture(onSuccess, onFail, 
          { quality: 50,destinationType: Camera.DestinationType.DATA_URL,
          sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM });
    }
    
    function onFail (message) {
      alert('An error occured: ' + message);
    }
    
    $('.cmd_trans').click(function(){
        console.log('click STEP01');
        https_trans(image_uri);
        console.log('click STEP02');
    });
    
});
/*
画像を BASE64 で取得する　参考
https://docs.monaca.io/ja/reference/cordova_3.5/camera/
*/
/*
navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.DATA_URL
});

function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}
*/

