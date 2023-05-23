var mymy;

var options = {
    enableHighAccuracy: true,   
    timeout: 5000,
    maximumAge: 0
  };
function onGeoOkay(position) {
    var mapContainer = document.getElementById('map') // 지도를 표시할 div 

    mapOption = { 
        center: new kakao.maps.LatLng(position.coords.latitude,position.coords.longitude), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


var imageSize = new kakao.maps.Size(24, 35); 
// 마커를 생성합니다
var positions = [
    {
        content: '<div>현재위치</div>', 
        latlng: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)
    },
]
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[0].latlng // 마커의 위치
    });

    // 마커에 표시할 인포윈도우를 생성합니다 
    var infowindow = new kakao.maps.InfoWindow({
        content: positions[0].content // 인포윈도우에 표시할 내용
    });
    infowindow.open(map, marker);

document.getElementById('searchButton').addEventListener('click', function(){
    //지도에 마커를 띄움
    fetch("http://openapi.seoul.go.kr:8088/74776a5341746d6439394a57735854/json/subwayStationMaster/1/999")
    .then(response => response.json())
    .then(data => {
        const count = data.subwayStationMaster.list_total_count;
        const temp = {};
        var i;
        var j =0;
        for (i = 0; i < count; i++) {
            if (document.getElementById('search').value == data.subwayStationMaster.row[i].STATN_NM) {
                temp[j] = data.subwayStationMaster.row[i];
                j++;
            }
        }
        positions[1] = {
            content: '<div>' + document.getElementById('search').value+'</div>',
            latlng: new kakao.maps.LatLng(temp[0].CRDNT_Y, temp[0].CRDNT_X)
        }

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[1].latlng // 마커의 위치
        });

        // 마커에 표시할 인포윈도우를 생성합니다 
        var infowindow = new kakao.maps.InfoWindow({
            content: positions[1].content // 인포윈도우에 표시할 내용
        });
        infowindow.open(map, marker);
        // 이동할 위도 경도 위치를 생성합니다 
        var moveLatLon = new kakao.maps.LatLng(temp[0].CRDNT_Y, temp[0].CRDNT_X);

        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        map.panTo(moveLatLon);
        var trainCode = [];
        for(var i = 0; i<Object.keys(temp).length; i++){
            trainCode.push(temp[i].STATN_ID);
        }
        //
        var url = "http://openapi.seoul.go.kr:8088/74776a5341746d6439394a57735854/json/SeoulMetroFaciInfo/1/2/"
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const countSeoulMetroFaciInfo = data.SeoulMetroFaciInfo.list_total_count;
            startidx = 1;
            endidx = startidx + 998;
            
            while(true)
            {
                if(endidx > countSeoulMetroFaciInfo+998)
                    break;
                url = "http://openapi.seoul.go.kr:8088/74776a5341746d6439394a57735854/json/SeoulMetroFaciInfo/" + startidx + "/" + endidx + "/";
               
                fetchSeoulMetroFaciInfo(url,trainCode);
                startidx = endidx + 1;
                endidx = startidx + 998;
            }
            
            
   
    })
   .catch(error => {
       console.error(error);
   });
       
    })

    .catch(error => {
        alert("역을 찾을 수 없습니다!")
        console.error(error);
    });

    })
    //지도에 마커를 띄움




    
}

  function onGeoError() {
    alert("위치정보를 불러올 수 없습니다. 지도를 표시합니다.");
    
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
          mapOption = { 
              center: new kakao.maps.LatLng(37.566352778, 126.977952778), // 지도의 중심좌표
              level: 3 // 지도의 확대 레벨
          };
      
      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
      
}

navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError, options);



function fetchSeoulMetroFaciInfo(url,trainCode){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        for(var i = 0; i<trainCode.length; i++){
            for(var j = 0 ; j < data.SeoulMetroFaciInfo.row.length ; j++){
                    if(trainCode[i]==data.SeoulMetroFaciInfo.row[j].STATION_ID){
                        const searchfind = document.getElementById("searchfind");
                        searchfind.innerHTML += "<div id ='searchfindall'>";
                        searchfind.innerHTML += "<h3> 역명 : "+data.SeoulMetroFaciInfo.row[j].STATION_NM+"<h4>";
                        searchfind.innerHTML += "<h4> 운행구간 : "+data.SeoulMetroFaciInfo.row[j].STUP_LCTN+"<h4>";
                        searchfind.innerHTML += "<h4> 위치 : "+data.SeoulMetroFaciInfo.row[j].LOCATION	+"<h4>";
                        searchfind.innerHTML += "<h4> 승강기 상태 : "+data.SeoulMetroFaciInfo.row[j].USE_YN	+"<h4>";               
                        searchfind.innerHTML += "</div>";
                    }
            }
        }
        
})
.catch(error => {
    alert("검색 결과가 없습니다!")
    console.error(error);
});

}

        
