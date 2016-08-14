// This is a JavaScript file
// This is a JavaScript file
/*
https://developer.mozilla.org/ja/docs/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
参考のこと
//ajax
http://plus.adobe-adc.jp/post-4238/

//ponegap 設定
http://www.adobe.com/jp/devnet/phonegap/articles/phonegap_external_host.html

json <=> localstorage
http://blog.asial.co.jp/939

*/

//関数類

function save_user(json_obj){

    var user = localStorage.getItem("user");
    if(user != null){//user がある
        localStorage.removeItem('user');
        console.log('save_user Remove');
    }
            
    localStorage.setItem('user', JSON.stringify(json_obj));
    user_obj = json_obj;
    
    console.log('get user_obj.name');
}

function save_mst_lang(json_obj){
    var mst_lang = localStorage.getItem("mst_lang");
    if(mst_lang != null){//user がある
        localStorage.removeItem('mst_lang');
        console.log('save_mst_lang Remove');
    }
    localStorage.setItem('mst_lang', JSON.stringify(json_obj));
    mst_lang_obj = json_obj;
    console.log('save_mst_lang');
}

function save_mst_class_lang(json_obj){
    var mst_class_lang = localStorage.getItem("mst_class_lang");
    if(mst_class_lang != null){//user がある
        localStorage.removeItem('mst_class_lang');
        console.log('save_mst_class_lang Remove');
    }
    localStorage.setItem('mst_class_lang', JSON.stringify(json_obj));
    mst_class_lang_obj = json_obj;
    console.log('save_mst_class_lang');
}

function set_obj(json_obj){
    
    save_user(json_obj.User);
    save_mst_lang(json_obj.MstLang);
    save_mst_class_lang(json_obj.MstClassLang);
                
    var mst_lang = localStorage.getItem("mst_lang");
        mst_lang_obj = eval('(' + mst_lang + ')');
    var mst_class_lang = localStorage.getItem("mst_class_lang");
        mst_class_lang_obj = eval('(' + mst_class_lang + ')');
}

 function http_user_add(p_url) {
    $(".kurukuru").css("display","block");
    
    $.ajax({   
         url: p_url,
         timeout: 10000,
         scriptCharset: 'utf-8',
         dataType: "json",
         success: function(json_obj) {
                $(".kurukuru").css("display","none");
                set_obj(json_obj);
                class_text();
         },
         error: function (jqXHR, textStatus, errorThrown) {
                $(".kurukuru").css("display","none");
         }
     });
}

function https_trans_camera(imgUri) {
    console.log('https mgUri :'+imgUri);
        var errorHandler = function(e){
            alert("error");
            console.debug(e);    
        };            
        
        //console.log('https step01');
        //window.resolveLocalFileSystemURL(imgUri, successCallback, errorCallback);
        window.resolveLocalFileSystemURL(imgUri, 
        function success(fileEntry) {
            console.log('https_trans success'+ fileEntry.fullPath);
            
            var filename = fileEntry.name;
    
            fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(evt) {
                //readAsArrayBufferは非同期なので、ロード完了後のイベントで行う。
                console.log("Read complete! Camera");
                //console.log('base64 :'+evt.target.result);
                
                //Server通信
                https_trans(evt.target.result.replace("data:image/jpeg;base64,",""));
              };
              //reader.readAsArrayBuffer(file);
              reader.readAsDataURL(file);
            }, function() {console.log(error);});
        }, 
        function() {
            console.log('https error:'+error);
        });
}


function https_trans(base64_data) {
    
    $(".kurukuru").css("display","block");

    //POSTメソッドで送るデータを定義します var data = {パラメータ名 : 値};
    var data = {
            request : base64_data,
            from:l_from,
            to:l_to};
    $.ajax({   
        url: p_url,
        timeout: 10000,
        scriptCharset: 'utf-8',
        method: 'POST',
        data:data,
        success: function(ret) {
            //console.log(ret);
            $(".kurukuru").css("display","none");
            navigator.notification.alert(
            ret,  // message
            alertDismissed,         // callback
            'trans',            // title
            'OK'                  // buttonName
            );
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(".kurukuru").css("display","none");
            alert('Server Error');
        }
     });

}

function alertDismissed(){
    // nothing
}
