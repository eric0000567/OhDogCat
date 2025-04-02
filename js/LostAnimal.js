 // 尚未完成事項: 無
var cityName = [];
var markers = new Array();
var Isclick = new Array();
var info_config = '';
var labelname = '';
var lost_infoarray = new Array();


function Lostanimal(datavariable){  //  獲取資料及資料區分
  
  console.log('getanimaldata');
    $.getJSON('https://cors-anywhere.herokuapp.com/'+datavariable, function(data) {
    //data is the JSON string
      ohdogcatData = data;
      ohdogcatData.forEach(function(e,i){
        var lost_id = e['晶片號碼']; // 晶片號碼
        var lost_name =e['寵物名']; // 寵物名
        var lost_kind = e['寵物別']; // 種類
        var lost_sex = e['性別']; // 性別
        var lost_Variety = e['品種'];   // 品種
        var lost_Coat = e['毛色'] ; // 毛色
        var lost_Exterior = e['外觀'];  //  外觀
        var lost_feature = e['特徵'];   // 特徵
        var lost_time = e['遺失時間']; // 遺失時間
        var lost_place = e['遺失地點']; // 遺失地點
        var lost_FeederName = e['飼主姓名'];  // 飼主姓名
        var lost_FeederPhone = e['連絡電話'];  // 連絡電話
        var lost_email = e['EMail'];  // Email
        
        
          cityName.push(lost_place);                  //                加入所有遺失地點
                                  //         設定資訊視窗內容
        var lostimg = lost_kind == '貓' ? "../ohdogcat/images/Cat_icon.svg" : "../ohdogcat/images/Dog_icon.svg";
        info_config = '<div class="Introduction_text title_24px">'+lost_id+'<br>'+lost_Exterior+' '+lost_Variety+
        '</div><div><img id="adopt_result_Introduction_2" src="'+lostimg+'"/></div>'+
        '<div class="card_line" id="Introduction_acount_line"></div>'+
        '<div class="title_12px" id="Introduction_acount_content">'+
        '<p>遺失時間：'+lost_time+'</p>'+
        '<p>遺失地點：'+lost_place+'</p>'+
        '<p>晶片號碼：'+lost_id+'</p>'+
        '<p>寵物名：'+lost_name+'</p>'+
        '<p>品種：'+lost_Variety+'</p>'+
        '<p>性別：'+lost_sex+'</p>'+
        '<p>毛色：'+lost_Coat+'</p>'+
        '<p>特徵：'+lost_feature+'</p><br><br>'+
        '<p>飼主名稱：'+lost_FeederName+'</p>'+
        '<p>連絡電話：'+lost_FeederPhone+'</p>'+
        '<p>Emial：'+lost_email+'</p></div>';
          
          infoWindows.push(new google.maps.InfoWindow({
                      content: info_config
                    }));
        
        
        
      });//foreach
      //                                                                   繪製縣市     
    taiwanlocalName.forEach(function(e,i){
      map.data.loadGeoJson('../ohdogcat/Geojson/'+e+'.json');
      Isclick.push(false);
    });// taiwanName foreach

      //                                                                   縣市上色
      whichData = 'lost';
      map.data.setStyle(animalstyle);//mapstyle end
      
      
    // hide loading bar
    $("#myBar").hide();
    $("#loading").hide();
    map.setZoom(8);
    });//getjson end
}//function getdata end



function lost_classification(Kinddata,Sexdata,searchWord,clickCity){
  $('#lostdiv>#AdoptResult_panel').show();
  $('.search_result>#result').remove();
  console.log('lost_classification');
  console.log(lost_infoarray[0]);
      lost_infoarray.forEach(function(e,i){  //                                篩選機制 
        var iscon = true;
        
        console.log(searchWord);
        if(Kinddata != e[2] && Kinddata != 'none'){iscon=false;}
        if(Sexdata != e[3] && Sexdata != 'none'){iscon=false;}
        if(!e[9].includes(clickCity) && clickCity != 'none'){iscon=false;}
        if(searchWord != '' && !e[1].includes(searchWord) && !e[4].includes(searchWord) && !e[5].includes(searchWord) && !e[6].includes(searchWord) && !e[7].includes(searchWord)){iscon=false;}
        
        if(iscon){
          var icon;
          if (e[2] == '貓'){
            icon = 'Cat_icon';
          }else{
            icon = 'Dog_icon';
          }
          $('.search_result').append('<div id="result" class="result" onclick="lostresult('+e[0]+');"><div class="result_ava">'+
          '<img id="adopt_result_Introduction_1" src="../ohdogcat/images/'+icon+'.svg" style="max-height:80px; max-width:80px;"/></div>'+
          '<p class="title_12px">'+e[0]+'<br>'+e[6]+' '+e[4]+'</p>'+
          '<div class="result_line"></div></div>');
//          '<div id="result" class="resultClass" value="'+e[0]+'">'+
//                               '<h4>'+e[6]+' '+e[3]+' '+e[2]+'</h4>'+
//                               '<p>遺失時間:'+e[8]+'</p>'+
//                              '  <p>遺失地點:'+ e[9] +'</p>'+
//                              '  <p>晶片號碼:'+ e[0] +'</p>'+
//                              '  <p>寵物名:'+ e[1] +'</p>'+
//                              '  <p>品種:'+ e[4] +'</p>'+
//                              '  <p>毛色:'+ e[5] +'</p>'+
//                              '  <p>飼主名稱:'+ e[10] +'</p>'+
//                              '  <p>連絡電話:'+ e[11] +'</p>'+
//                              '  <p>信箱:'+ e[12] +'</p>'+
//                              '  <p>特徵:'+ e[7] +'</p>'+
//                               '</div>');
        }
      });

  $("#myBar").hide();
  $("#loading").hide();
}