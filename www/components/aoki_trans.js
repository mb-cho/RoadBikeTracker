// This is a JavaScript file
// aoki_trans.js
function class_text(){
    $(function(){

    $.support.cors = true;
                             
    $.ajax({
        url:'data/class_value.xml',
        timeout:1000,
        success:function(xml){
            $(xml).find("jp").each(function() {
                $(this).children().each(function(){
                    var tag_name = '.' + $(this).prop('tagName');
                    console.log('tag name ' + tag_name.toLowerCase());
                    $(tag_name).text($(this).text());
                    console.log('tag new test ' + $(tag_name).text());
                    console.log('tag text ' + $(this).text());
                });
            });
        },
        error:function() {
            console.log('xml load error')
        }
    });
});
    /*
    console.log('class_log enter');
        $('.top_page').html('トップページ');
        $('.camera').html('カメラ');
        $('.photo').html('写真');
        $('.result').html('結果');
        $('.setting').html('設定');
    */
}


// JQuery
$(function(){
    //ここから始まる
    $(document).ready(function(){
//localStorage.clear();
        var user = localStorage.getItem("user");
        if(user == null){//user が無い　＝　初回起動
            var s_url = 'https://net-navi.cc/vote/users/user_entry';
            http_user_add(s_url);
        }else{
            user_obj = eval('(' + user + ')');
            
            var mst_lang = localStorage.getItem("mst_lang");
                mst_lang_obj = eval('(' + mst_lang + ')');
            var mst_class_lang = localStorage.getItem("mst_class_lang");
                mst_class_lang_obj = eval('(' + mst_class_lang + ')');
        }
        
    
    });
    
});


