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

    /* 엘리베이터 */
    $('#elevatorBut').on("click", function(){
        $(this).css({
            "background-color":"#4169e1",
            "color":"white",
            "zIndex":"31"
        });
        $('#liftBut').css({
            "backgroundColor":"#EFEFEF",
            "color":"black",
            "zIndex":"30"
        });

        $('#evSelectorFieldApp').css({"display":"block"});
        $('#wlSelectorFieldApp').css({"display":"none"});
    });
    /* 휠체어 리프트 */
    $('#liftBut').on("click", function(){
        $(this).css({
            "backgroundColor":"#4169e1",
            "color":"white",
            "zIndex":"31"
        });
        $('#elevatorBut').css({
            "backgroundColor":"#EFEFEF",
            "color":"black",
            "zIndex":"30"
        });

        $('#wlSelectorFieldApp').css({"display":"block"});
        $('#evSelectorFieldApp').css({"display":"none"});
    });


    /* 웹 */

    $('.evSelectWeb').on("click", function(){
        $(this).css({
            "backgroundColor":"#EFEFEF",
            "color":"#f6f6f6"
        });
        $('.wlSelectWeb').css({
            "backgroundColor":"#f6f6f6",
            "color":"#4169e1"
        });

        $('#evSelectorFieldApp').css({"display":"block"});
        $('#wlSelectorFieldApp').css({"display":"none"});
    });

    $('.wlSelectWeb').on("click", function(){
        $(this).css({
            "backgroundColor":"#EFEFEF",
            "color":"#f6f6f6"
        });
        $('.evSelectWeb').css({
            "backgroundColor":"#f6f6f6",
            "color":"#4169e1"
        });

        $('#wlSelectorFieldApp').css({"display":"block"});
        $('#evSelectorFieldApp').css({"display":"none"});
    });
});