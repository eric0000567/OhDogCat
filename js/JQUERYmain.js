$(document).ready(function(){
 var aniX= 5;
 var aniImg = '';
 var dc = '';
  $.getJSON('https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL', function(data) {
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
      if (animal_sex == 'F'){
        animal_sex = '母';
      }else if (animal_sex == 'M'){
        animal_sex = '公';
      }else{
        animal_sex = '未輸入';
      }

      if (animal_sterilization == 'T'){
        animal_sterilization = '是';
      }else if (animal_sterilization == 'F'){
        animal_sterilization = '否';
      }else{
        animal_sterilization = '未輸入';
      }

      if (animal_age == 'CHILD'){
        animal_age = '幼年';
      }else if (animal_age == 'ADULT'){
        animal_age = '成年';
      }else{
        animal_age = '未知';
      }
      animal_infoarray.push([animal_id,     //         動物資訊
                        animal_subid,
                        animal_sex,
                        animal_kind,
                        animal_age,
                        album_file,
                        animal_createtime,
                        animal_sterilization,
                        shelter_name,
                        shelter_tel,
                        sheaddres]);

    });//foreach
    
    for (var i=1;i<6;i++){
      $('#adopt_side'+i).attr('onclick','adoptresult('+animal_infoarray[i-1][0]+')');
      aniImg = animal_infoarray[i-1][5] == ''? 'n' : animal_infoarray[i-1][5];
      dc = animal_infoarray[i-1][3] == '貓'? "../ohdogcat/images/Cat_icon.svg" : "../ohdogcat/images/Dog_icon.svg";
      $("#adopt_Introduction_"+i).attr('src',aniImg == 'n'?dc:aniImg); 
      $("#name"+i).html(animal_infoarray[i-1][4] + " " +animal_infoarray[i-1][2] + " " +animal_infoarray[i-1][3]); 
    }
    $('#mainpart').show();
    $("#myBar").hide();
    $("#loading").hide();
  });//getjson
   flag=1;
    $("#adopt_nex").click(function(){
      
      for (var i=1;i<6;i++){
        $('#adopt_side'+i).attr('onclick','adoptresult('+animal_infoarray[aniX-i][0]+')');
        aniImg = animal_infoarray[aniX-i][5] == ''? 'n' : animal_infoarray[aniX-i][5];
        dc = animal_infoarray[i-1][3] == '貓'? "../ohdogcat/images/Cat_icon.svg" : "../ohdogcat/images/Dog_icon.svg";
        $("#adopt_Introduction_"+i).attr('src',aniImg == 'n'?dc:aniImg); 
        $("#name"+i).html(animal_infoarray[aniX-i][4] + " " +animal_infoarray[aniX-i][2] + " " +animal_infoarray[aniX-i][3]); 
      }
      if (aniX < animal_infoarray.length){
        aniX += 1;
      }
    
    
    
       if(flag==0)
        {
            $("#adopt_side1").css("z-index","999");
            $("#adopt_side2").css("z-index","9");
            $("#adopt_side3").css("z-index","9");
            $("#adopt_side4").css("z-index","8");
            $("#adopt_side5").css("z-index","8");
            
            document.getElementById("adopt_side1").style.opacity = "1";
            document.getElementById("adopt_side2").style.opacity = "0.6";
            document.getElementById("adopt_side3").style.opacity = "0.6";
            document.getElementById("adopt_side4").style.opacity = "0.6";
            document.getElementById("adopt_side5").style.opacity = "0.6";
            
            $("#adopt_side1").css("transform","translateX(0px) scale(1.1)");
            $("#adopt_side2").css("transform","translateX(-40px) scale(1)");
            $("#adopt_side3").css("transform","translateX(40px)");
            $("#adopt_side4").css("transform","translateX(-70px) scale(1)");
            $("#adopt_side5").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("adopt_side1").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("adopt_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            
            flag=1;
        }
        else if(flag==1)
        {
            $("#adopt_side3").css("z-index","999");
            $("#adopt_side5").css("z-index","9");
            $("#adopt_side1").css("z-index","9");
            $("#adopt_side2").css("z-index","8");
            $("#adopt_side4").css("z-index","8");
            
            document.getElementById("adopt_side3").style.opacity = "1";
            document.getElementById("adopt_side2").style.opacity = "0.6";
            document.getElementById("adopt_side1").style.opacity = "0.6";
            document.getElementById("adopt_side4").style.opacity = "0.6";
            document.getElementById("adopt_side5").style.opacity = "0.6";
            
            $("#adopt_side3").css("transform","translateX(0px) scale(1.1)");
            $("#adopt_side1").css("transform","translateX(-40px) scale(1)");
            $("#adopt_side5").css("transform","translateX(40px)");
            $("#adopt_side2").css("transform","translateX(-70px) scale(1)");
            $("#adopt_side4").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("adopt_side3").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("adopt_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            
            flag=2;
        }
        else if(flag==2)
        {
            $("#adopt_side5").css("z-index","999");
            $("#adopt_side3").css("z-index","9");
            $("#adopt_side4").css("z-index","9");
            $("#adopt_side1").css("z-index","8");
            $("#adopt_side2").css("z-index","8");
            
            
            document.getElementById("adopt_side5").style.opacity = "1";
            document.getElementById("adopt_side2").style.opacity = "0.6";
            document.getElementById("adopt_side3").style.opacity = "0.6";
            document.getElementById("adopt_side4").style.opacity = "0.6";
            document.getElementById("adopt_side1").style.opacity = "0.6";
            
            $("#adopt_side5").css("transform","translateX(0px) scale(1.1)");
            $("#adopt_side3").css("transform","translateX(-40px) scale(1)");
            $("#adopt_side4").css("transform","translateX(40px)");
            $("#adopt_side1").css("transform","translateX(-70px) scale(1)");
            $("#adopt_side2").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("adopt_side5").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("adopt_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=3;
        }
        else if(flag==3)
        {
            $("#adopt_side4").css("z-index","999");
            $("#adopt_side5").css("z-index","9");
            $("#adopt_side2").css("z-index","9");
            $("#adopt_side3").css("z-index","8");
            $("#adopt_side1").css("z-index","8");
            
            document.getElementById("adopt_side4").style.opacity = "1";
            document.getElementById("adopt_side2").style.opacity = "0.6";
            document.getElementById("adopt_side3").style.opacity = "0.6";
            document.getElementById("adopt_side1").style.opacity = "0.6";
            document.getElementById("adopt_side5").style.opacity = "0.6";
            
            
            
            $("#adopt_side4").css("transform","translateX(0px) scale(1.1)");
            $("#adopt_side5").css("transform","translateX(-40px) scale(1)");
            $("#adopt_side2").css("transform","translateX(40px)");
            $("#adopt_side3").css("transform","translateX(-70px) scale(1)");
            $("#adopt_side1").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("adopt_side4").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("adopt_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=4;
        }
        else if(flag==4)
        {
            $("#adopt_side2").css("z-index","999");
            $("#adopt_side4").css("z-index","9");
            $("#adopt_side1").css("z-index","9");
            $("#adopt_side3").css("z-index","8");
            $("#adopt_side5").css("z-index","8");
            
            document.getElementById("adopt_side2").style.opacity = "1";
            document.getElementById("adopt_side1").style.opacity = "0.6";
            document.getElementById("adopt_side3").style.opacity = "0.6";
            document.getElementById("adopt_side4").style.opacity = "0.6";
            document.getElementById("adopt_side5").style.opacity = "0.6";
            
            
            
            $("#adopt_side2").css("transform","translateX(0px) scale(1.1)");
            $("#adopt_side4").css("transform","translateX(-40px) scale(1)");
            $("#adopt_side1").css("transform","translateX(40px)");
            $("#adopt_side5").css("transform","translateX(-70px) scale(1)");
            $("#adopt_side3").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("adopt_side2").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("adopt_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=0;
        }
    });
    $("#adopt_pre").click(function(){
      for (var i=1;i<6;i++){
        $('#adopt_side'+i).attr('onclick','adoptresult('+animal_infoarray[aniX-i][0]+')');
        aniImg = animal_infoarray[aniX-i][5] == ''? 'n' : animal_infoarray[aniX-i][5];
        dc = animal_infoarray[i-1][3] == '貓'? "../ohdogcat/images/Cat_icon.svg" : "../ohdogcat/images/Dog_icon.svg";
        $("#adopt_Introduction_"+i).attr('src',aniImg == 'n'?dc:aniImg); 
        $("#name"+i).html(animal_infoarray[aniX-i][4] + " " +animal_infoarray[aniX-i][2] + " " +animal_infoarray[aniX-i][3]); 
      }
      if (aniX > 6){
        aniX -= 1;
      }
       if(flag==0)
        {
            $("#adopt_side1").css("z-index","999");
            $("#adopt_side2").css("z-index","9");
            $("#adopt_side3").css("z-index","9");
            $("#adopt_side4").css("z-index","8");
            $("#adopt_side5").css("z-index","8");
            
            document.getElementById("adopt_side1").style.opacity = "1";
            document.getElementById("adopt_side2").style.opacity = "0.6";
            document.getElementById("adopt_side3").style.opacity = "0.6";
            document.getElementById("adopt_side4").style.opacity = "0.6";
            document.getElementById("adopt_side5").style.opacity = "0.6";
            
            $("#adopt_side1").css("transform","translateX(0px) scale(1.1)");
            $("#adopt_side2").css("transform","translateX(-40px) scale(1)");
            $("#adopt_side3").css("transform","translateX(40px)");
            $("#adopt_side4").css("transform","translateX(-70px) scale(1)");
            $("#adopt_side5").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("adopt_side1").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("adopt_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=1;
        }
        else if(flag==1)
        {
            $("#adopt_side2").css("z-index","999");
            $("#adopt_side4").css("z-index","9");
            $("#adopt_side1").css("z-index","9");
            $("#adopt_side3").css("z-index","8");
            $("#adopt_side5").css("z-index","8");
            
            document.getElementById("adopt_side2").style.opacity = "1";
            document.getElementById("adopt_side1").style.opacity = "0.6";
            document.getElementById("adopt_side3").style.opacity = "0.6";
            document.getElementById("adopt_side4").style.opacity = "0.6";
            document.getElementById("adopt_side5").style.opacity = "0.6";
            
            $("#adopt_side2").css("transform","translateX(0px) scale(1.1)");
            $("#adopt_side4").css("transform","translateX(-40px) scale(1)");
            $("#adopt_side1").css("transform","translateX(40px)");
            $("#adopt_side5").css("transform","translateX(-70px) scale(1)");
            $("#adopt_side3").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("adopt_side2").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("adopt_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=2;
        }
        else if(flag==2)
        {
            $("#adopt_side4").css("z-index","999");
            $("#adopt_side5").css("z-index","9");
            $("#adopt_side2").css("z-index","9");
            $("#adopt_side3").css("z-index","8");
            $("#adopt_side1").css("z-index","8");
            
            document.getElementById("adopt_side4").style.opacity = "1";
            document.getElementById("adopt_side2").style.opacity = "0.6";
            document.getElementById("adopt_side3").style.opacity = "0.6";
            document.getElementById("adopt_side1").style.opacity = "0.6";
            document.getElementById("adopt_side5").style.opacity = "0.6";
            
           
            
            $("#adopt_side4").css("transform","translateX(0px) scale(1.1)");
           $("#adopt_side5").css("transform","translateX(-40px) scale(1)");
            $("#adopt_side2").css("transform","translateX(40px)");
            $("#adopt_side3").css("transform","translateX(-70px) scale(1)");
            $("#adopt_side1").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("adopt_side4").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("adopt_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=3;
        }
        else if(flag==3)
        {
            $("#adopt_side5").css("z-index","999");
            $("#adopt_side3").css("z-index","9");
            $("#adopt_side4").css("z-index","9");
            $("#adopt_side1").css("z-index","8");
            $("#adopt_side2").css("z-index","8");
            
            document.getElementById("adopt_side5").style.opacity = "1";
            document.getElementById("adopt_side2").style.opacity = "0.6";
            document.getElementById("adopt_side3").style.opacity = "0.6";
            document.getElementById("adopt_side4").style.opacity = "0.6";
            document.getElementById("adopt_side1").style.opacity = "0.6";
            
           
            $("#adopt_side5").css("transform","translateX(0px) scale(1.1)");
            $("#adopt_side3").css("transform","translateX(-40px) scale(1)");
            $("#adopt_side4").css("transform","translateX(40px)");
            $("#adopt_side1").css("transform","translateX(-70px) scale(1)");
            $("#adopt_side2").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("adopt_side5").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("adopt_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=4;
        }
        else if(flag==4)
        {
            $("#adopt_side3").css("z-index","999");
            $("#adopt_side1").css("z-index","9");
            $("#adopt_side5").css("z-index","9");
            $("#adopt_side4").css("z-index","8");
            $("#adopt_side2").css("z-index","8");
            
            document.getElementById("adopt_side3").style.opacity = "1";
            document.getElementById("adopt_side2").style.opacity = "0.6";
            document.getElementById("adopt_side1").style.opacity = "0.6";
            document.getElementById("adopt_side4").style.opacity = "0.6";
            document.getElementById("adopt_side5").style.opacity = "0.6";
             
            $("#adopt_side3").css("transform","translateX(0px) scale(1.1)");
            $("#adopt_side1").css("transform","translateX(-40px) scale(1)");
            $("#adopt_side5").css("transform","translateX(40px)");
            $("#adopt_side2").css("transform","translateX(-70px) scale(1)");
            $("#adopt_side4").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("adopt_side3").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("adopt_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("adopt_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=0;
        }
    });    
});



$(document).ready(function(){
// 遺失布告欄
  var lostX = 5
  var lostimg = '';
  $.getJSON('https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=IFJomqVzyB0i', function(data) {
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
        
        
        lost_infoarray.push([lost_id,     //         遺失資訊
                        lost_name,
                        lost_kind,
                        lost_sex,
                        lost_Variety,
                        lost_Coat,
                        lost_Exterior,
                        lost_feature,
                        lost_time,
                        lost_place,
                        lost_FeederName,
                        lost_FeederPhone,
                        lost_email]);
        
    });  
    for (var i=1;i<6;i++){
      $('#ass_side'+i).attr('onclick','lostresult('+lost_infoarray[i-1][0]+')');
      lostimg = lost_infoarray[i-1][2] == '貓' ? "../ohdogcat/images/Cat_icon.svg" : "../ohdogcat/images/Dog_icon.svg";
      $("#ass_Introduction_"+i).attr('src',lostimg); 
      $("#lname"+i).html(lost_infoarray[i-1][0] + "<br>" +lost_infoarray[i-1][6] + " " +lost_infoarray[i-1][4]); 
    }
    
  });
   flag=1;
    $("#ass_nex").click(function(){
    
      for (var i=1;i<6;i++){
        $('#ass_side'+i).attr('onclick','lostresult('+lost_infoarray[lostX-i][0]+')');
        lostimg = lost_infoarray[lostX-i][2] == '貓' ? "../ohdogcat/images/Cat_icon.svg" : "../ohdogcat/images/Dog_icon.svg";
        $("#ass_Introduction_"+i).attr('src',lostimg); 
        $("#lname"+i).html(lost_infoarray[lostX-i][0] + "<br>" +lost_infoarray[lostX-i][6] + " " +lost_infoarray[lostX-i][4]); 
      }
      if (lostX < lost_infoarray.length){
        lostX += 1;
      }
       if(flag==0)
        {
            $("#ass_side1").css("z-index","999");
            $("#ass_side2").css("z-index","9");
            $("#ass_side3").css("z-index","9");
            $("#ass_side4").css("z-index","8");
            $("#ass_side5").css("z-index","8");
            
            document.getElementById("ass_side1").style.opacity = "1";
            document.getElementById("ass_side2").style.opacity = "0.6";
            document.getElementById("ass_side3").style.opacity = "0.6";
            document.getElementById("ass_side4").style.opacity = "0.6";
            document.getElementById("ass_side5").style.opacity = "0.6";
            
            $("#ass_side1").css("transform","translateX(0px) scale(1.1)");
            $("#ass_side2").css("transform","translateX(-40px) scale(1)");
            $("#ass_side3").css("transform","translateX(40px)");
            $("#ass_side4").css("transform","translateX(-70px) scale(1)");
            $("#ass_side5").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("ass_side1").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("ass_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=1;
        }
        else if(flag==1)
        {
            $("#ass_side3").css("z-index","999");
            $("#ass_side5").css("z-index","9");
            $("#ass_side1").css("z-index","9");
            $("#ass_side2").css("z-index","8");
            $("#ass_side4").css("z-index","8");
            
            document.getElementById("ass_side3").style.opacity = "1";
            document.getElementById("ass_side2").style.opacity = "0.6";
            document.getElementById("ass_side1").style.opacity = "0.6";
            document.getElementById("ass_side4").style.opacity = "0.6";
            document.getElementById("ass_side5").style.opacity = "0.6";
            
            $("#ass_side3").css("transform","translateX(0px) scale(1.1)");
            $("#ass_side1").css("transform","translateX(-40px) scale(1)");
            $("#ass_side5").css("transform","translateX(40px)");
            $("#ass_side2").css("transform","translateX(-70px) scale(1)");
            $("#ass_side4").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("ass_side3").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("ass_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=2;
        }
        else if(flag==2)
        {
            $("#ass_side5").css("z-index","999");
            $("#ass_side3").css("z-index","9");
            $("#ass_side4").css("z-index","9");
            $("#ass_side1").css("z-index","8");
            $("#ass_side2").css("z-index","8");
            
            document.getElementById("ass_side5").style.opacity = "1";
            document.getElementById("ass_side2").style.opacity = "0.6";
            document.getElementById("ass_side3").style.opacity = "0.6";
            document.getElementById("ass_side4").style.opacity = "0.6";
            document.getElementById("ass_side1").style.opacity = "0.6";
            
            $("#ass_side5").css("transform","translateX(0px) scale(1.1)");
            $("#ass_side3").css("transform","translateX(-40px) scale(1)");
            $("#ass_side4").css("transform","translateX(40px)");
            $("#ass_side1").css("transform","translateX(-70px) scale(1)");
            $("#ass_side2").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("ass_side5").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("ass_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=3;
        }
        else if(flag==3)
        {
            $("#ass_side4").css("z-index","999");
            $("#ass_side5").css("z-index","9");
            $("#ass_side2").css("z-index","9");
            $("#ass_side3").css("z-index","8");
            $("#ass_side1").css("z-index","8");
            
            document.getElementById("ass_side4").style.opacity = "1";
            document.getElementById("ass_side2").style.opacity = "0.6";
            document.getElementById("ass_side3").style.opacity = "0.6";
            document.getElementById("ass_side1").style.opacity = "0.6";
            document.getElementById("ass_side5").style.opacity = "0.6";
            
            $("#ass_side4").css("transform","translateX(0px) scale(1.1)");
            $("#ass_side5").css("transform","translateX(-40px) scale(1)");
            $("#ass_side2").css("transform","translateX(40px)");
            $("#ass_side3").css("transform","translateX(-70px) scale(1)");
            $("#ass_side1").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("ass_side4").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("ass_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=4;
        }
        else if(flag==4)
        {
            $("#ass_side2").css("z-index","999");
            $("#ass_side4").css("z-index","9");
            $("#ass_side1").css("z-index","9");
            $("#ass_side3").css("z-index","8");
            $("#ass_side5").css("z-index","8");
            
            document.getElementById("ass_side2").style.opacity = "1";
            document.getElementById("ass_side1").style.opacity = "0.6";
            document.getElementById("ass_side3").style.opacity = "0.6";
            document.getElementById("ass_side4").style.opacity = "0.6";
            document.getElementById("ass_side5").style.opacity = "0.6";
            
             $("#ass_side2").css("transform","translateX(0px) scale(1.1)");
            $("#ass_side4").css("transform","translateX(-40px) scale(1)");
            $("#ass_side1").css("transform","translateX(40px)");
            $("#ass_side5").css("transform","translateX(-70px) scale(1)");
            $("#ass_side3").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("ass_side2").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("ass_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=0;
        }
    });
    $("#ass_pre").click(function(){
      for (var i=1;i<6;i++){
        $('#ass_side'+i).attr('onclick','lostresult('+lost_infoarray[lostX-i][0]+')');
        lostimg = lost_infoarray[lostX-i][2] == '貓' ? "../ohdogcat/images/Cat_icon.svg" : "../ohdogcat/images/Dog_icon.svg";
        $("#ass_Introduction_"+i).attr('src',lostimg); 
        $("#lname"+i).html(lost_infoarray[lostX-i][0] + "<br>" +lost_infoarray[lostX-i][6] + " " +lost_infoarray[lostX-i][4]); 
      }
      if (lostX > 6 ){
        lostX -= 1;
      }
    
       if(flag==0)
        {
            $("#ass_side1").css("z-index","999");
            $("#ass_side2").css("z-index","9");
            $("#ass_side3").css("z-index","9");
            $("#ass_side4").css("z-index","8");
            $("#ass_side5").css("z-index","8");
            
            document.getElementById("ass_side1").style.opacity = "1";
            document.getElementById("ass_side2").style.opacity = "0.6";
            document.getElementById("ass_side3").style.opacity = "0.6";
            document.getElementById("ass_side4").style.opacity = "0.6";
            document.getElementById("ass_side5").style.opacity = "0.6";
            
            $("#ass_side1").css("transform","translateX(0px) scale(1.1)");
            $("#ass_side2").css("transform","translateX(-40px) scale(1)");
            $("#ass_side3").css("transform","translateX(40px)");
            $("#ass_side4").css("transform","translateX(-70px) scale(1)");
            $("#ass_side5").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("ass_side1").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("ass_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=1;
        }
        else if(flag==1)
        {
            $("#ass_side2").css("z-index","999");
            $("#ass_side4").css("z-index","9");
            $("#ass_side1").css("z-index","9");
            $("#ass_side3").css("z-index","8");
            $("#ass_side5").css("z-index","8");
            
            document.getElementById("ass_side2").style.opacity = "1";
            document.getElementById("ass_side1").style.opacity = "0.6";
            document.getElementById("ass_side3").style.opacity = "0.6";
            document.getElementById("ass_side4").style.opacity = "0.6";
            document.getElementById("ass_side5").style.opacity = "0.6";
            
            $("#ass_side2").css("transform","translateX(0px) scale(1.1)");
            $("#ass_side4").css("transform","translateX(-40px) scale(1)");
            $("#ass_side1").css("transform","translateX(40px)");
            $("#ass_side5").css("transform","translateX(-70px) scale(1)");
            $("#ass_side3").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("ass_side2").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("ass_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=2;
        }
        else if(flag==2)
        {
            $("#ass_side4").css("z-index","999");
            $("#ass_side5").css("z-index","9");
            $("#ass_side2").css("z-index","9");
            $("#ass_side3").css("z-index","8");
            $("#ass_side1").css("z-index","8");
            
            document.getElementById("ass_side4").style.opacity = "1";
            document.getElementById("ass_side2").style.opacity = "0.6";
            document.getElementById("ass_side3").style.opacity = "0.6";
            document.getElementById("ass_side1").style.opacity = "0.6";
            document.getElementById("ass_side5").style.opacity = "0.6";
            
            $("#ass_side4").css("transform","translateX(0px) scale(1.1)");
           $("#ass_side5").css("transform","translateX(-40px) scale(1)");
            $("#ass_side2").css("transform","translateX(40px)");
            $("#ass_side3").css("transform","translateX(-70px) scale(1)");
            $("#ass_side1").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("ass_side4").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("ass_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=3;
        }
        else if(flag==3)
        {
            $("#ass_side5").css("z-index","999");
            $("#ass_side3").css("z-index","9");
            $("#ass_side4").css("z-index","9");
            $("#ass_side1").css("z-index","8");
            $("#ass_side2").css("z-index","8");
            
            document.getElementById("ass_side5").style.opacity = "1";
            document.getElementById("ass_side2").style.opacity = "0.6";
            document.getElementById("ass_side3").style.opacity = "0.6";
            document.getElementById("ass_side4").style.opacity = "0.6";
            document.getElementById("ass_side1").style.opacity = "0.6";
            
            $("#ass_side5").css("transform","translateX(0px) scale(1.1)");
            $("#ass_side3").css("transform","translateX(-40px) scale(1)");
            $("#ass_side4").css("transform","translateX(40px)");
            $("#ass_side1").css("transform","translateX(-70px) scale(1)");
            $("#ass_side2").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("ass_side5").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("ass_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side3").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=4;
        }
        else if(flag==4)
        {
            $("#ass_side3").css("z-index","999");
            $("#ass_side1").css("z-index","9");
            $("#ass_side5").css("z-index","9");
            $("#ass_side4").css("z-index","8");
            $("#ass_side2").css("z-index","8");
            
            document.getElementById("ass_side3").style.opacity = "1";
            document.getElementById("ass_side2").style.opacity = "0.6";
            document.getElementById("ass_side1").style.opacity = "0.6";
            document.getElementById("ass_side4").style.opacity = "0.6";
            document.getElementById("ass_side5").style.opacity = "0.6";
            document.getElementById("ass_side5").style.opacity = "0.6";
            
            $("#ass_side3").css("transform","translateX(0px) scale(1.1)");
            $("#ass_side1").css("transform","translateX(-40px) scale(1)");
            $("#ass_side5").css("transform","translateX(40px)");
            $("#ass_side2").css("transform","translateX(-70px) scale(1)");
            $("#ass_side4").css("transform","translateX(70px) scale(1)");
            
            document.getElementById("ass_side3").style.border = "solid 4px rgba(141, 141, 141, 1)";
            document.getElementById("ass_side2").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side1").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side4").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            document.getElementById("ass_side5").style.border = "solid 4px rgba(0, 0, 0, 0.25)";
            flag=0;
        }
    });    
});

