function onGeoOkay(position) {
    console.log(position.latitude);
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);
var iwContent = '<div style="padding:5px">현재위치<a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667"</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    position : iwPosition, 
    content : iwContent 
});
  
// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
infowindow.open(map, marker); 
    
}

  function onGeoError() {
    alert("현재 위치정보를 거절하셨습니다. 지도위에 정보를 표시하지 못합니다.");
    
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
          mapOption = { 
              center: new kakao.maps.LatLng(37.566352778, 126.977952778), // 지도의 중심좌표
              level: 3 // 지도의 확대 레벨
          };
      
      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
      
      // 마커가 표시될 위치입니다 
      var markerPosition  = new kakao.maps.LatLng(37.566352778, 126.977952778); 
      
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
          position: markerPosition
      });
      
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
      }
      // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
      //marker.setMap(null);    
      
  navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);
    
 