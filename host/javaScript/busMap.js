
window.onload = function(){
    const divElement = document.getElementById('mobile');   
    if(window.getComputedStyle(divElement).display == "none"){
    const chang = document.getElementById("map");
    var found = false;

    chang.id = "map2"; 
    }
    var marker = null; // 현재 마커 객체를 저장할 변수
    var infowindow = null;
    var marker2 = null; // 현재 마커 객체를 저장할 변수
    var infowindow2 = null;

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.5559, 126.9723), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  
    map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    const searchBarWeb = document.getElementById('searchWeb');
    const searchBarmobile = document.getElementById('searchBus');

    if(window.getComputedStyle(divElement).display == "none"){
        document.getElementById('searchButtonWeb').addEventListener('click',function(){
            searchjson("../src/bus.json",searchBarWeb.value);

        })// 검색버튼 클릭 시, 검색 함수실행
        document.getElementById('searchWeb').addEventListener('keyup', function (e) {// 키보드 엔터누를 시 검색 함수 실행
            if (e.key === 'Enter') {
                searchjson("../src/bus.json",searchBarWeb.value);
            }
        })
    }
    
    else{
    document.getElementById('searchBusButton').addEventListener('click', function(){
        searchjson("../src/bus.json",searchBarmobile.value);
    })// 검색버튼 클릭 시, 검색 함수실행
    document.getElementById('searchBus').addEventListener('keyup', function (e) {// 키보드 엔터누를 시 검색 함수 실행
        if (e.key === 'Enter') {
            searchjson("../src/bus.json",searchBarmobile.value);
        }
    })  
    }

     
    var searchjson = function(url,busName) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            for(var i =0; i<data.length; i++){
                if(data[i].정류소명 == busName){
                    var a = i;
                    found = true;
                        break;
                }
        }
            for(var j = a; j<data.length;j++){
                if(data[j].정류소명 == busName && data[a].NODE_ID != data[j].NODE_ID){
                    var c = j;
                    found = true;
                        break;
                }
            }
            console.log(data[c].NODE_ID);
            console.log(data[i].NODE_ID);
 

        searchfind(`https://hifive.metainsu.co.kr/api/v1/common/sub-bus/?stid=${data[a].NODE_ID}&serverkey=NiGhn1xzYgu3Jk2dfWcsdseqg0Iufba%2FpRhl0nHbuNsDK8poZ0xTKBgyTNO0mzWieKL4TtLgCY0oTGD15kFlWw%3D%3D`);
        searchfind2(`https://hifive.metainsu.co.kr/api/v1/common/sub-bus/?stid=${data[c].NODE_ID}&serverkey=NiGhn1xzYgu3Jk2dfWcsdseqg0Iufba%2FpRhl0nHbuNsDK8poZ0xTKBgyTNO0mzWieKL4TtLgCY0oTGD15kFlWw%3D%3D`); 
        newmarker(a,data);
        newmarker2(c,data);   
    })
    }
    var newmarker2 = function(a,data){
        if(found){
            var markerPosition  = new kakao.maps.LatLng(data[a].Y좌표, data[a].X좌표);
            if (marker2) {
                // 기존의 마커가 존재할 경우 삭제
                marker2.setMap(null);
                infowindow2.close();
    
              }
             marker2 = new kakao.maps.Marker({
                position: markerPosition
            });
            marker2.position = markerPosition
            marker2.setMap(map);
            var iwContent2 = '<div style="padding:5px; width="auto";">'+data[a].정류소명+'</div>'
            var iwPosition2 = new kakao.maps.LatLng(data[a].Y좌표, data[a].X좌표); //인포윈도우 표시 위치입니다"
             infowindow2 = new kakao.maps.InfoWindow({
                position : iwPosition2,     
                content : iwContent2 
            });
            infowindow2.open(map, marker2); 
            moveMap(data[a].Y좌표, data[a].X좌표);
        }
    }
    var newmarker = function(a,data){
        if(found){
            var markerPosition  = new kakao.maps.LatLng(data[a].Y좌표, data[a].X좌표);
            if (marker) {
                // 기존의 마커가 존재할 경우 삭제
                marker.setMap(null);
                infowindow.close();
    
              }
             marker = new kakao.maps.Marker({
                position: markerPosition
            });
            marker.position = markerPosition
            marker.setMap(map);
            var iwContent = '<div style="padding:5px; width="auto";>'+data[a].정류소명+'</div>'
            var iwPosition = new kakao.maps.LatLng(data[a].Y좌표, data[a].X좌표); //인포윈도우 표시 위치입니다"
             infowindow = new kakao.maps.InfoWindow({
                position : iwPosition, 
                content : iwContent 
            });
            infowindow.open(map, marker); 
            moveMap(data[a].Y좌표, data[a].X좌표);
        }
    }

    
    var moveMap =function(x,y) {
        // 이동할 위도 경도 위치를 생성합니다 
        var moveLatLon = new kakao.maps.LatLng(x, y);
        map.setLevel(1)
        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        map.panTo(moveLatLon,1);            
    }     
       var searchfind = function(url){ 
            fetch(url)
            .then(response => response.json())
            .then(data => {
                var firstfound = document.getElementById("onefind"  );
                var firstfoundmobile = document.getElementById("firstFind");
                const dataItem = data.ServiceResult.msgBody;
                if (firstfound.childElementCount > 0) {
                    while (firstfound.firstChild) {
                        firstfound.removeChild(firstfound.firstChild);
                      }
                  }

                  if (firstfoundmobile.childElementCount > 0) {
                    while (firstfoundmobile.firstChild) {
                        firstfoundmobile.removeChild(firstfoundmobile.firstChild);
                      }
                  }

                if(typeof(dataItem) != "string"){
                    if(Array.isArray(dataItem.itemList)){
                    for(var i=0; i<dataItem.itemList.length; i++){ 
                        firstfound.innerHTML += "<h2>버스 이름: "+dataItem.itemList[i].busRouteAbrv+"</h2>" //버스명 먼저출력
                        firstfound.innerHTML += "<h3>첫번째 예정도착 시간: "+Math.floor((dataItem.itemList[i].exps1)/60)+"분 남았습니다.</h3>"//버스 시간
                        firstfound.innerHTML += "<h3>두번째 예정도착 시간: "+Math.floor((dataItem.itemList[i].exps2)/60) +"분 남았습니다.</h3>"//버스 시간
                        firstfound.innerHTML += "<h3>혼잡여부: "+honjob(dataItem.itemList[i].reride_Num1)+"</h3>"//버스 시간
                        firstfoundmobile.innerHTML += "<h2>버스 이름: "+dataItem.itemList[i].busRouteAbrv+"</h2>"
                        firstfoundmobile.innerHTML += "<h3>첫번째 예정도착 시간: "+Math.floor((dataItem.itemList[i].exps1)/60)+"분 남았습니다.</h3>"//버스 시간
                        firstfoundmobile.innerHTML += "<h3>두번째 예정도착 시간: "+Math.floor((dataItem.itemList[i].exps2)/60) +"분 남았습니다.</h3>"//버스 시간
                        firstfoundmobile.innerHTML += "<h3>혼잡여부: "+honjob(dataItem.itemList[i].reride_Num1)+"</h3>"//버스 시간

                    }
                }
                else{
                    firstfound.innerHTML += "<h2>버스 이름: "+dataItem.itemList.busRouteAbrv+"</h2>" //버스명 먼저출력
                    firstfound.innerHTML += "<h3>첫번째 예정도착 시간: "+Math.floor((dataItem.itemList.exps1)/60)+"분 남았습니다.</h3>"//버스 시간
                    firstfound.innerHTML += "<h3>두번째 예정도착 시간: "+Math.floor((dataItem.itemList.exps2)/60) +"분 남았습니다.</h3>"//버스 시간
                    firstfound.innerHTML += "<h3>혼잡여부: "+honjob(dataItem.itemList.reride_Num1)+"</h3>"//버스 시간
                    
                    firstfoundmobile.innerHTML += "<h2>버스 이름: "+dataItem.itemList.busRouteAbrv+"</h2>" //버스명 먼저출력
                    firstfoundmobile.innerHTML += "<h3>첫번째 예정도착 시간: "+Math.floor((dataItem.itemList.exps1)/60)+"분 남았습니다.</h3>"//버스 시간
                    firstfoundmobile.innerHTML += "<h3>두번째 예정도착 시간: "+Math.floor((dataItem.itemList.exps2)/60) +"분 남았습니다.</h3>"//버스 시간
                    firstfoundmobile.innerHTML += "<h3>혼잡여부: "+honjob(dataItem.itemList.reride_Num1)+"</h3>"//버스 시간

                }
                }

            else{
                firstfound.innerHTML += "<h2>버스를 찾을 수 없습니다.</h2>" //버스명 먼저출력

            }

            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        var searchfind2 = function(url){ 
            fetch(url)
            .then(response => response.json())
            .then(data => {
                var twofound = document.getElementById("towfind");
                const dataItem = data.ServiceResult.msgBody;
                var twofoundmobile = document.getElementById("secondFind");
                if (twofound.childElementCount > 0) {
                    while (twofound.firstChild) {
                        twofound.removeChild(twofound.firstChild);
                      }
                  }

                  if (twofoundmobile.childElementCount > 0) {   
                    while (twofoundmobile.firstChild) {
                        twofoundmobile.removeChild(twofoundmobile.firstChild);
                      }
                  }


                if(typeof(dataItem) != "string"){
                    if(Array.isArray(dataItem.itemList)){
                    for(var i=0; i<dataItem.itemList.length; i++){ 
                        twofound.innerHTML += "<h2>버스 이름: "+dataItem.itemList[i].busRouteAbrv+"</h2>" //버스명 먼저출력
                        twofound.innerHTML += "<h3>첫번째 예정도착 시간: "+Math.floor((dataItem.itemList[i].exps1)/60)+"분 남았습니다.</h3>"//버스 시간
                        twofound.innerHTML += "<h3>두번째 예정도착 시간: "+Math.floor((dataItem.itemList[i].exps2)/60) +"분 남았습니다.</h3>"//버스 시간
                        twofound.innerHTML += "<h3>혼잡여부: "+honjob(dataItem.itemList[i].reride_Num1)+"</h3>"//버스 시간
                        
                        twofoundmobile.innerHTML += "<h2>버스 이름: "+dataItem.itemList[i].busRouteAbrv+"</h2>" //버스명 먼저출력
                        twofoundmobile.innerHTML += "<h3>첫번째 예정도착 시간: "+Math.floor((dataItem.itemList[i].exps1)/60)+"분 남았습니다.</h3>"//버스 시간
                        twofoundmobile.innerHTML += "<h3>두번째 예정도착 시간: "+Math.floor((dataItem.itemList[i].exps2)/60) +"분 남았습니다.</h3>"//버스 시간
                        twofoundmobile.innerHTML += "<h3>혼잡여부: "+honjob(dataItem.itemList[i].reride_Num1)+"</h3>"//버스 시간
                    }
                }
                else{
                    twofound.innerHTML += "<h2>버스 이름: "+dataItem.itemList.busRouteAbrv+"</h2>" //버스명 먼저출력
                    twofound.innerHTML += "<h3>첫번째 예정도착 시간: "+Math.floor((dataItem.itemList.exps1)/60)+"분 남았습니다.</h3>"//버스 시간
                    twofound.innerHTML += "<h3>두번째 예정도착 시간: "+Math.floor((dataItem.itemList.exps2)/60) +"분 남았습니다.</h3>"//버스 시간
                    twofound.innerHTML += "<h3>혼잡여부: "+honjob(dataItem.itemList.reride_Num1)+"</h3>"//버스 시간
                    twofoundmobile.innerHTML += "<h2>버스 이름: "+dataItem.itemList.busRouteAbrv+"</h2>" //버스명 먼저출력
                    twofoundmobile.innerHTML += "<h3>첫번째 예정도착 시간: "+Math.floor((dataItem.itemList.exps1)/60)+"분 남았습니다.</h3>"//버스 시간
                    twofoundmobile.innerHTML += "<h3>두번째 예정도착 시간: "+Math.floor((dataItem.itemList.exps2)/60) +"분 남았습니다.</h3>"//버스 시간
                    twofoundmobile.innerHTML += "<h3>혼잡여부: "+honjob(dataItem.itemList.reride_Num1)+"</h3>"//버스 시간
                }
                }

            else{
                twofound.innerHTML += "<h2>버스를 찾을 수 없습니다.</h2>" //버스명 먼저출력

            }

            })
            .catch(error => {
                console.error('Error:', error);
            });
        }



}




function honjob(honjobdo){
    console.log("혼잡여부:"+honjobdo);
    if(honjobdo == "0"){
        return "혼잡도 정보가 없습니다";
    }
    else if(honjobdo == "1"){
        return "여유"
    }
    else if(honjobdo == "3"){
        return "보통"
    }
    else if(honjobdo == "4"){
        return "혼잡"
    }
    else{
        return "오류";
    }
}