
const appkey = "74776a5341746d6439394a57735854";

    var startIndex = 1
    var endIndex = 999;
    var url = "http://openapi.seoul.go.kr:8088/"+appkey+"/json/SeoulMetroFaciInfo/"+startIndex+"/"+endIndex+"/";
    fetch(url)
    .then(response => response.json())
      .then(data => {
        const uniqueDataList = [];
        for(var i = 0; i<endIndex; i++){
      }
        


      })
      .catch(error => {
        console.error(error);
      });   

 
