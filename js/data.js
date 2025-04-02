var datamonth = new Array(taiwanlocalName.length-1);
var datakindselect = '';
var datacolor = [];
var datax = 0;
taiwanlocalName.forEach(function(e,i){
  datamonth[i] = [];
});
function setdate(setdata){
  $.getJSON('https://cors-anywhere.herokuapp.com/'+setdata, function(data) {
    ohdogcatData = data;
    ohdogcatData.forEach(function(e,i){
    var rptyear = e['rpt_year']; // 年
    var rptmonth = e['rpt_month']; // 月
    var sheaddres = e['rpt_country']; // 縣市
    
    if(!yearRange.includes(rptyear+"/"+rptmonth)){
      yearRange.push(rptyear+"/"+rptmonth);
    }
    });
    
    if (yearRange[yearRange.length - 1] == "2018/5"){
        yearRange.reverse();
      }
      $('#DataMap_slider').prop({
          'min': 0,
          'max': yearRange.length - 1,
          'value':0
      });
      
      var slider = document.getElementById("DataMap_slider");
      var output = document.getElementById("yeardemo");
      var date = yearRange[yearRange.length - 1].split("/");
      output.innerHTML = "2018/5";
      
      slider.oninput = function() {
        var date = yearRange[this.value].split("/");
        output.innerHTML = date[0] + "/" + date[1];
        datadate = date[0] + "/" + date[1];
      }
  });
}



function getdata(datavariable,kindvar,datedata){  //  獲取資料及資料區分
  console.log('getdata');
  var date = datedata.split("/");
  
    $.getJSON('https://cors-anywhere.herokuapp.com/'+datavariable, function(data) {
    //data is the JSON string
      ohdogcatData = data;
      var labelname = '';
      ohdogcatData.forEach(function(e,i){
        
        var rptyear = e['rpt_year']; // 年
        var rptmonth = e['rpt_month']; // 月
        var sheaddres = e['rpt_country']; // 縣市
        var acceptnum = e['accept_num'];  // 總收容數
        var adoptrateData = e['adopt_rate'];  // 認養率
        var splitS = adoptrateData.split('%');
        var adoptrate = parseInt(splitS[0]); // 月份平均 *****************************
        var endnum = e['end_num'];   // 人道處理數量
        var deadnum = e['dead_num'];   // 所內死亡數量
        var totalNum = 0;
        
        if (rptyear == date[0]){
          if (rptmonth == date[1]){
            if (kindvar == 'acceptnum'){
              labelname = '總收容數';
              totalNum = acceptnum;
            }else if (kindvar == 'adoptrate'){
              labelname = '認養率';
              totalNum = adoptrate;
            }else if (kindvar == 'endnum'){
              labelname = '人道處理數量';
              totalNum = endnum;
            }else if (kindvar == 'deadnum'){
              labelname = '所內死亡數量';
              totalNum = deadnum;
            }
          }
        }
        taiwanlocalNameNumber[taiwanlocalName.indexOf(sheaddres)] += totalNum;
        if (kindvar == 'acceptnum'){
          labelname = '總收容數';
          totalNum = acceptnum;
        }else if (kindvar == 'adoptrate'){
          labelname = '認養率';
          totalNum = adoptrate;
        }else if (kindvar == 'endnum'){
          labelname = '人道處理數量';
          totalNum = endnum;
        }else if (kindvar == 'deadnum'){
          labelname = '所內死亡數量';
          totalNum = deadnum;
        }
        datamonth[taiwanlocalName.indexOf(sheaddres)][yearRange.indexOf(rptyear+"/"+rptmonth)] = totalNum;
        
      });//foreach.
      datakindselect = labelname;
      var beli = '';
      var haveData = true;
      for (var k=0;k<taiwanlocalNameNumber.length;k++){
        if (taiwanlocalNameNumber[k]!=0){
          haveData = false;
          break;
        }
      }
        
      if (haveData) {
        alert('查無資料');
        labelname = '查無資料';
      }
      
      
      if (kindvar == 'adoptrate'){beli='%'};
      
      
      //繪製縣市   繪製縣市   繪製縣市   繪製縣市   繪製縣市   繪製縣市   繪製縣市   繪製縣市   繪製縣市   繪製縣市     
      taiwanlocalName.forEach(function(e,i){
        map.data.loadGeoJson('../ohdogcat/Geojson/'+e+'.json');
      });// taiwanName foreach
      
      
      
      var censusMax = Math.max(...taiwanlocalNameNumber);
      var censusMin = Math.min(...taiwanlocalNameNumber);
      
      //縣市上色  縣市上色  縣市上色  縣市上色  縣市上色  縣市上色  縣市上色  縣市上色  縣市上色  縣市上色  縣市上色  
      map.data.setStyle(function(feature) {
        cityInfo = feature.getProperty('SORT')-1;
        var low = [150,25,80];
        var color = low;
        var delta = (taiwanlocalNameNumber[cityInfo] - censusMin) / (censusMax - censusMin);
        if (haveData){delta = 0;}
        color[2] = color[2] - delta*100;
        datacolor[datax] = 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
        datax += 1;
        var outlineWeight = 0.5, zIndex = 1;
        if (feature.getProperty('state') === 'hover') {
          outlineWeight = zIndex = 2;
          
        }else if (feature.getProperty('state') === 'click') {
          
          outlineWeight = zIndex = 5;
          map.setCenter(coord);
          zoomNum = 10;
          map.setZoom(10);
          
          $('body').append('<div id="Introduction_card'+dragId+'" class="Introduction_card">'+
        '<div id="Introduction_close" class="Introduction_close">'+
        '<img id="Introduction_close'+dragId+'" src="../ohdogcat/images/close-icon.svg" alt="關閉" title="關閉" width="35px" height="33px"></div>'+
        '<div class="Introduction_text">'+taiwanlocalName[cityInfo]+'</div>'+
        '<div id="Introduction_acount">'+labelname+':'+ taiwanlocalNameNumber[cityInfo]+ beli +'</div>'+
        '<div id="js-tabs" style="width:auto">'+
        '<div id="tabs-nav">'+
        '<a id="a0'+dragId+'" href="#tab0" onclick="jsTabs(event,\'tab0'+dragId+'\','+dragId+');return false" class="tabs-menu tabs-menu-active">圓餅圖</a>'+
        '<a id="a1'+dragId+'" href="#tab1" onclick="jsTabs(event,\'tab1'+dragId+'\','+dragId+');return false" class="tabs-menu">長條圖</a>'+
        '<a id="a2'+dragId+'" href="#tab2" onclick="jsTabs(event,\'tab2'+dragId+'\','+dragId+');return false" class="tabs-menu">曲線圖</a></div>'+
        '<div class="tabs-container">'+
        '<div id="tab0'+dragId+'" class="tabs-panel" style="display:block"><canvas id="myChart_1'+dragId+'" width="400" height="300"></canvas></div>'+
        '<div id="tab1'+dragId+'" class="tabs-panel"><canvas id="myChart_2'+dragId+'" width="400" height="300"></canvas></div>'+
        '<div id="tab2'+dragId+'" class="tabs-panel"><canvas id="myChart_3'+dragId+'" width="400" height="300"></canvas></div>'+
        '</div><script>creatChart();</script></div></div>');
        var strr = "#Introduction_card"+dragId;
        var sttr = "#Introduction_close"+dragId;
        $(sttr).click(function(){
          $(strr).remove();
        });
        $( strr ).draggable();
        dragId += 1;
        
        
        }else if (feature.getProperty('state') === 'normal') {
        }
        return({
          strokeColor: '#fff',
          fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
          fillOpacity: 0.75,
          zIndex: zIndex,
          strokeWeight: outlineWeight
        });
      });//mapstyle end
      
    // hide loading bar
    $("#myBar").hide();
    $("#loading").hide();
    map.setZoom(8);
    });//getjson end
}//function getdata end