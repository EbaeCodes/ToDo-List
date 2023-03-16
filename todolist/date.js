

exports.getDate = function() {

    var today = new Date();

    /*
    var currentDay = today.getDay();
    var day = " ";
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];
     if(currentDay === 6 || currentDay === 0 ){
        day = weekday[currentDay];
     }else{
        day = weekday[currentDay];
     }
    */

    var options = {
        weekday: "long",
        day:"numeric",
        month: "long"
    }
    var day= today.toLocaleDateString("en-US",options);
    return day;
}