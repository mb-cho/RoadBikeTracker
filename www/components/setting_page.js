
////////////////////////  setting-page ///////////////////////////////////////////
$(document).on('pageinit','#setting-page',function(){
    $("#id_slidingMenu").attr({swipeable: "true"});
    $('#to_lang').change(function(){
        l_to = $(this).val();
        set_to_from();
        class_text();
    });
    $('#from_lang').change(function(){
        l_from = $(this).val();
        set_to_from();
        class_text();
    });
});
