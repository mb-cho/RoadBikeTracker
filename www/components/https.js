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

 function http_send_user_info(p_url,obj) {
    $(".kurukuru").css("display","block");
    //console.log(p_url);
    //console.log(JSON.stringify(obj));
    // 通信実行
    $.ajax({
        type:"post",                // method = "POST"
        url:p_url,                  // POST送信先のURL
        data:JSON.stringify(obj),   // JSONデータ本体
        //data:obj,   // JSONデータ本体
        contentType: 'application/json', // リクエストの Content-Type
        dataType: "json",           // レスポンスをJSONとしてパースする
        success: function(json_obj) {   // 200 OK時
            set_obj(json_obj);
            class_text();
        },
        error: function() {         // HTTPエラー時
            alert("Server Error. Pleasy try again later.");
        },
        complete: function() {      // 成功・失敗に関わらず通信が終了した際の処理
            $(".kurukuru").css("display","none");
        }
        
    });
}


