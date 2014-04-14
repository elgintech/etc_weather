// Make sure our document is fully loaded
$(document).ready(function() {

  // Load initial weather to be seen on the page
  loadWeather('Seattle',''); //@params require: location, woeid

  // When submitting the zipcode, then find zipcode and reload weather content.
  $('#getWeather').submit(function(e) {

    // Find the zipcode from what was entered
    var zipcode = $('#getWeather input').val();


    // Pass our loadWeather function the new location
    loadWeather(zipcode,''); //@params location, woeid

    // Reset the input value
    $('#getWeather input').val('');

    // Prevent the form from submitting through
    e.preventDefault();
  });
});


// function to grab info from weather service and display it on the page.
function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.tempAlt+'&deg;C</li></ul>';

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}


/*
 * simpleWeather
 * http://simpleweatherjs.com
 *
 * A simple jQuery plugin to display the current weather
 * information for any location using Yahoo! Weather.
 *
 * Developed by James Fleeting <@fleetingftw> <http://iwasasuperhero.com>
 * Another project from monkeeCreate <http://monkeecreate.com>
 *
 * Version 2.6.0 - Last updated: February 26 2014
 */

(function(e){"use strict";e.extend({simpleWeather:function(t){t=e.extend({location:"",woeid:"2357536",unit:"f",success:function(e){},error:function(e){}},t);var n=new Date;var r="http://query.yahooapis.com/v1/public/yql?format=json&rnd="+n.getFullYear()+n.getMonth()+n.getDay()+n.getHours()+"&diagnostics=true&callback=?&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=";if(t.location!==""){r+='select * from weather.forecast where woeid in (select woeid from geo.placefinder where text="'+t.location+'" and gflags="R") and u="'+t.unit+'"'}else if(t.woeid!==""){r+="select * from weather.forecast where woeid="+t.woeid+' and u="'+t.unit+'"'}else{t.error("Could not retrieve weather due to an invalid location.");return false}e.getJSON(encodeURI(r),function(n){if(n!==null&&n.query.results!==null&&n.query.results.channel.description!=="Yahoo! Weather Error"){e.each(n.query.results,function(e,n){if(n.constructor.toString().indexOf("Array")!==-1){n=n[0]}var r=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];var i=r[Math.round(n.wind.direction/22.5)];if(n.item.condition.temp<80&&n.atmosphere.humidity<40){var s=-42.379+2.04901523*n.item.condition.temp+10.14333127*n.atmosphere.humidity-.22475541*n.item.condition.temp*n.atmosphere.humidity-6.83783*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)-5.481717*Math.pow(10,-2)*Math.pow(n.atmosphere.humidity,2)+1.22874*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)*n.atmosphere.humidity+8.5282*Math.pow(10,-4)*n.item.condition.temp*Math.pow(n.atmosphere.humidity,2)-1.99*Math.pow(10,-6)*Math.pow(n.item.condition.temp,2)*Math.pow(n.atmosphere.humidity,2)}else{var s=n.item.condition.temp}if(t.unit==="f"){var o="c";var u=Math.round(5/9*(n.item.condition.temp-32));var a=Math.round(5/9*(n.item.forecast[0].high-32));var f=Math.round(5/9*(n.item.forecast[0].low-32));var l=Math.round(5/9*(n.item.forecast[1].high-32));var c=Math.round(5/9*(n.item.forecast[1].low-32));var h=Math.round(5/9*(n.item.forecast[1].high-32));var p=Math.round(5/9*(n.item.forecast[1].low-32));var d=Math.round(5/9*(n.item.forecast[2].high-32));var v=Math.round(5/9*(n.item.forecast[2].low-32));var m=Math.round(5/9*(n.item.forecast[3].high-32));var g=Math.round(5/9*(n.item.forecast[3].low-32));var y=Math.round(5/9*(n.item.forecast[4].high-32));var b=Math.round(5/9*(n.item.forecast[4].low-32))}else{var o="f";var u=Math.round(9/5*n.item.condition.temp+32);var a=Math.round(9/5*n.item.forecast[0].high+32);var f=Math.round(9/5*n.item.forecast[0].low+32);var l=Math.round(9/5*(n.item.forecast[1].high+32));var c=Math.round(9/5*(n.item.forecast[1].low+32));var h=Math.round(9/5*(n.item.forecast[1].high+32));var p=Math.round(9/5*(n.item.forecast[1].low+32));var d=Math.round(9/5*(n.item.forecast[2].high+32));var v=Math.round(9/5*(n.item.forecast[2].low+32));var m=Math.round(9/5*(n.item.forecast[3].high+32));var g=Math.round(9/5*(n.item.forecast[3].low+32));var y=Math.round(9/5*(n.item.forecast[4].high+32));var b=Math.round(9/5*(n.item.forecast[4].low+32))}var w={title:n.item.title,temp:n.item.condition.temp,tempAlt:u,code:n.item.condition.code,todayCode:n.item.forecast[0].code,units:{temp:n.units.temperature,distance:n.units.distance,pressure:n.units.pressure,speed:n.units.speed,tempAlt:o},currently:n.item.condition.text,high:n.item.forecast[0].high,highAlt:a,low:n.item.forecast[0].low,lowAlt:f,forecast:n.item.forecast[0].text,wind:{chill:n.wind.chill,direction:i,speed:n.wind.speed},humidity:n.atmosphere.humidity,heatindex:s,pressure:n.atmosphere.pressure,rising:n.atmosphere.rising,visibility:n.atmosphere.visibility,sunrise:n.astronomy.sunrise,sunset:n.astronomy.sunset,description:n.item.description,thumbnail:"//l.yimg.com/a/i/us/nws/weather/gr/"+n.item.condition.code+"ds.png",image:"//l.yimg.com/a/i/us/nws/weather/gr/"+n.item.condition.code+"d.png",tomorrow:{high:n.item.forecast[1].high,highAlt:l,low:n.item.forecast[1].low,lowAlt:c,forecast:n.item.forecast[1].text,code:n.item.forecast[1].code,date:n.item.forecast[1].date,day:n.item.forecast[1].day,image:"//l.yimg.com/a/i/us/nws/weather/gr/"+n.item.forecast[1].code+"d.png"},forecasts:{one:{high:n.item.forecast[1].high,highAlt:h,low:n.item.forecast[1].low,lowAlt:p,forecast:n.item.forecast[1].text,code:n.item.forecast[1].code,date:n.item.forecast[1].date,day:n.item.forecast[1].day,image:"//l.yimg.com/a/i/us/nws/weather/gr/"+n.item.forecast[1].code+"d.png"},two:{high:n.item.forecast[2].high,highAlt:d,low:n.item.forecast[2].low,lowAlt:v,forecast:n.item.forecast[2].text,code:n.item.forecast[2].code,date:n.item.forecast[2].date,day:n.item.forecast[2].day,image:"//l.yimg.com/a/i/us/nws/weather/gr/"+n.item.forecast[2].code+"d.png"},three:{high:n.item.forecast[3].high,highAlt:m,low:n.item.forecast[3].low,lowAlt:g,forecast:n.item.forecast[3].text,code:n.item.forecast[3].code,date:n.item.forecast[3].date,day:n.item.forecast[3].day,image:"//l.yimg.com/a/i/us/nws/weather/gr/"+n.item.forecast[3].code+"d.png"},four:{high:n.item.forecast[4].high,highAlt:y,low:n.item.forecast[4].low,lowAlt:b,forecast:n.item.forecast[4].text,code:n.item.forecast[4].code,date:n.item.forecast[4].date,day:n.item.forecast[4].day,image:"//l.yimg.com/a/i/us/nws/weather/gr/"+n.item.forecast[4].code+"d.png"}},city:n.location.city,country:n.location.country,region:n.location.region,updated:n.item.pubDate,link:n.item.link};t.success(w)})}else{if(n.query.results===null){t.error("An invalid WOEID or location was provided.")}else{t.error("There was an error retrieving the latest weather information. Please try again.")}}});return this}})})(jQuery)



// REF: http://foundation.zurb.com/docs/
// REF: http://simpleweatherjs.com/


