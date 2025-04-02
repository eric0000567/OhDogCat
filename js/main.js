//                            按鈕讀取    定位搜尋
var mapStyle = [
					{
						stylers:[
							{hue:'#00ff6f'}, //色相
							{saturation:-50} //飽和度
						]
					},{
						featureType:'road',//我要設定道路
						elementType:'geometry',//幾何/線條的部分
						stylers:[
							{lightness:100},
							{visibility:'simplified'} //道路細節精簡
						]

					},{
						featureType:'transit',//我要設定大眾運輸
						elementType:'geometry',//幾何/線條的部分
						stylers:[
							{hue:'#ff6600'},
							{saturation:+80} 
						]
					},{
						featureType:'transit',//我要設定大眾運輸
						elementType:'labels',//標示的部分
						stylers:[
							{hue:'#ff0066'},
							{saturation:+80} 
						]
					},{
						featureType:'poi',//搜尋點
						elementType:'labels',//標示的部分
						stylers:[
							{visibility: "off"}
						]
					},{
						featureType:'poi.park',//搜尋點
						elementType:'labels',//標示的部分
						stylers:[
							{visibility: "on"}
						]
					},{
						featureType:'water',//搜尋點
						elementType:'geometry',//幾何/線條的部分
						stylers:[
							{hue: "#c4f4f4"}
						]
					},{
						featureType:'road',//道路
						elementType:'labels',//標示的部分
						stylers:[
							{visibility: "off"}
						]
					}
				];


  var datamap = 'http://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=DyplMIk3U1hf';
  var animalrec = 'http://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL';
  var lostdata = 'http://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=IFJomqVzyB0i';
  var hosdata = 'http://data.coa.gov.tw/Service/OpenData/DataFileService.aspx?UnitId=078';
  var datachico = '';
  var id;
  var dragId = 0;
  var whichData;
  var chicoCity = 'none';
  var datadate = '2018/5';
  var map;
  var isck = true;
  var boardNum = 0;
  var yearRange = [];
  var ohdogcatData = [];
  var infoWindows = [];
  var markers = new Array();
  var cityInfo = 0;
  var taiwanlocalName = ['新北市','臺北市','臺中市','臺南市','高雄市','宜蘭縣','桃園市','新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣','臺東縣','花蓮縣','澎湖縣','基隆市','新竹市','嘉義市','金門縣','連江縣'];
  var taiwanlocalNameNumber = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var coord = {lat: 24, lng: 121};
  var zoomNum = 8;
  var adopticon = '../ohdogcat/images/Tag_icon/Tag-S.svg';
  var losticon = '../ohdogcat/images/Tag_icon/Tag-L.svg';
  var hospitalicon = '../ohdogcat/images/Tag_icon/Tag-H.svg';
  
  
  function divhide(){
    $('#legend').hide();
    $('#mainpart').hide();
    $('#datadiv').hide();
    $('#adoptdiv2').hide();
    $('#lostdiv').hide();
    $('#hospitaldiv').hide();
    $('#adoptdiv2>#AdoptResult_panel').hide();
    $('#lostdiv>#AdoptResult_panel').hide();
    $('#hospitaldiv>#AdoptResult_panel').hide();
    $(":checkbox[name=skill]").each(function(){
      $(this).prop("checked",true);
    });
    $("input:checkbox[name=lostskill]").each(function(){
      $(this).prop("checked",true);
    });
  }


  
  $('#home').click(function(){
    divhide();
    $('#mainpart').show();
    whichData = '';
    claerdata();
    $("#myBar").hide();
    $("#loading").hide();
  });
    
    
  function initMap() {
  
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 24, lng: 121},
      styles: mapStyle,
      mapTypeControl:false, //不可以切換街道和衛星
      scaleControl:true,//顯示地圖刻度
      streetViewControl:false, //不可拖拉小橘人到地圖
      }); 
    
    map.data.addListener('mouseover', mouseInToRegion);
    map.data.addListener('mouseout', mouseOutOfRegion);
    map.data.addListener('click', function(event) {
      coord = {lat: event.latLng.lat(), lng: event.latLng.lng()};
      event.feature.setProperty('state', 'click');
    });
    
    
    
    google.maps.event.addListener(map,'center_changed', function(event){
      var z = map.getZoom();
      
      window.setTimeout(function() {
        console.log('center_changed');
        if (z <= 6){
          map.setZoom(7);
        }
        if (z<=10){
          infoWindows.forEach(function(e,i){infoWindows[i].close(map);});
        }
        if (z <= 7){
          map.panTo({lat: 24, lng: 121});
        }
      }, 500);
    });
    
    
   
    divhide();
    $("#myBar").show();
    $("#loading").show();
    
    $('#data').click(function(){
      claerdata();
      divhide();
      $('#legend').show();
      whichData = 'data';
      setdate(datamap);
      getdata(datamap,
              'acceptnum',
              datadate);
      $('#datadiv').show();

    });
    $('#adopt').click(function(){
      claerdata();
      divhide();
      whichData = 'animalRec';
      getanimaldata(animalrec);
      $('#adoptdiv2').show();
    });
    $('#lost').click(function(){
      claerdata();
      divhide();
      whichData = 'lost';
      Lostanimal(lostdata);
      $('#lostdiv').show();
    });
    $('#hospital').click(function(){
      claerdata();   
      divhide();
      whichData = 'veter';
      veterinarian(hosdata);  
      $('#hospitaldiv').show();

    });
  } // initmap end


function claerdata (){
  $("#myBar").show();
  $("#loading").show();
  console.log('clear..');
  chicoCity = 'none';
  $('.Introduction_card').remove();
  $('#resultAll>#result').remove();
  taiwanlocalNameNumber.forEach(function(e,i){taiwanlocalNameNumber[i] = 0;});
  infoWindows.forEach(function(e,i){infoWindows[i].close(map);});
  cityInfo=0;
  dragId = 0;
  infoWindows=[];
  coord = {lat: 24, lng: 121};
  map.setCenter({lat: 24, lng: 121});
  map.setZoom(8);
  DeleteMarkers();
}

function loadingshow(){
  console.log('loading         show');
  $("#myBar").show();
  $("#loading").show();
  console.log('loading         end');
}



 
function mouseInToRegion(e) {
  e.feature.setProperty('state', 'hover');
}
function mouseOutOfRegion(e) {
  e.feature.setProperty('state', 'normal');
}