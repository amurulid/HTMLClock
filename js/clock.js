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
    var name
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
