// This is a JavaScript file
// aoki_trans.js
//data/class_value.xml から各class の表示文字を各言語に合わせて変更

//public var
var l_from = 'en';//ここで言語を設定する
var l_to = 'ja';//ここで言語を設定する


var p_url = 'https://net-navi.cc/trans/index.php'; //Server

// アプリ終了
function Exit(){
    navigator.notification.confirm($('.exit').text() + '?',ExitConfirm,' ', ['Resume','Exit'] );
}
function ExitConfirm(buttonIndex) {
    if(buttonIndex == 2){
        navigator.app.exitApp();
    }
}

//結果の保存
function Save(){
    navigator.notification.confirm($('.exit').text() + '?',ExitConfirm,' ', ['Resume','Exit'] );
}
function ExitConfirm(buttonIndex) {
    if(buttonIndex == 2){
        navigator.app.exitApp();
    }
}


//default_lang から l_to , l_from   を get する
function get_to_from(){
     // 初期値をlocalStorageに保存（初回ロード時のみ）
    /*
    var obj = {
        l_to: l_to,
        l_from: l_from
    };
    var data = getObject();
    if (!data) {
        setObject(obj);
    }
    */
    
    var str = localStorage.getItem('obj');
    
    //取得に失敗　または　初回起動時
    if(! str){
        var obj = {
            l_to: l_to,
            l_from: l_from
        };
    }else{ //成功
        var obj = JSON.parse(str);
    }
    
    l_to = obj.l_to;
    l_from = obj.l_from;
    console.log('l_to :: ' + obj.l_to);
    console.log('l_from :: ' + obj.l_from);
    
    //class_text();//設定変更をすぐに反映
    
}
    
//default_lang に l_to , l_from   を set する
function set_to_from(){
               
    var obj = {
        l_to: l_to,
        l_from: l_from
    };
    
    localStorage.setItem('obj', JSON.stringify(obj));
    console.log('Json :: '+JSON.stringify(obj));
    
    get_to_from();//設定変更をすぐに反映
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

