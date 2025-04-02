 // 尚未完成事項:  動物醫院點小卡後才標點
var cityName = [];
var markers = new Array();
var Isclick = new Array();
var info_config = '';
var labelname = '';
var veter_infoarray = new Array();


function veterinarian(datavariable){  //  獲取資料及資料區分
  
  console.log('getanimaldata');
    $.getJSON('https://cors-anywhere.herokuapp.com/'+datavariable, function(data) {
    //data is the JSON string
      ohdogcatData = data;
      ohdogcatData.forEach(function(e,i){
        var veter_name = e['機構名稱']; // 機構名稱
        var veter_man =e['負責獸醫']; // 負責獸醫
        var veter_tel = e['機構電話']; // 機構電話
        var veter_address = e['機構地址']; // 機構地址
        var veter_open = e['狀態'];   // 狀態
        var veter_number = e['字號'] ; // 字號
        var veter_date = e['發照日期'];  //  發照日期
        
        
        veter_infoarray.push([veter_name,     //         醫院資訊
                            veter_address,
                            veter_tel,
                            veter_man,
                            veter_date,
                            veter_number,
                            veter_open]);
        
          cityName.push(veter_address);                  //                加入所有醫院地點
          
//          info_config = '<div class="Introduction_text title_24px">'+veter_name+'</div>'+
//      '<iframe id="card_map" width=240px height=256 frameborder=0 scrolling=no marginheight=0 marginwidth=0 marginwidth=0 src="https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q='+ veter_address +'&z=16&output=embed&t="></iframe>'+
//      '<div class="title_12px" id="Introduction_acount_content">'+
//      '<p>地址：'+veter_address+'</p>'+
//      '<p>聯絡電話：'+veter_tel+'</p>'+
//      '<p>負責獸醫：'+veter_man+'</p>'+
//      '<p>發照日期：'+veter_date+'</p>'+
//      '<p>開業字號：'+veter_number+'</p></div>';
//          
//          infoWindows.push(new google.maps.InfoWindow({
//                      content: info_config
//                    }));
        
        
        
      });//foreach
      //                                                                   繪製縣市     
    taiwanlocalName.forEach(function(e,i){
      map.data.loadGeoJson('../ohdogcat/Geojson/'+e+'.json');
      Isclick.push(false);
    });// taiwanName foreach

      //                                                                   縣市上色
      map.data.setStyle(animalstyle);//mapstyle end
      
      
    // hide loading bar
    $("#myBar").hide();
    $("#loading").hide();
    map.setZoom(8);
    });//getjson end
}//function getdata end



function veter_classification(clickCity,searchWord){
  $('#hospitaldiv>#AdoptResult_panel').show();
  $('.search_result>#result').remove();
  console.log('lost_classification');
  console.log(veter_infoarray[0]);
      veter_infoarray.forEach(function(e,i){  //                                篩選機制 
        var iscon = true;
        if(!e[1].includes(clickCity) && clickCity != 'none'){iscon=false;}
        if(searchWord != '' && !e[0].includes(searchWord) && !e[1].includes(searchWord) && !e[2].includes(searchWord) && !e[3].includes(searchWord) && !e[4].includes(searchWord) && !e[5].includes(searchWord)){iscon=false;}
        if(iscon){
          $('.search_result').append('<div id="result" class="card_hospitai" onclick="hospitalresult(\''+e[1]+'\');">'+
                                '<p class="title_24px" id="tip_1">'+e[0]+'</p>'+
                                '<p class="title_16px" id="tip_1">'+e[1]+'</p>'+
                                '<p class="title_16px" id="tip_1">'+e[2]+'</p></div>');
//                                '  <p>聯絡電話:'+ e[2] +'</p>'+
//                                '  <p>負責獸醫:'+ e[3] +'</p>'+
//                                '  <p>發照日期:'+ e[4] +'</p>'+
//                                '  <p>開業字號:'+ e[5] +'</p>'+
//                               '</div>');
        }
          
      });
    $("#myBar").hide();
    $("#loading").hide();
}