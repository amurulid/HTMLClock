function getTime() {
    var curr=new Date();
    var h=curr.getHours();
    var m=curr.getMinutes();
    var s=curr.getSeconds();t
    m = check(m);
    s = check(s);
    document.getElementById('time').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(getTime,1000);
}

function getTemp() {

   var temperatureMax;
   var colorClass;
    $.getJSON("https://api.forecast.io/forecast/49c02677bd54463b86dafa2d6614b8c6/35.300399,-120.662362?callback=?",
      function(json) {
         temperatureMax = json.daily.data[0].temperatureMax;
         colorClass = getToday(temperatureMax);
         $("#forecastLabel").html(json.daily.summary);
         $("#forecastIcon").attr("src", "img/" + json.daily.icon + ".png");
         $("body").addClass(colorClass);
         });
}

function getToday(tmax) {
    var name;
    if (tmax < 60)
        name = "cold";
    if (tmax >= 60)
        name = "chilly";
    if (tmax >= 70)
        name = "nice";
    if (tmax >= 80)
        name = "warm";
    if (tmax >= 90)
        name = "hot";
        
    return name;
}

function check(num) {
   if (num < 10)
      num = "0" + num;
   return num;
}

function showAlarmPopup() {
    $( "#mask" ).removeClass("hide");
    $( "#popup" ).removeClass("hide");
}

function hideAlarmPopup() {
    $( "#mask" ).addClass("hide");
    $( "#popup" ).addClass("hide");
}

function insertAlarm(hours, mins, ampm, alarmName) {
    var div = $("<div>");
    var div1 =  $("<div>");
    var div2 =  $("<div>");
    $(div).addClass("flexable");
    $(div1).addClass("name");
    $(div2).addClass("time");
    $(div1).html(alarmName);
    $(div2).html(hours + ":" + mins + " , " + ampm);
    $(div).append(div1);
    $(div).append(div2);
    $("#alarms").append(div);
}

function addAlarm() {
    var hours, mins, ampm, alarmName;
    hours = $("#hours option:selected").text();
    mins = $("#mins option:selected").text();
    ampm = $("#ampm option:selected").text();
    alarmName =$("#alarmName").val();
    
    var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
      alarmObject.save({"hours": hours, "mins": mins, "ampm": ampm,"alarmName": alarmName}, {
      success: function(object) {
            insertAlarm(hours, mins, ampm, alarmName);
            hideAlarmPopup();
      }
    });
}

function deleteAlarm() {
    alarmName =$("#delAlarm").val();
    alarmObject.remove({"alarmName": alarmName});
}

function getAllAlarms() {
    Parse.initialize("01owFsTOu7b2ip8DKNoarvK76RW4acswtSjYVnQD", "u1u7M4gmsa5q6LzKU9lvl8dGYrQjqnRlUWnA4fcg");
    
    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
            insertAlarm(results[i].get("hours"), results[i].get("mins"), results[i].get("ampm"), results[i].get("alarmName"));
          }
        }
    });
    


}