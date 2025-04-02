// 可增加 : 全台數據再篩選下方 整年數據
// 圖表 圓餅圖
function creatChart(){
  new Chart(document.getElementById("myChart_1"+dragId), {
    type: 'pie',
    data: {
        labels: [taiwanlocalName[cityInfo],'全台'],
        datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#3e95cd","#3cba9f"],
            data: [taiwanlocalNameNumber[cityInfo],taiwanlocalNameNumber.reduce((a,b)=>a+b) - taiwanlocalNameNumber[cityInfo]]
        }]
    },
    options: {
        title: {
            display: true,
            text: datakindselect
        }
    }
  });

  // 長條圖
  new Chart(document.getElementById("myChart_2"+dragId), {
    type: 'bar',
    data: {
        labels: [taiwanlocalName[cityInfo],'全台'],
        datasets: [
            {
                label: "數量",
                backgroundColor: ["#3e95cd","#3cba9f"],
                data: [taiwanlocalNameNumber[cityInfo],taiwanlocalNameNumber.reduce((a,b)=>a+b) - taiwanlocalNameNumber[cityInfo]]
            }
        ]
    },
    options: {
      title: {
          display: true,
          text: datakindselect
      }
    }
  });

  // 曲線圖
  new Chart(document.getElementById("myChart_3"+dragId), {
    type: 'bar',
    data: {
        labels: yearRange,
        datasets: [{
                label: "2018/5~至今",
                type: "line",
                borderColor: "#3cba9f",
                data: datamonth[cityInfo],
                fill: true
            }
        ]
    },
    options: {
      title: {
          display: true,
          text: datakindselect
      }
    }
  });
}
function jsTabs(evt, tabId,tabnum) {
  var tabcontent, tablinks;
  for (var i=0;i<3;i++){
    var sttr = '#tab'+i+tabnum;
    var attr = '#a'+i+tabnum;
    $(sttr).hide();
    $(attr).attr('class','tabs-menu');
  }
  
  var tab = document.getElementById(tabId);
  tab.style.display = "block";
  evt.currentTarget.className += " tabs-menu-active";
  return false;
}








