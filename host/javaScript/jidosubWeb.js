var mymy;
//현재위치 가져오는 함수 초기설정
var options = {
    enableHighAccuracy: true,   //정확도 true
    timeout: 5000, //불러오는데 걸리는 최대시간 기다림
    maximumAge: 0
};


    function openkakaomap(position){
        var mapContainer = document.getElementById('map') // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude), // 지도의 중심좌표에 현재위치를 입력
            level: 3 // 지도의 확대 레벨
        };
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        var positions = [// 마커객체
        {
            latlng: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)// 마커위치
        }
    ]
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[0].latlng // 마커의 위치
        });
        marker.setMap(map);

    }
 
   window.onload=function (){
    const divElement = document.getElementById('moblie');   
    if(window.getComputedStyle(divElement).display == "none"){
    const chang = document.getElementById("map");
    chang.id = "map2"; 
}


    function onGeoOkay(position){ // 정보를 받아올 수 있을때, position 을 매개변수, position은 객체형식의 현재위치를 가지고있음
        openkakaomap(position)
    
        if(window.getComputedStyle(divElement).display == "none"){
            document.getElementById('searchButtonWeb').addEventListener('click', enter)// 검색버튼 클릭 시, 검색 함수실행
            document.getElementById('searchWeb').addEventListener('keyup', function (e) {// 키보드 엔터누를 시 검색 함수 실행
                if (e.key === 'Enter') {
                    enter();
                }
            })
        }

        else{
        document.getElementById('searchButton').addEventListener('click', enter)// 검색버튼 클릭 시, 검색 함수실행
        document.getElementById('search').addEventListener('keyup', function (e) {// 키보드 엔터누를 시 검색 함수 실행
            if (e.key === 'Enter') {
                enter();
            }
        })
    }

        function enter() {//검색함수
            
            fetch("http://openapi.seoul.go.kr:8088/74776a5341746d6439394a57735854/json/subwayStationMaster/1/999")//자동완성 데이터
                .then(response => response.json())
                .then(data => {
                    const count = data.subwayStationMaster.list_total_count; //자동완성 역사 총 갯수
                    const temp = {};//자동완성 된 역사의 코드전체를 담을 배열
                    var i;
                    var j = 0;
                    if(window.getComputedStyle(divElement).display != "none"){
                    for (i = 0; i < count; i++) {
                        if (document.getElementById('search').value == data.subwayStationMaster.row[i].STATN_NM) { // input search의 값을 읽고, 역의 이름과 비교
                            temp[j] = data.subwayStationMaster.row[i];//이름이 같다면, 역의 객체를 temp에 담음
                            j++;
                        }
                    }
                }
                else{
                    for (i = 0; i < count; i++) {
                        if (document.getElementById('searchWeb').value == data.subwayStationMaster.row[i].STATN_NM) { // input search의 값을 읽고, 역의 이름과 비교
                            temp[j] = data.subwayStationMaster.row[i];//이름이 같다면, 역의 객체를 temp에 담음
                            j++;
                        }
                    }
                }


                    var trainCode = [];
                    for (var i = 0; i < Object.keys(temp).length; i++) {
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
                            if(window.getComputedStyle(divElement).display == "none"){
                                if ((document.getElementById('searchFindAllSubWebEvWeb') != null)) {
                                    document.getElementById('searchFindAllSubWebEvWeb').remove();
                                }
    
                                if ((document.getElementById('searchFindAllSubWebWlWeb') != null)) {
                                    document.getElementById('searchFindAllSubWebWlWeb').remove();
                                }
                            }
   
                            else{
                            if ((document.getElementById('searchFindAllSubWebEvApp') != null)) {
                                document.getElementById('searchFindAllSubWebEvApp').remove();
                            }

                            if ((document.getElementById('searchFindAllSubWebWlApp') != null)) {
                                document.getElementById('searchFindAllSubWebWlApp').remove();
                            }
                        }

                            while (true) {
                                if (endidx > countSeoulMetroFaciInfo + 998)
                                    break;
                                url = "http://openapi.seoul.go.kr:8088/74776a5341746d6439394a57735854/json/SeoulMetroFaciInfo/" + startidx + "/" + endidx + "/";

                                fetchSeoulMetroFaciInfo(url, trainCode);
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

        }




    }
    

    function onGeoError() {
        const newposition = {
            coords: {
              latitude: 37.563685889 // 실제 위도 값을 여기에 입력
              ,longitude: 126.975584404
            }
          };
        openkakaomap(newposition)

   



        document.getElementById('searchButtonWeb').addEventListener('click', enter)// 검색버튼 클릭 시, 검색 함수실행
        document.getElementById('searchWeb').addEventListener('keyup', function (e) {// 키보드 엔터누를 시 검색 함수 실행
            if (e.key === 'Enter') {
                enter();
            }
        })


        function enter() {//검색함수
            fetch("http://openapi.seoul.go.kr:8088/74776a5341746d6439394a57735854/json/subwayStationMaster/1/999")//자동완성 데이터
                .then(response => response.json())
                .then(data => {
                    const count = data.subwayStationMaster.list_total_count; //자동완성 역사 총 갯수
                    const temp = {};//자동완성 된 역사의 코드전체를 담을 배열
                    var i;
                    var j = 0;
                    for (i = 0; i < count; i++) {
                        if (document.getElementById('searchWeb').value == data.subwayStationMaster.row[i].STATN_NM) { // input search의 값을 읽고, 역의 이름과 비교
                            temp[j] = data.subwayStationMaster.row[i];//이름이 같다면, 역의 객체를 temp에 담음
                            j++;
                        }
                    }

                    positions[1] = { // 마커의 인포윈도우
                        content: '<div">' + document.getElementById('searchWeb').value + '</div>',
                        latlng: new kakao.maps.LatLng(temp[0].CRDNT_Y, temp[0].CRDNT_X)
                    }

                    // 마커를 생성합니다


                    // 마커에 표시할 인포윈도우를 생성합니다 
                    var infowindow = new kakao.maps.InfoWindow({
                        content: positions[1].content // 인포윈도우에 표시할 내용
                    });
                    // 이동할 위도 경도 위치를 생성합니다 
                    var moveLatLon = new kakao.maps.LatLng(temp[0].CRDNT_Y, temp[0].CRDNT_X);
                    marker.setPosition(positions[1].latlng);
                    // 지도 중심을 부드럽게 이동시킵니다
                    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
                    map.panTo(moveLatLon);
                    var trainCode = [];
                    for (var i = 0; i < Object.keys(temp).length; i++) {
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
                            if ((document.getElementById('searchFindAllSubWebEvWeb') != null)) {
                                document.getElementById('searchFindAllSubWebEvWeb').remove();
                            }

                            if ((document.getElementById('searchFindAllSubWebWlWeb') != null)) {
                                document.getElementById('searchFindAllSubWebWlWeb').remove();
                            }

                            if ((document.getElementById('searchFindAllSubWebEvApp') != null)) {
                                document.getElementById('searchFindAllSubWebEvApp').remove();
                            }

                            if ((document.getElementById('searchFindAllSubWebWlApp') != null)) {
                                document.getElementById('searchFindAllSubWebWlApp').remove();
                            }

                            while (true) {
                                if (endidx > countSeoulMetroFaciInfo + 998)
                                    break;
                                url = "http://openapi.seoul.go.kr:8088/74776a5341746d6439394a57735854/json/SeoulMetroFaciInfo/" + startidx + "/" + endidx + "/";

                                fetchSeoulMetroFaciInfo(url, trainCode);
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

        }
  

    }
    navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError, options);






    function fetchSeoulMetroFaciInfo(url, trainCode) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                var searchfind = document.getElementById("searchSectionWeb");
                document.getElementById("evSelectorFieldWeb").innerHTML += "<div id ='searchFindAllSubWebEvWeb'></div>";
                document.getElementById("wlSelectorFieldWeb").innerHTML += "<div id ='searchFindAllSubWebWlWeb'></div>";
                document.getElementById("evSelectorFieldApp").innerHTML += "<div id ='searchFindAllSubWebEvApp'></div>";
                document.getElementById("wlSelectorFieldApp").innerHTML += "<div id ='searchFindAllSubWebWlApp'></div>";

                var searchFindAllEvWeb = document.getElementById("searchFindAllSubWebEvWeb")
                var searchFindAllWlWeb = document.getElementById("searchFindAllSubWebWlWeb")
                var searchFindAllEvApp = document.getElementById("searchFindAllSubWebEvApp")
                var searchFindAllWlApp = document.getElementById("searchFindAllSubWebWlApp")

                for (var i = 0; i < trainCode.length; i++) {
                    for (var j = 0; j < data.SeoulMetroFaciInfo.row.length; j++) {
                        if (trainCode[i] == data.SeoulMetroFaciInfo.row[j].STATION_ID && (data.SeoulMetroFaciInfo.row[j].GUBUN == "EV" )) {
                            searchFindAllEvWeb.innerHTML += "<h3> 역명 : " + data.SeoulMetroFaciInfo.row[j].STATION_NM + "</h3>";
                            searchFindAllEvWeb.innerHTML += "<h4> 운행구간 : " + data.SeoulMetroFaciInfo.row[j].STUP_LCTN + "</h4>";
                            searchFindAllEvWeb.innerHTML += "<h4> 위치 : " + data.SeoulMetroFaciInfo.row[j].LOCATION + "</h4>";
                            searchFindAllEvWeb.innerHTML += "<h4> 현재 상태 : " + data.SeoulMetroFaciInfo.row[j].USE_YN + "</h4>";
                            searchFindAllEvWeb.innerHTML += "</br>";

                            searchFindAllEvApp.innerHTML += "<h3> 역명 : " + data.SeoulMetroFaciInfo.row[j].STATION_NM + "</h3>";
                            searchFindAllEvApp.innerHTML += "<h4> 운행구간 : " + data.SeoulMetroFaciInfo.row[j].STUP_LCTN + "</h4>";
                            searchFindAllEvApp.innerHTML += "<h4> 위치 : " + data.SeoulMetroFaciInfo.row[j].LOCATION + "</h4>";
                            searchFindAllEvApp.innerHTML += "<h4> 현재 상태 : " + data.SeoulMetroFaciInfo.row[j].USE_YN + "</h4>";
                            searchFindAllEvApp.innerHTML += "</br>";
                        }
                        else if (trainCode[i] == data.SeoulMetroFaciInfo.row[j].STATION_ID && (data.SeoulMetroFaciInfo.row[j].GUBUN == "WL" )){
                            searchFindAllWlWeb.innerHTML += "<h3> 역명 : " + data.SeoulMetroFaciInfo.row[j].STATION_NM + "</h3>";
                            searchFindAllWlWeb.innerHTML += "<h4> 운행구간 : " + data.SeoulMetroFaciInfo.row[j].STUP_LCTN + "</h4>";
                            searchFindAllWlWeb.innerHTML +=  "<h4> 위치 : " + data.SeoulMetroFaciInfo.row[j].LOCATION + "</h4>";
                            searchFindAllWlWeb.innerHTML += "<h4> 현재 상태 : " + data.SeoulMetroFaciInfo.row[j].USE_YN + "</h4>";
                            searchFindAllWlWeb.innerHTML += "</br>";
                            searchFindAllWlApp.innerHTML += "<h3> 역명 : " + data.SeoulMetroFaciInfo.row[j].STATION_NM + "</h3>";
                            searchFindAllWlApp.innerHTML += "<h4> 운행구간 : " + data.SeoulMetroFaciInfo.row[j].STUP_LCTN + "</h4>";
                            searchFindAllWlApp.innerHTML += "<h4> 위치 : " + data.SeoulMetroFaciInfo.row[j].LOCATION + "</h4>";
                            searchFindAllWlApp.innerHTML += "<h4> 현재 상태 : " + data.SeoulMetroFaciInfo.row[j].USE_YN + "</h4>";
                            searchFindAllWlApp.innerHTML += "</br>";
                        }
                    }
                }

                document.getElementById("gongBAck").style.display ="none"

            })
            .catch(error => {
                alert("검색 결과가 없습니다!")
                console.error(error);
            });

    }
}



function hideEv(){
    document.getElementById("evSelectorFieldWeb").style.display = "none"
    document.getElementById("wlSelectorFieldWeb").style.display = ""
    document.getElementById("evSelectorFieldApp").style.display = "none"
    document.getElementById("wlSelectorFieldApp").style.display = ""

}

function hideWl(){
    document.getElementById("evSelectorFieldWeb").style.display = ""
    document.getElementById("wlSelectorFieldWeb").style.display = "none"
    document.getElementById("evSelectorFieldApp").style.display = ""
    document.getElementById("wlSelectorFieldApp").style.display = "none"

}

