// This is a JavaScript file
// aoki_trans.js
//data/class_value.xml から各class の表示文字を各言語に合わせて変更
function class_text(){
    
    var lang = 'jp';//ここで言語を設定する
    
    $(function(){

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
    });
}

