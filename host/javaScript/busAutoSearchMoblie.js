
var url = "../src/bus.json"


document.getElementById("searchBus").addEventListener('click',autoseach());
function autoseach(){
fetch(url)
  .then(response => response.json())
  .then(data => {

    var count = data.length;
    const uniqueDataList = [];
    for (var i = 1; i < count; i++) {
      const stationName = data[i].정류소명;
      if (!uniqueDataList.includes(stationName)) {
        uniqueDataList.push(stationName);
      } 
    }

    // 중복값이 제거된 배열을 사용할 수 있습니다.
    dataList.length = 0; // 기존의 데이터 초기화
    uniqueDataList.forEach(item => dataList.push(item))

         const $search = document.querySelector("#searchBus");//$search 변수에 id search 를 담겠다. 
         const $autoComplete = document.querySelector("#searchfind");
         
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
