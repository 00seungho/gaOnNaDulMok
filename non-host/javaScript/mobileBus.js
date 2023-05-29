$(function(){

    /* 사이드 메뉴 나타내기 & 없애기 */
    $('#side_bar').on("click", function(){
        $('#sideMenu').css({"display":"block"});
        $('#wall').css({"display":"block"});
    });
    $('#wall').on("click", function(){
        $('#sideMenu').css({"display":"none"});
        $('#wall').css({"display":"none"});
    });

});