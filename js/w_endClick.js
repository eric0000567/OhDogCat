function gohome(){
    whichData = '';
    claerdata();
    divhide();
    $('#mainpart').show();
    $("#myBar").hide();
    $("#loading").hide();
}
  
  
function dataend(){
  claerdata();
  var kindselectbox = document.getElementById('DataMap_select');
  getdata(datamap,
        kindselectbox.options[kindselectbox.selectedIndex].value,
       datadate);
}

function adoptend(){

  var checkedarr = ['','','',''];
  $("input:checkbox[name=skill]:checked").each(function(){
   if ($(this).val() == '狗' || $(this).val() == '貓'){
    checkedarr[0] += $(this).val();
   }else if ($(this).val() == '公' || $(this).val() == '母'){
    checkedarr[1] += $(this).val();
   }else if ($(this).val() == '幼' || $(this).val() == '成'){
    checkedarr[2] += $(this).val();
   }else if ($(this).val() == '是' || $(this).val() == '否'){
    checkedarr[3] += $(this).val();
   }
  });
  checkedarr.forEach(function(e,i){
    
    if (e.length == 2){
      checkedarr[i] = 'none';
    }else if (e.length < 1){
      checkedarr[i] = '無';
    }
  });
  if (checkedarr[2] != 'none'){checkedarr[2]+='年'}
  animal_classification(
        checkedarr[0], // 種類
        checkedarr[1], //性別
        checkedarr[2], //年齡
        checkedarr[3], //結紮
        chicoCity);
}
function lostend(){
  var checkedarr = ['',''];
    $("input:checkbox[name=lostskill]:checked").each(function(){
     if ($(this).val() == '狗' || $(this).val() == '貓'){
      checkedarr[0] += $(this).val();
     }else if ($(this).val() == '公' || $(this).val() == '母'){
      checkedarr[1] += $(this).val();
     }
    });
    checkedarr.forEach(function(e,i){
      if (e.length == 2){
        checkedarr[i] = 'none';
      }else if (e.length < 1){
        checkedarr[i] = '無';
      }
    });
    lost_classification(
          checkedarr[0],
          checkedarr[1],
          $('#searchword').val(),
          chicoCity);
}
function hospitalend(){
  
  veter_classification(chicoCity,$('#searchword2').val());
}







