var options = {
    enableHighAccuracy: true,   
    timeout: 5000,
    maximumAge: 0
  };
function buttonOnClick(){

}
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
    const appkey = "74776a5341746d6439394a57735854";
    var url = "http://openapi.seoul.go.kr:8088/"+appkey+"/json/subwayStationMaster/1/999"
fetch(url)
    .then(response => response.json())
      .then(data => {
       const count = data.subwayStationMaster.list_total_count;
       const temp = {};
        for(i = 0; i< count; i++)
        {
            const temp ={}
            if(document.getElementById('search').value == data.subwayStationMaster.row[i].STATN_NM)
            {
                break;
            }
        }
        console.log(i)
        console.log(data.subwayStationMaster.row[i].STATN_NM)
      positions[1] = {
        content: '<div>'+document.getElementById('search').value+"역"+'</div>',
        latlng: new kakao.maps.LatLng(data.subwayStationMaster.row[i].CRDNT_Y, data.subwayStationMaster.row[i].CRDNT_X)
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
        var moveLatLon = new kakao.maps.LatLng(data.subwayStationMaster.row[i].CRDNT_Y, data.subwayStationMaster.row[i].CRDNT_X);
        
        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        map.panTo(moveLatLon);            
            
      })
      
      .catch(error => {
        console.error(error);
      });   
    })


// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 


    
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
      