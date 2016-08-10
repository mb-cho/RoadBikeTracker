/////// photo-page //////////
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
//alert(largeImage.src);
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
    
    $('.cmd_trans').click(function(){
        console.log('Start https_trans');
        alert('click cmd_trans');
        https_trans();
        console.log('End https_trans');
    });
    
});
