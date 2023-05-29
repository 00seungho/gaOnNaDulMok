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
        })

        $('#elevator').css({"display":"block"});
        $('#wheelchair_lift').css({"display":"none"});
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
        })

        $('#wheelchair_lift').css({"display":"block"});
        $('#elevator').css({"display":"none"});
    });

});