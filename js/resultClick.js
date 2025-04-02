var isclick = new Array();

function adoptresult(va){
console.log(va);
  for (var i=0;i<animal_infoarray.length;i++){
    if (animal_infoarray[i][0] == va){
      console.log(animal_infoarray[i][0]);
      $('#L_BG').after('<div id="Introduction_card'+dragId+'" class="Introduction_card"><div id="Introduction_close" class="Introduction_close"><img id="Introduction_close'+dragId+
      '" src="../ohdogcat/images/close-icon.svg" alt="關閉" title="關閉" width="35px" height="33px"></div>'+
      '<div class="Introduction_text title_24px">'+animal_infoarray[i][4]+' '+animal_infoarray[i][2]+' '+animal_infoarray[i][3]+
      '</div><div><img id="adopt_result_Introduction_2" src="'+animal_infoarray[i][5]+'"/></div>'+
      '<div class="card_line" id="Introduction_acount_line"></div>'+
      '<div class="title_12px" id="Introduction_acount_content">'+
      '<p>入所日期：'+animal_infoarray[i][6]+'</p>'+
      '<p>年齡：'+animal_infoarray[i][4]+' | 性別：'+animal_infoarray[i][2]+' | 節育：'+animal_infoarray[i][7]+'</p>'+
      '<p>公告收容所：'+animal_infoarray[i][8]+'</p>'+
      '<p>收容所電話：'+animal_infoarray[i][9]+'</p>'+
      '<p>收容所地址：'+animal_infoarray[i][10]+'</p></div>'+
      '<a href="https://asms.coa.gov.tw/AmlApp/App/AnnounceList.aspx?Id='+animal_infoarray[i][0]+
      '&AcceptNum='+animal_infoarray[i][1]+'&PageType=Adopt" target="_blank">'+
      '<div class="action-button" id="w_end">我要領養</div></a></div>');
      
      var strr = "#Introduction_card"+dragId;
      var sttr = "#Introduction_close"+dragId;
      $(sttr).click(function(){
        $(strr).remove();
//        coord = {lat: 24, lng: 121};  
//        zoomNum = 8;
//        map.setZoom(8);
//        map.setCenter(coord);
      });
      $( strr ).draggable();
      dragId += 1;

      break;
    }
  }
}
function lostresult(va){
console.log(va);
  for (var i=0;i<lost_infoarray.length;i++){
    if (lost_infoarray[i][0] == va){
      var lostimg = lost_infoarray[i][2] == '貓' ? "../ohdogcat/images/Cat_icon.svg" : "../ohdogcat/images/Dog_icon.svg";
      $('#L_BG').after('<div id="Introduction_card'+dragId+'" class="Introduction_card"><div id="Introduction_close" class="Introduction_close"><img id="Introduction_close'+dragId+
      '" src="../ohdogcat/images/close-icon.svg" alt="關閉" title="關閉" width="35px" height="33px"></div>'+
      '<div class="Introduction_text title_24px">'+lost_infoarray[i][0]+'<br>'+lost_infoarray[i][6]+' '+lost_infoarray[i][4]+
      '</div><div><img id="adopt_result_Introduction_2" src="'+lostimg+'"/></div>'+
      '<div class="card_line" id="Introduction_acount_line"></div>'+
      '<div class="title_12px" id="Introduction_acount_content">'+
      '<p>遺失時間：'+lost_infoarray[i][8]+'</p>'+
      '<p>遺失地點：'+lost_infoarray[i][9]+'</p>'+
      '<p>晶片號碼：'+lost_infoarray[i][0]+'</p>'+
      '<p>寵物名：'+lost_infoarray[i][1]+'</p>'+
      '<p>品種：'+lost_infoarray[i][4]+'</p>'+
      '<p>性別：'+lost_infoarray[i][3]+'</p>'+
      '<p>毛色：'+lost_infoarray[i][5]+'</p>'+
      '<p>特徵：'+lost_infoarray[i][7]+'</p><br><br>'+
      '<p>飼主名稱：'+lost_infoarray[i][10]+'</p>'+
      '<p>連絡電話：'+lost_infoarray[i][11]+'</p>'+
      '<p>Emial：'+lost_infoarray[i][12]+'</p></div></div>');
      
      var strr = "#Introduction_card"+dragId;
      var sttr = "#Introduction_close"+dragId;
      $(sttr).click(function(){
        if (markers[isclick.indexOf(dragId)] != null){
          markers[isclick.indexOf(dragId)].setMap(null);
          dragId -= 1;
        }
        $(strr).remove();
//        coord = {lat: 24, lng: 121};  
//        zoomNum = 8;
//        map.setZoom(8);
//        map.setCenter(coord);
      });
      $( strr ).draggable();
      
      
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': lost_infoarray[i][9]}, function(results, status) {  //     製作標點
        if (status == "OK") {
          coord = results[0].geometry.location;
          marker = new google.maps.Marker({           //                      標出 marker
            position: results[0].geometry.location,
            map: map,
            title :lost_infoarray[i][9],
            icon: losticon
          });
          markers.push(marker);
          isclick.push(dragId);
        }else {
          console.log("Geocode was not successful for the following reason: " + status);
        }
      });
      
      
      dragId += 1;

      break;
    }
  }
}


function hospitalresult(va){
console.log(va);
  for (var i=0;i<veter_infoarray.length;i++){
    if (veter_infoarray[i][1] == va){
      $('#L_BG').after('<div id="Introduction_card'+dragId+'" class="Introduction_card"><div id="Introduction_close" class="Introduction_close"><img id="Introduction_close'+dragId+
      '" src="../ohdogcat/images/close-icon.svg" alt="關閉" title="關閉" width="35px" height="33px"></div>'+
      '<div class="Introduction_text title_24px">'+veter_infoarray[i][0]+
      '</div>'+
      '<iframe id="card_map" width=240px height=256 frameborder=0 scrolling=no marginheight=0 marginwidth=0 marginwidth=0 src="https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q='+ veter_infoarray[i][1] +'&z=16&output=embed&t="></iframe>'+
      '<div class="title_12px" id="Introduction_acount_content">'+
      '<p>地址：'+veter_infoarray[i][1]+'</p>'+
      '<p>聯絡電話：'+veter_infoarray[i][2]+'</p>'+
      '<p>負責獸醫：'+veter_infoarray[i][3]+'</p>'+
      '<p>發照日期：'+veter_infoarray[i][4]+'</p>'+
      '<p>開業字號：'+veter_infoarray[i][5]+'</p></div></div>');
        var strr = "#Introduction_card"+dragId;
        var sttr = "#Introduction_close"+dragId;
        $(sttr).click(function(){
          if (markers[isclick.indexOf(dragId)] != null){
            markers[isclick.indexOf(dragId)].setMap(null);
            dragId -= 1;
          }
          $(strr).remove();
//          coord = {lat: 24, lng: 121};  
//          zoomNum = 8;
//          map.setZoom(8);
//          map.setCenter(coord);
        });
        $( strr ).draggable();
      
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': va}, function(results, status) {  //     製作標點
        if (status == "OK") {
          coord = results[0].geometry.location;
          marker = new google.maps.Marker({           //                      標出 marker
            position: results[0].geometry.location,
            map: map,
            title :va,
            icon: hospitalicon
          });
          markers.push(marker);
          isclick.push(dragId);
        }else {
          console.log("Geocode was not successful for the following reason: " + status);
        }
      });

      
      dragId += 1;
      break;
      
    }
  }
}
