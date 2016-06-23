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
                console.log('xml load error')
            }
        });
}


// JQuery
//camera
$(document).on('pageinit','#camera-page',function(){
    document.addEventListener ("deviceready", onDeviceReady, false);
    //This function is executed when PhoneGap loading completed.
    function onDeviceReady () {
        //window.alert ('Loading PhoneGap is completed、Camera is now ready to be used.');
        console.log('Loading PhoneGap is completed、Camera is now ready to be used.');

        console.log('camera-button');  
        
        $('.cmd_trans').css('display', 'none');
    
        navigator.camera.getPicture (onSuccess, onFail, 
            {   quality: 50, 
                destinationType: 
                Camera.DestinationType.DATA_URL});
                //Camera.DestinationType.FILE_URL});


        //A callback function when snapping picture is success.
        function onSuccess (imageData) {
            var image = document.getElementById ('picture');
            image.src = "data:image/jpeg;base64," + imageData;
            $('.cmd_trans').css('display', 'block');
            console.log('imageData='+imageData);
        }

        //A callback function when snapping picture is fail.
        function onFail (message) {
            $('.cmd_trans').css('display', 'none');
            alert ('Error occured: ' + message);
        } 
    }
    
    $('#picture').click(function(){
        alert('hit pic');   
    });
    

});

