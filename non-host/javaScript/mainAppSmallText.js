$(function(){

    // 메인에서 아래 하단 고정바 클릭했을 시 이벤트
    $('#subway').on("click", function() {
        $('.hi1').css({"display": "none"});

        $('#subway').css({"backgroundColor":"#4169e1"});
        $('#bus').css({"backgroundColor":"#f5f5f5"});
        $('#texi').css({"backgroundColor":"#f5f5f5"});
        $('#sideWalk').css({"backgroundColor":"#f5f5f5"});
        
        $('#subway div').css({"display":"block"});
        
        $('#subway img').css({"opacity":"100%"});
        $('#bus img').css({"opacity":"50%"});
        $('#texi img').css({"opacity":"50%"});
        $('#sideWalk img').css({"opacity":"50%"});
        
        $('#subwayInformation').css({"display":"block"});
        $('#findBus').css({"display":"none"});
        $('#callTaxi').css({"display":"none"});
        
        $('#map').css({"display":"block"});
    });

    $('#bus').on("click", function() {
        $('.hi2').css({"display":"none"});

        $('#bus').css({"backgroundColor":"#4169e1"});
        $('#subway').css({"backgroundColor":"#f5f5f5"});
        $('#texi').css({"backgroundColor":"#f5f5f5"});
        $('#sideWalk').css({"backgroundColor":"#f5f5f5"});

        $('#bus div').css({"display":"block"});
        
        $('#bus img').css({"opacity":"100%"});
        $('#subway img').css({"opacity":"50%"});
        $('#texi img').css({"opacity":"50%"});
        $('#sideWalk img').css({"opacity":"50%"});

        $('#subwayInformation').css({"display":"none"});
        $('#findBus').css({"display":"block"});
        $('#callTaxi').css({"display":"none"});
        
        $('#map').css({"display":"block"});
    });

    $('#texi').on("click", function() {
        $('.hi3').css({"display":"none"});

        $('#texi').css({"backgroundColor":"#4169e1"});
        $('#subway').css({"backgroundColor":"#f5f5f5"});
        $('#bus').css({"backgroundColor":"#f5f5f5"});
        $('#sideWalk').css({"backgroundColor":"#f5f5f5"});

        $('#texi div').css({"display":"block"});
        
        $('#texi img').css({"opacity":"100%"});
        $('#subway img').css({"opacity":"50%"});
        $('#bus img').css({"opacity":"50%"});
        $('#sideWalk img').css({"opacity":"50%"});
        
        $('#subwayInformation').css({"display":"none"});
        $('#findBus').css({"display":"none"});
        $('#callTaxi').css({"display":"block"});

        $('#map').css({"display":"none"});
    });

    // 확대 축소 버튼 클릭시 이벤트
    $('#zoomOut').on('click', function(){
        $('#zoomOut').css({
            "color":"white",
            "backgroundColor":"#4169e1",
            "zIndex":"101"
        })
        $('#zoomIn').css({
            "color":"black",
            "backgroundColor":"#EFEFEF",
            "zIndex":"100"
        })
    });
    $('#zoomIn').on('click', function(){
        $('#zoomIn').css({
            "color":"white",
            "backgroundColor":"#4169e1",
            "zIndex":"101"
        })
        $('#zoomOut').css({
            "color":"black",
            "backgroundColor":"#EFEFEF",
            "zIndex":"100"
        })
    });

    // sideMenu 나오게 하기 
    $('#side_bar').on('click', function(){
        $('#wall').css({"display":"block"});
        $('#sideMenu').css({"display":"block"});
    });
    
    // sideMenu 가리기
    $('#wall').on('click', function(){
        $('#sideMenu').css({"display":"none"});
        $(this).css({"display":"none"});
    });

    
});