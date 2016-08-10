
////////////////////////  setting-page ///////////////////////////////////////////
$(document).on('pageinit','#setting-page',function(){
    set_from_to_lang();
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
