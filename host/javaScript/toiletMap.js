window.onload = function () {
  const divElement = document.getElementById('mobile');
  if (window.getComputedStyle(divElement).display == "none") {
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

  const searchBarWeb = document.getElementById('searchWeb');//웹 검색창 id
  const searchBarmobile = document.getElementById('searchBus');//모바일 검색창 id
  document.getElementById("searchWeb").addEventListener('click', autoseachWeb());
  // document.getElementById("search").addEventListener('click',autoseach());

  if (window.getComputedStyle(divElement).display == "none") {
    document.getElementById('searchButtonWeb').addEventListener('click', function () {
      var newsearchkeyword = (searchBarWeb.value).split('(');
      searchjson("../src/toilet.json", newsearchkeyword);

      console.log()

    })// 검색버튼 클릭 시, 검색 함수실행
    document.getElementById('searchWeb').addEventListener('keyup', function (e) {// 키보드 엔터누를 시 검색 함수 실행
      var newsearchkeyword = (searchBarWeb.value).split('(');
      if (e.key === 'Enter') {
        searchjson("../src/toilet.json", newsearchkeyword);
      }
    })
  }

  else {
    document.getElementById('searchButton').addEventListener('click', function () {
      var newsearchkeyword = (searchBarWeb.value).split('(');
      searchjson("../src/toilet.json", newsearchkeyword);
    })// 검색버튼 클릭 시, 검색 함수실행
    document.getElementById('search').addEventListener('keyup', function (e) {// 키보드 엔터누를 시 검색 함수 실행
      var newsearchkeyword = (searchBarWeb.value).split('(');
      if (e.key === 'Enter') {
        searchjson("../src/toilet.json", newsearchkeyword);
      }
    })
  }


  var searchjson = function (url, newsearchkeyword) {//toilet json 불러오기
    fetch("../src/toilet.json")
      .then(response => response.json())
      .then(data => {
        var pickdata
        for (var i = 0; i < data.length; i++) {
          if (data[i].STIN_NM == newsearchkeyword[0] && data[i].LN_NM == newsearchkeyword[1]) {
            pickdata = data[i];
            break;
          }
        }
        var url = "https://openapi.kric.go.kr/openapi/convenientInfo/stationToilet?serviceKey=$2a$10$aihF6zdEqxESXd2GPktXouPUjN9/3sSSisvEzWwsUYJeZhWY/Iqa2&format=json&lnCd=" + pickdata.LN_CD + "&railOprIsttCd=" + pickdata.RAIL_OPR_ISTT_CD + "&stinCd=" + pickdata.STIN_CD;
        
        searchfind(url);//화장실 api 호출
        

      })
    var markerApt = function (pickdata){
      fetch("http://openapi.seoul.go.kr:8088/74776a5341746d6439394a57735854/json/subwayStationMaster/1/999")
      .then(response => response.json())
      .then(data => {
        for(var i=0; i<data.subwayStationMaster.list_total_count;i++){
          if(data.subwayStationMaster.row[i].STATN_NM == pickdata.STIN_NM && data.data.subwayStationMaster.row[i].ROUTE == pickdata.LN_NM)
          {
            newmarker(data.subwayStationMaster.row[i])
          }
        }
      })
    }
    var newmarker = function (data) {
      if (found) {
        var markerPosition = new kakao.maps.LatLng(data.CRDNT_Y, data.CRDNT_X);
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
        var iwContent = '<div style="padding:5px;">' + data.STATN_NM + '</div>'
        var iwPosition = new kakao.maps.LatLng(data.CRDNT_Y, data.CRDNT_X); //인포윈도우 표시 위치입니다"
        infowindow = new kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent
        });
        infowindow.open(map, marker);
        moveMap(data.CRDNT_Y, data.CRDNT_X);
      }
    }

    var moveMap = function (x, y) {
      // 이동할 위도 경도 위치를 생성합니다 
      var moveLatLon = new kakao.maps.LatLng(x, y);
      map.setLevel(1)
      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      map.panTo(moveLatLon, 1);
    }


    var searchfind = function (url) {
      fetch(url)
        .then(response => response.text())
        .then(xmlText => {
          while (searchbusall.firstChild) {
            searchbusall.removeChild(searchbusall.firstChild);
          }
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
          const newItem = xmlDoc.querySelectorAll('itemList');
          const searchbusall = document.getElementById('busFieldWeb');
          for (var i = 0; i < newItem.length; i++) {
            searchbusall.innerHTML += "<h2>버스 이름: " + newItem[i].busRouteAbrv + "</h2>" //버스명 먼저출력
            searchbusall.innerHTML += "<h3>첫번째 예정도착 시간: " + newItem[i].vehId1 + "분 남았습니다.</h3>"//버스 시간
            searchbusall.innerHTML += "<h3>두번째 예정도착 시간: " + newItem[i].vehId1 + "분 남았습니다.</h3>"//버스 시간
          }

        })
        .catch(error => {
          console.error('Error:', error);
        });
    }



  }



  //오토서치 총합

  function autoseachWeb() {
    var url = "../src/toilet.json"
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const dataList = [];

        var count = data.length;
        for (var i = 0; i < count; i++) {
          dataList.push(data[i].STIN_NM + "(" + data[i].LN_NM + ")");
        }

        const $search = document.querySelector("#searchWeb");//$search 변수에 id search 를 담겠다. 
        const $autoComplete = document.querySelector(".autocompletetoilteWeb");

        let nowIndex = 0;
        let matchDataList = [];

        $search.addEventListener("input", () => {
          // 검색어
          const value = $search.value.trim();

          // 자동완성 필터링
          matchDataList = value
            ? dataList.filter((label) => label.includes(value))
            : [];

          // 리스트 보여주기
          showList(matchDataList, value, nowIndex);
        });

        $search.addEventListener("keydown", (event) => {
          switch (event.keyCode) {
            // UP KEY
            case 38:
              event.preventDefault();
              nowIndex = Math.max(nowIndex - 1, 0);
              updateHighlightedItem();
              break;

            // DOWN KEY
            case 40:
              event.preventDefault();
              nowIndex = Math.min(nowIndex + 1, matchDataList.length - 1);
              updateHighlightedItem();
              break;

            // ENTER KEY
            case 13:
              event.preventDefault();
              selectItem();
              break;

            // ESC KEY
            case 27:
              event.preventDefault();
              clearAutoComplete();
              break;
          }
        });

        $autoComplete.addEventListener("mousedown", (event) => {
          event.preventDefault();
          selectItem();
        });

        function updateHighlightedItem() {
          const items = $autoComplete.querySelectorAll(".autocomplete-item");
          items.forEach((item, index) => {
            item.classList.toggle("active", index === nowIndex);
          });
        }

        function selectItem() {
          const selectedValue = matchDataList[nowIndex];
          $search.value = selectedValue || "";
          clearAutoComplete();
        }

        function clearAutoComplete() {
          $autoComplete.innerHTML = "";
          $autoComplete.classList.remove("active");
          nowIndex = 0;
          matchDataList = [];
        }

        function showList(data, value) {
          const regex = new RegExp(`(${value})`, "g");
          $autoComplete.innerHTML = data
            .map(
              (label) => `
            <div class='autocomplete-item'>
              ${label.replace(regex, "<mark>$1</mark>")}
            </div>
          `
            )
            .join("");

          $autoComplete.classList.toggle("active", data.length > 0);

          // 호버 효과 적용
          const items = $autoComplete.querySelectorAll(".autocomplete-item");
          items.forEach((item, index) => {
            item.addEventListener("mouseenter", () => {
              nowIndex = index;
              updateHighlightedItem();
            });

            item.addEventListener("mouseleave", () => {
              item.classList.remove("active");
            });
          });
        }

      })
      .catch(error => {
        console.error(error);
      });
  }

  //모바일 자동검색 펑션
  function autoseach() {
    var url = "../src/toilet.json"
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const dataList = [];

        var count = data.length;
        for (var i = 1; i < count; i++) {
          dataList.push(data[i].STIN_NM + "(" + data[i].LN_NM + ")");
        }

        const $search = document.querySelector("#search");//$search 변수에 id search 를 담겠다. 
        const $autoComplete = document.querySelector(".autocompletetoilteWeb");

        let nowIndex = 0;
        let matchDataList = [];

        $search.addEventListener("input", () => {
          // 검색어
          const value = $search.value.trim();

          // 자동완성 필터링
          matchDataList = value
            ? dataList.filter((label) => label.includes(value))
            : [];

          // 리스트 보여주기
          showList(matchDataList, value, nowIndex,indexnum);
        });

        $search.addEventListener("keydown", (event) => {
          switch (event.keyCode) {
            // UP KEY
            case 38:
              event.preventDefault();
              nowIndex = Math.max(nowIndex - 1, 0);
              updateHighlightedItem();
              break;

            // DOWN KEY
            case 40:
              event.preventDefault();
              nowIndex = Math.min(nowIndex + 1, matchDataList.length - 1);
              updateHighlightedItem();
              break;

            // ENTER KEY
            case 13:
              event.preventDefault();
              selectItem();
              break;

            // ESC KEY
            case 27:
              event.preventDefault();
              clearAutoComplete();
              break;
          }
        });

        $autoComplete.addEventListener("mousedown", (event) => {
          event.preventDefault();
          selectItem();
        });

        function updateHighlightedItem() {
          const items = $autoComplete.querySelectorAll(".autocomplete-item");
          items.forEach((item, index) => {
            item.classList.toggle("active", index === nowIndex);
          });
        }

        function selectItem() {
          const selectedValue = matchDataList[nowIndex];
          $search.value = selectedValue || "";
          clearAutoComplete();
        }

        function clearAutoComplete() {
          $autoComplete.innerHTML = "";
          $autoComplete.classList.remove("active");
          nowIndex = 0;
          matchDataList = [];
        }

        function showList(data, value) {
          const regex = new RegExp(`(${value})`, "g");
          $autoComplete.innerHTML = data
            .map(
              (label) => `
            <div class='autocomplete-item'>
              ${label.replace(regex, "<mark>$1</mark>")}
            </div>
          `
            )
            .join("");

          $autoComplete.classList.toggle("active", data.length > 0);

          // 호버 효과 적용
          const items = $autoComplete.querySelectorAll(".autocomplete-item");
          items.forEach((item, index) => {
            item.addEventListener("mouseenter", () => {
              nowIndex = index;
              updateHighlightedItem();
            });

            item.addEventListener("mouseleave", () => {
              item.classList.remove("active");
            });
          });
        }

      })
      .catch(error => {
        console.error(error);
      });
  }
}