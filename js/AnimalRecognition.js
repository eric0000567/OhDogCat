 // 尚未完成事項:   標點跳動 定位搜尋 
var cityName = [];
//var iconsrc = 'img/animal.png';

var Isclick = new Array();
var info_config = '';
var labelname = '';
var animal_infoarray = new Array();

function getanimaldata(datavariable){  //  獲取資料及資料區分
  
  console.log('getanimaldata');
    $.getJSON('https://cors-anywhere.herokuapp.com/'+datavariable, function(data) {
    //data is the JSON string
      ohdogcatData = data;
      ohdogcatData.forEach(function(e,i){
        var animal_id = e['animal_id']; // 動物ID
        var animal_subid =e['animal_subid']; // 動物編碼
        var animal_sex = e['animal_sex']; // 性別
        var animal_kind = e['animal_kind']; // 種類
        var animal_age = e['animal_age'];   // 動物年紀
        var album_file = e['album_file']; // 動物圖片
        var animal_createtime = e['animal_createtime'];  //  入所日期
        var animal_sterilization = e['animal_sterilization'];   // 是否絕育
        var sheaddres = e['shelter_address']; // 收容所地址
        var shelter_name = e['shelter_name'];  // 收容所名稱
        var shelter_tel = e['shelter_tel'];  // 收容所電話
        

        
        if (!cityName.includes(sheaddres)){ //                加入所有收容所地址
          cityName.push(sheaddres);
                                                 //          設定資訊視窗內容
          info_config ='<div class="Introduction_text title_24px">'+ shelter_name +'</div>'+
          '<iframe id="card_map" width=240px height=256 frameborder=0 scrolling=no marginheight=0 marginwidth=0 marginwidth=0 src="https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q='+ sheaddres +'&z=16&output=embed&t="></iframe>'+
          '<div class="title_12px" id="Introduction_acount_content">'+
          '  <p>收容所電話:'+ shelter_tel +'</p>'+
          '  <p>收容所地址:'+ sheaddres +'</p>'+
          '</div>';
          
          infoWindows.push(new google.maps.InfoWindow({
                      content: info_config
                    }));
        }
        
        
        
      });//foreach
      //                                                                   繪製縣市     
    taiwanlocalName.forEach(function(e,i){
      map.data.loadGeoJson('../ohdogcat/Geojson/'+e+'.json');
      Isclick.push(false);
    });// taiwanName foreach

      //                                                                   縣市上色
      whichData = 'animalRec';
      map.data.setStyle(animalstyle);//mapstyle end
      
      
    // hide loading bar
    $("#myBar").hide();
    $("#loading").hide();
    map.setZoom(8);
    });//getjson end
}//function getdata end


function animalstyle(feature) {
        var markerimg = '' ;
        var geocoder = new google.maps.Geocoder();
        cityInfo = feature.getProperty('SORT')-1;
        var color = [150,25,80];
        var outlineWeight = 1, zIndex = 1;
        var strokecolor = '#fff';
        if (feature.getProperty('state') === 'hover') {
          outlineWeight = zIndex = 3;
          strokecolor = '#00acaa';
        }else if (feature.getProperty('state') === 'click') {
          outlineWeight = zIndex = 5;
          color[0] = 5;
          
          $('.readtext').attr('placeholder','目前所選範圍:'+taiwanlocalName[cityInfo]);
          
          cityName.forEach(function(e,i){
            if (!e.includes(taiwanlocalName[cityInfo])){
              if (markers[i] != null){
                markers[i].setVisible(false);  
              }
            }
          });
          if (whichData == 'lost'){
            markerimg = losticon;
            chicoCity = taiwanlocalName[cityInfo];
            lost_classification('none','none','',taiwanlocalName[cityInfo]);
          }
          if (whichData == 'veter'){
            chicoCity = taiwanlocalName[cityInfo];
            veter_classification(taiwanlocalName[cityInfo],'');
          }
          if (whichData == 'animalRec'){
            markerimg = adopticon;
            chicoCity = taiwanlocalName[cityInfo];
            animal_classification('none','none','none','none',taiwanlocalName[cityInfo]);
          }
          
          
          if (whichData != 'veter'){
            if (!Isclick[cityInfo]){

              Isclick[cityInfo] = true;
              cityName.forEach(function(e,i){        //                         顯示標點
                if (e.includes(taiwanlocalName[cityInfo])){ 
                   geocoder.geocode( { 'address': e}, function(results, status) {  //     製作標點
                    if (status == "OK") {
                      coord = results[0].geometry.location;
                      marker = new google.maps.Marker({           //                      標出 marker
                        position: results[0].geometry.location,
                        map: map,
                        title :e,
                        icon: markerimg
                      });

                      marker.addListener('click', function(event) {
                        $(":checkbox[name=skill]").each(function(){
                          $(this).prop("checked",true);
                        });
                        $("input:checkbox[name=lostskill]").each(function(){
                          $(this).prop("checked",true);
                        });
                        $('.readtext').attr('placeholder','目前所選範圍:'+e);
                        zoomNum=14;
                        coord = {lat: event.latLng.lat(), lng: event.latLng.lng()};
                        map.setZoom(14);
                        map.setCenter(coord);
                        infoWindows[i].setPosition({lat: event.latLng.lat(), lng: event.latLng.lng()});

                        if (whichData == 'animalRec'){
                          chicoCity = e;
                          animal_classification('none','none','none','none',e);
                        }
                        infoWindows[i].addListener('closeclick',function(){
                          zoomNum = 10;
                          map.setZoom(10);
                          map.setCenter(coord);
                          chicoCity = 'none';
                        });


                        infoWindows[i].open(map);
                      });
                      markers[i]=marker;
                    }else {
                      console.log("Geocode was not successful for the following reason: " + status);
                    }
                  });

                }
              }); // cityName foreach end
            }else{
              cityName.forEach(function(e,i){
                if (e.includes(taiwanlocalName[cityInfo])){
                  markers[i].setVisible(true);  
                }
              }); // cityName foreach end
            }
          }
          map.setCenter(coord);
          zoomNum = 10;
          map.setZoom(10);
          
        }else if (feature.getProperty('state') === 'normal') {
          
        }
        return({
            strokeColor: strokecolor,
            fillOpacity: 0,
            zIndex: zIndex,
            strokeWeight: outlineWeight,
          });
      }


function animal_classification(Kinddata,Sexdata,HowoldData,IsNoegg,clickCity){
  $('#adoptdiv2>#AdoptResult_panel').show();
  $('.search_result>.result').remove();
  console.log('animal_classification');
      animal_infoarray.forEach(function(e,i){  //                                篩選機制 
        var iscon = true;
        if(Kinddata != e[3] && Kinddata != 'none'){iscon=false;}
        if(Sexdata != e[2] && Sexdata != 'none'){iscon=false;}
        if(HowoldData != e[4] && HowoldData != 'none'){iscon=false;}
        if(IsNoegg != e[7] && IsNoegg != 'none'){iscon=false;}
        if(!e[10].includes(clickCity) && clickCity != 'none'){iscon=false;}
        if(iscon){
          $('.search_result').append('<div id="result" class="result" onclick="adoptresult('+e[0]+');">'+
                                     '<div class="result_ava"><img id="adopt_result_Introduction_1" src="'+e[5]+'" style="max-height:80px; max-width:80px;"></div>'+
                                     '<p class="title_12px">'+e[4]+' '+e[2]+' '+e[3]+ ' '+ e[7] +'</p>'+
                                     '<div class="result_line"></div>'+
                                     '</div>');
//                               '<p>是否絕育:'+e[7]+'</p>'+
//                               '<p>入所日期:'+e[6]+'</p>'+
//                               '<p>收容所名稱:'+e[8]+'</p>'+
//                               '<p>收容所電話:'+e[9]+'</p>'+
//                               '<p>收容所地址:'+e[10]+'</p>'+
//                               '<a href="https://asms.coa.gov.tw/AmlApp/App/AnnounceList.aspx?Id='+e[0]+
//                               '&AcceptNum='+e[1]+'&PageType=Adopt" target="_blank">'+
//                               '<button>前往領養流程</button></a></div>');
        }

      });
  console.log('endhide');
  $("#myBar").hide();
  $("#loading").hide();
}





function DeleteMarkers() {   
    //Loop through all the markers and remove  
    console.log('clear...marker');
    cityName = [];
    map.data.setStyle(animalstyle);//mapstyle end
    for (var i = 0; i < markers.length; i++) { 
      if (markers[i] != null){
        markers[i].setMap(null);  
      }
    }   
    Isclick.forEach(function(e,i){Isclick[i]=false});
    markers = [];   
    zoomNum = 8;
    map.setZoom(8);
    coord = {lat: 24, lng: 121};
    map.setCenter(coord);
};  
