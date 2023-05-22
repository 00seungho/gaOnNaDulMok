
const appkey = "74776a5341746d6439394a57735854";

    var startIndex = 1;
    var endIndex = 999;
    var url = "http://openapi.seoul.go.kr:8088/"+appkey+"/json/SeoulMetroFaciInfo/"+startIndex+"/"+endIndex+"/";
    function fetchData() {
        return fetch(url) 
            .then(response => response.json());

    }
    fetchData()
      .then(data => {
        var count = data.SeoulMetroFaciInfo.list_total_count;
        const uniqueDataList = [];
        for(var i = 0; i<endIndex; i++){
        uniqueDataList[i] = data.SeoulMetroFaciInfo.row[i]

        for(var i=0; i<endIndex; i++){
            console.log(uniqueDataList[i]);
        }
    }
        


      })
      .catch(error => {
        console.error(error);
      });   

 
