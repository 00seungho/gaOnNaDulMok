window.onload = function(){
    const divElement = document.getElementById('mobile');   
    if(window.getComputedStyle(divElement).display == "none"){
    const chang = document.getElementById("map");
    var found = false;

    chang.id = "map2"; 
    }
    var marker = null; // 현재 마커 객체를 저장할 변수
    var infowindow = null;

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
            searchfind
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
        newmarker(a,data);
        searchfind("http://ws.bus.go.kr/api/rest/arrive/getLowArrInfoByStId?stId=100000002&serviceKey=NiGhn1xzYgu3Jk2dfWcsdseqg0Iufba%2FpRhl0nHbuNsDK8poZ0xTKBgyTNO0mzWieKL4TtLgCY0oTGD15kFlWw%3D%3D");
        })
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
            var iwContent = '<div style="padding:5px;">'+data[a].정류소명+'</div>'
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
            fetch(url, { method: "GET", mode: 'no-cors', headers: { 'Access-Control-Allow-Origin': true, 'Content-Type': 'text/xml' }})
            .then(response => response.text())
            .then(xmlText => {
                console.log(xmlText);

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                const newItem = xmlDoc.querySelectorAll('itemList');
                const searchbusall = document.getElementById('busFieldWeb');
                for(var i=0; i<newItem.length; i++){ 
                    searchbusall.innerHTML += "<h2>버스 이름: "+newItem[i].busRouteAbrv+"</h2>" //버스명 먼저출력
                    searchbusall.innerHTML += "<h3>첫번째 예정도착 시간: "+newItem[i].vehId1+"분 남았습니다.</h3>"//버스 시간
                    searchbusall.innerHTML += "<h3>두번째 예정도착 시간: "+newItem[i].vehId1+"분 남았습니다.</h3>"//버스 시간
                }
            
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }



}




