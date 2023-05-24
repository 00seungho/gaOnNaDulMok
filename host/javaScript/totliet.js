//현재위치 가져오는 함수 초기설정
var options = {
    enableHighAccuracy: true,   //정확도 true
    timeout: 5000, //불러오는데 걸리는 최대시간 기다림
    maximumAge: 0
};

window.onload = function () {
    function onGeoOkay(position) {// 정보를 받아올 수 있을때, position 을 매개변수, position은 객체형식의 현재위치를 가지고있음
        var mapContainer = document.getElementById('map') // 지도를 표시할 div 

        mapOption = {
            center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude), // 지도의 중심좌표에 현재위치를 입력
            level: 3 // 지도의 확대 레벨
        };




        var imageSize = new kakao.maps.Size(24, 35); //마커의 크기설정
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        // 마커를 생성합니다
        var positions = [// 마커객체
            {
                content: '<div>현재위치</div>',// 표시명 
                latlng: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)// 마 커위치
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
        infowindow.open(map, marker);//마커 정보 지도위에 표시
    }
    function onGeoError() {
        var mapContainer = document.getElementById('map') // 지도를 표시할 div 

        mapOption = {
            center: new kakao.maps.LatLng(37.563685889, 126.975584404), // 지도의 중심좌표에 현재위치를 입력
            level: 3 // 지도의 확대 레벨
        };




        var imageSize = new kakao.maps.Size(24, 35); //마커의 크기설정
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        // 마커를 생성합니다
        var positions = [// 마커객체
            {
                content : "<div>시청역</div>",
                latlng: new kakao.maps.LatLng(37.563685889, 126.975584404)// 마커위치
            },
        ]
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[0].latlng // 마커의 위치
        });
        var infowindow = new kakao.maps.InfoWindow({
            content: positions[0].content // 인포윈도우에 표시할 내용
        });
        // 마커를 생성합니다
        infowindow.open(map, marker);//마커 정보 지도위에 표시
        // 마커에 표시할 인포윈도우를 생성합니다 
    }
    navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError, options);

}