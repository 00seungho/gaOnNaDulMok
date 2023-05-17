
$(function(){
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
    });

    $('#sideWalk').on("click", function() {
        $('.hi4').css({"display":"none"});

        $('#sideWalk').css({"backgroundColor":"#4169e1"});
        $('#subway').css({"backgroundColor":"#f5f5f5"});
        $('#bus').css({"backgroundColor":"#f5f5f5"});
        $('#texi').css({"backgroundColor":"#f5f5f5"});

        $('#sideWalk div').css({"display":"block"});
        
        $('#sideWalk img').css({"opacity":"100%"});
        $('#subway img').css({"opacity":"50%"});
        $('#bus img').css({"opacity":"50%"});
        $('#texi img').css({"opacity":"50%"});
    });
});