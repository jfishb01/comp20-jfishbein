var initLat = 42.330497742;
var initLng = -71.095794678;
var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(initLat, initLng);
var mapOptions = {
	zoom: 11, // The larger the zoom number, the bigger the zoom
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var meMarker;
var infowindow = new google.maps.InfoWindow();
var places;
var redStations = [];
var redBranchAshmont = [];
var redBranchBraintree = [];
var markers = [];

var stations = new Array();


stations[0] = {name:"Alewife", lat: 42.395428, lng: -71.142483,ID: "RALEN"};
stations[1] = {name:"Davis", lat: 42.39674, lng: -71.121815,ID: "RDAVN"};
stations[2] = {name:"Davis", lat: 42.39674, lng: -71.121815,ID: "RDAVS"};
stations[3] = {name:"Porter", lat: 42.3884, lng: -71.119149,ID: "RPORN"};
stations[4] = {name:"Porter", lat: 42.3884, lng: -71.119149,ID: "RPORS"};
stations[5] = {name:"Harvard", lat: 42.373362, lng: -71.118956,ID: "RHARN"};
stations[6] = {name:"Harvard", lat: 42.373362, lng: -71.118956,ID: "RHARS"};
stations[7] = {name:"Central", lat: 42.365486, lng: -71.103802,ID: "RCENN"};
stations[8] = {name:"Central", lat: 42.365486, lng: -71.103802,ID: "RCENS"};
stations[9] = {name:"Kendall/MIT", lat: 42.36249079, lng: -71.08617653,ID: "RKENN"};
stations[10] = {name:"Kendall/MIT", lat: 42.36249079, lng: -71.08617653,ID: "RKENS"};
stations[11] = {name:"Charles MGH", lat: 42.361166, lng: -71.070628,ID: "RMGHN"};
stations[12] = {name:"Charles MGH", lat: 42.361166, lng: -71.070628,ID: "RMGHS"};
stations[13] = {name:"Park St.", lat: 42.35639457, lng: -71.0624242,ID: "RPRKN"};
stations[14] = {name:"Park St.", lat: 42.35639457, lng: -71.0624242,ID: "RPRKS"};
stations[15] = {name:"Downtown Crossing", lat: 42.355518, lng: -71.060225,ID: "RDTCN"};
stations[16] = {name:"Downtown Crossing", lat: 42.355518, lng: -71.060225,ID: "RDTCS"};
stations[17] = {name:"South Station", lat: 42.352271, lng: -71.055242,ID: "RSOUN"};
stations[18] = {name:"South Station", lat: 42.352271, lng: -71.055242,ID: "RSOUS"};
stations[19] = {name:"Broadway", lat: 42.342622, lng: -71.056967,ID: "RBRON"};
stations[20] = {name:"Broadway", lat: 42.342622, lng: -71.056967,ID: "RBROS"};
stations[21] = {name:"Andrew Station", lat: 42.330154, lng: -71.057655,ID: "RANDN"};
stations[22] = {name:"Andrew Station", lat: 42.330154, lng: -71.057655,ID: "RANDS"};
stations[23] = {name:"JFK/UMass Station", lat: 42.320685, lng: -71.052391,ID: "RJFKN"}; //FIRST BRAINTREE STATION
stations[24] = {name:"JFK/UMass Station", lat: 42.320685, lng: -71.052391,ID: "RJFKS"};
stations[25] = {name:"North Quincy Station", lat: 42.275275, lng: -71.029583,ID: "RNQUN"};
stations[26] = {name:"North Quincy Station.", lat: 42.275275, lng: -71.029583,ID: "RNQUS"};
stations[27] = {name:"Wollaston Station", lat: 42.251809, lng: -71.005409,ID: "RWOLN"};
stations[28] = {name:"Wollaston Station", lat: 42.251809, lng: -71.005409,ID: "RWOLS"};
stations[29] = {name:"Quincy Center Station", lat: 42.251809, lng: -71.005409,ID: "RQUCN"};
stations[30] = {name:"Quincy Center Station", lat: 42.251809, lng: -71.005409,ID: "RQUCS"};
stations[31] = {name:"Quincy Adams Station", lat: 42.233391, lng: -71.007153,ID: "RQUAN"};
stations[32] = {name:"Quincy Adams Station", lat: 42.233391, lng: -71.007153,ID: "RQUAS"};
stations[33] = {name:"Braintree Station", lat: 42.2078543, lng: -71.0011385,ID: "RBRAS"};
stations[34] = {name:"Savin Hill Station", lat: 42.31129, lng: -71.053331,ID: "RSAVN"}; //First ALEWIFE?ASHMONT STATION
stations[35] = {name:"Savin Hill Station", lat: 42.31129, lng: -71.053331,ID: "RSAVS"};
stations[36] = {name:"Fields Corner Station", lat: 42.300093, lng: -71.061667,ID: "RFIEN"};
stations[37] = {name:"Fields Corner Station", lat: 42.300093, lng: -71.061667,ID: "RFIES"};
stations[38] = {name:"Shawmut Station", lat: 42.29312583, lng: -71.06573796,ID: "RSHAN"};
stations[39] = {name:"Shawmut Station", lat: 42.29312583, lng: -71.06573796,ID: "RSHAS"};
stations[40] = {name:"Ashmont Station", lat: 42.284652, lng: -71.064489,ID: "RASHS"};


  
function initialize() {
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  tico = new google.maps.MarkerImage(
    "images/t_icon.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(25, 25));
  
  var count = 0;
  for(var i = 0; i <=40; i++) {
    if((i == 0) || (stations[i].lat != stations[i-1].lat) && (stations[i].lng != stations[i-1].lng)) {
      pt = new google.maps.LatLng(stations[i].lat, stations[i].lng);
      markers.push(new google.maps.Marker({position: pt, title: stations[i].name, icon: tico}));
      if(i < 23)
      {
        redStations.push(pt);
      }
      else if(i == 23)
      {
        redStations.push(pt);
        redBranchAshmont.push(pt);
        redBranchBraintree.push(pt);        
      }
      else if(i > 23 && i < 34)
      {
        redBranchBraintree.push(pt);        
      }
      else
      {
        redBranchAshmont.push(pt);      
      }
    } 
  }  
  for (var m in markers) {
		markers[m].setMap(map);
		google.maps.event.addListener(markers[m], 'click', function() {
      mvcObj = this;
      var request;
      try {
        request = new XMLHttpRequest();
      }
      catch (ms1) { // yes, exception handling is supported in JavaScript
        try {
          request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (ms2) {
          try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
          }
          catch (ex) {
            request = null;
          }
        }
      }
      if (request == null) {
        alert("Error creating request object --Ajax not supported?");
      }

      var stopID = new String(this.ID);
      var content = "<strong>" + this.title + "</strong>";
      
      request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json?PlatformKey=" + stopID, true);
      request.send();
      request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200) {
          console.log("JSON FILE WAS READ!!!!!");
          results = JSON.parse(request.responseText);
          while (results[count] != undefined) {
            content += results[count]['TimeRemaining'] + "\n";
            //content += '<table id="schedule"><tr><th>Line</th><th>Trip #</th><th>Direction</th><th>Time Remaining</th></tr>';
            count++;
          }
          infowindow.setContent(content);
          infowindow.open(map, mvcObj);
        } 
      }
    });
  }
     
  // Render polylines (Red, Orange, and Blue)
  redLine = new google.maps.Polyline({
		path: redStations,
		strokeColor: "#DD0000",
		strokeOpacity: 1.0,
		strokeWeight: 5
	});
	redLine.setMap(map);
	redLineAshmont = new google.maps.Polyline({
			path: redBranchAshmont,
			strokeColor: "#DD0000",
			strokeOpacity: 1.0,
			strokeWeight: 5
		});
	redLineAshmont.setMap(map);
	redLineBraintree = new google.maps.Polyline({
			path: redBranchBraintree,
			strokeColor: "#DD0000",
			strokeOpacity: 1.0,
			strokeWeight: 5
		});
	redLineBraintree.setMap(map);
  getMyLocation();
}

function getMyLocation()
{
  if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
	  navigator.geolocation.getCurrentPosition(function(position) {
		myLat = position.coords.latitude;
		myLng = position.coords.longitude;
    
  me = new google.maps.LatLng(myLat, myLng);
	// Update map and go there...
	//map.panTo(me);

	// Create a meMarker
  console.log("MY location point: " + myLat + " " + myLng);
	meMarker =  new google.maps.Marker({position: me, title: "Me"});
	meMarker.setMap(map);
  map.panTo(me)
  //renderMap();
    renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap()
{
//var meico = new google.maps.MarkerImage(
//    "images/me.png",
//    null, /* size is determined at runtime */
//    null, /* origin is 0,0 */
//    null, /* anchor is bottom center of the scaled image */
//    new google.maps.Size(30, 30));
    

	// Open info window on click of meMarker
	google.maps.event.addListener(meMarker, 'click', function() {
    content = 'My location is (' + myLat + ', ' + myLng + ')';
    infowindow.setContent(content);
	  infowindow.open(map, meMarker);
	});

	  minDist = haversine(markers[0]);
    closestStation = markers[0].title;
    for (var m in markers) {
      curDist = haversine(markers[m]);
      if (curDist < minDist) {
        minDist = curDist;
        closestStation = markers[m].title;
      }
    }
    
    var info = document.getElementById('info');
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(info);
    info.innerHTML = 'Closest Station is ' + closestStation + '!</br>It is ' + minDist + 'km away!';  
}
      
function haversine(station)
{

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

  var R = 6371; // km
  var lat1 = myLat;
  var lat2 = station.position.lat();
  var lon1 = myLng;
  var lon2 = station.position.lng();
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return (R * c);
}
      

function parse(stop) {
  console.log("in parse function");
	var request;

  try {
    request = new XMLHttpRequest();
  }
  catch (ms1) { // yes, exception handling is supported in JavaScript
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (ms2) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (ex) {
        request = null;
      }
    }
  }
  if (request == null) {
    alert("Error creating request object --Ajax not supported?");
  }

  request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json?stop_name=" + stop.title, true);
  request.send();
  console.log
  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200) {
      results = JSON.parse(request.responseText);
			content = "<strong>" + stop.title + "</strong>";
      while (parsed[count] != undefined) {
        parsed[count]['company'];
      infowindow.setContent(content);
			infowindow.open(map, mvcObj);
    }
  }
}
}
