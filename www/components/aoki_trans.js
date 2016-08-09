// This is a JavaScript file
// aoki_trans.js
//data/class_value.xml から各class の表示文字を各言語に合わせて変更

//public var
var l_from = 'en';//ここで言語を設定する
var l_to = 'ja';//ここで言語を設定する


//default_lang から l_to , l_from   を get する
function get_to_from(){
    
    var str = localStorage.getItem('obj');
    var obj = JSON.parse(str);
    l_to = obj.l_to;
    l_from = obj.l_from;
    console.log('l_to :: ' + obj.l_to);
    console.log('l_from :: ' + obj.l_from);
    
    /*             
    $.ajax({
        url:'data/default_lang.xml',
        timeout:1000,
        success:function(xml){
            $(xml).find("from").each(function() {
                l_from = $(this).text();
                console.log('set_to_from from ' + l_from);
            });
            $(xml).find("to").each(function() {
                l_to = $(this).text();
                console.log('set_to_from to ' + l_to);
            });
        },
        error:function() {
            console.log('default_lang.xml load error')
        }
    });  
    */
}
    
//default_lang に l_to , l_from   を set する
function set_to_from(){
               
    var obj = {
        l_to: l_to,
        l_from: l_from
    };
    
    localStorage.setItem('obj', JSON.stringify(obj));
    console.log('Json :: '+JSON.stringify(obj));
    

    /*
    $.ajax({
        url:'data/default_lang.xml',
        timeout:1000,
        success:function(xml){
            $(xml).find("from").each(function() {
                l_from = $(this).text();
                console.log('set_to_from from ' + l_from);
            });
            $(xml).find("to").each(function() {
                l_to = $(this).text();
                console.log('set_to_from to ' + l_to);
            });
        },
        error:function() {
            console.log('default_lang.xml load error')
        }
    });  
    */
    
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
    
//    var to_lang = 'jp';//ここで言語を設定する
//    var from_lang = 'en';//ここで言語を設定する

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
    
    
    $('.cmd_trans').click(function(){
        https_trans();
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
        https_trans();
    });
});

$(document).on('pageinit','#setting-page',function(){
    set_from_to_lang();
    $('#to_lang').change(function(){
        l_to = $(this).val();
        set_to_from();
    });
    $('#from_lang').change(function(){
        l_from = $(this).val();
        set_to_from();
    });
    

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