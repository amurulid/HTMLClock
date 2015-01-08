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

function check(num) {
   if (num < 10)
      num = "0" + num;
   return num;
}
