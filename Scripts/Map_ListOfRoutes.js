// This js contains all the common functions for map modules


var defaultRoutedata = null;
var routeList = [];

// Route polygon array
var arrPolygon = [];
var RemoveArrPolygon = [];
var polygone;
var serviceType = new serviceTypes();
var routeColor = new routeColors();
var busStatuses = new BusStatuses();

var routeid_choithram = 5447;
var routeid_niranjanpur = 5438;
var routeid_mhow = 5444;
var routeid_raubypass = 5442;
var routeid_siliconcity = 5440;

var kmtopixel = 30;

var mapServiceToRouteTypes = new Map();
var mapBusStatusValues = new Map();

//--- Class to Rotate icon of given image
var RotateIcon = function (options) {
    this.options = options || {};
    this.rImg = options.img || new Image();
    this.rImg.src = this.options.url;
    this.updatedImage = new Image();

    this.options.width = 30;  //this.options.width || this.rImg.width || 52;
    this.options.height = 30; //this.options.height || this.rImg.height || 60;

    canvas = document.createElement("canvas");
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
};
RotateIcon.makeIcon = function (url, angle) {
    return new RotateIcon({ url: url, angle: angle });
};
RotateIcon.prototype.setRotation = function (options) {
    var canvasctx = this.context,
        angle = options.deg ? options.deg * Math.PI / 180 :
            options.rad,
        centerX = this.options.width / 2,
        centerY = this.options.height / 2;

    canvasctx.clearRect(0, 0, this.options.width, this.options.height);
    canvasctx.save();
    canvasctx.translate(centerX, centerY);
    canvasctx.rotate(angle);
    canvasctx.translate(-centerX, -centerY);
    canvasctx.drawImage(this.rImg, 0, 0);

    this.updatedImage.src = canvasctx.canvas.toDataURL("image/png");
    //canvasctx.restore();
    return this;
};
RotateIcon.prototype.getUrl = function () {
    return this.canvas.toDataURL('image/png');
};
//--- End Class


// Class for colors, all bus and route colors are to be defined here and can be used in all map modules to draw and plot
function routeColors() {
    this.iBus = '#44AD49';
    this.Feeder = '#013B99';
    this.Midi = '#D71A0D';
}

// Service types are to be defined and update here
function serviceTypes() {
    this.svcTypeACBus = "Semi Low Floor AC Bus";
    this.svcTypeStandardBus = "Semi Low Floor Standard Bus";
    this.svcTypeMidiBus = "Semi Low Floor Midi Bus";
}

function BusStatuses() {
    this.Running = "Running";
    this.Idle = "Idle";
    this.StandBy = "StandBy";
    this.BreakDown = "BreakDown";
    this.NoComm = "Nocommunication";
}

function VehicleData() {
    this.numberMarker = null;
    this.busMarker = null;
    this.MarkerInfoWindow = null;
    this.Status = enumBusStatuses.Running;
    this.IncidentCounts = new Incident();
    this.speed = 0;
    this.location = "";
    this.regno = "";
    this.vehicleId = 0;
    this.routeType = enumRouteTypes.iBus;
    this.busDataElement = null;
}

function Incident() {
    this.AmbulanceCnt = 0;
    this.AccidentCnt = 5;
    this.BreakdownCnt = 15;
    this.FireCnt = 0;
    this.SecurityCnt = 120;
    this.OverSpeedCnt = 0;
    this.UnderSpeedCnt = 0;
    this.RouteViolationCnt = 4;
    this.MissedStopCnt = 0;
    this.DelayedStartCnt = 0;
    this.TamperCnt = 0;
    this.BusbunchingCnt = 0;
}

Incident.prototype.ResetAll = function () {
    this.AmbulanceCnt = 0;
    this.AccidentCnt = 0;
    this.Breakdown = 0;
    this.Fire = 0;
    this.Security = 0;
    this.OverSpeed = 0;
    this.UnderSpeed = 0;
    this.RouteViolation = 0;
    this.MissedStop = 0;
    this.DelayedStart = 0;
}

enumIncidents = {
    Ambulance: 0,
    Accident: 1,
    Breakdown: 2,
    Fire: 3,
    Security: 4,
    OverSpeed: 5,
    UnderSpeed: 6,
    RouteViolation: 7,
    MissedStop: 8,
    DelayedStart: 9
}

// Route type flagged enum
enumRouteTypes = {
    iBus: 1,
    Feeder: 2,
    Midi: 4
}

// Bus running status flagged enum, will be used to check which status is selected
enumBusStatuses = {
    Running: 1,
    Idle: 2,
    StandBy: 4,
    BreakDown: 8,
    NoComm: 16
}

// Populate Map of service type and route types, add here new entries if required in future..
mapServiceToRouteTypes.set(serviceType.svcTypeACBus, enumRouteTypes.iBus);
mapServiceToRouteTypes.set(serviceType.svcTypeStandardBus, enumRouteTypes.Feeder);
mapServiceToRouteTypes.set(serviceType.svcTypeMidiBus, enumRouteTypes.Midi);

mapBusStatusValues.set(busStatuses.Running, enumBusStatuses.Running);
mapBusStatusValues.set(busStatuses.Idle, enumBusStatuses.Idle);
mapBusStatusValues.set(busStatuses.StandBy, enumBusStatuses.StandBy);
mapBusStatusValues.set(busStatuses.BreakDown, enumBusStatuses.BreakDown);
mapBusStatusValues.set(busStatuses.NoComm, enumBusStatuses.NoComm);

// Creates SVG symbol with the given color and rotation angle
function CreateSVGSymbol(rotation, servicetype) {
    try {
        var angle, color, svg;

        var angle = (rotation > 180) ? (rotation - 180) : (180 + rotation);

        if (servicetype == serviceType.svcTypeACBus) {
            busImage = '../Images/Route%20replay%20svg%20icons/ibus.svg';
            color = routeColor.iBus;
        }
        else if (servicetype == serviceType.svcTypeStandardBus) {
            busImage = '../Images/Route%20replay%20svg%20icons/Feeder%20Bus-01.svg';
            color = routeColor.Feeder;
        }
        else if (servicetype == serviceType.svcTypeMidiBus) {
            busImage = '../Images/Route%20replay%20svg%20icons/Midi%20Bus-02.svg';
            color = routeColor.Midi;
        }
        else {
            busImage = '../Images/Route%20replay%20svg%20icons/City%20Bus-02.svg';
        }

        svg = {
            //path of svg marker icon 
            path: 'M21.332,10.665C21.332,4.774,16.557,0,10.666,0S0,4.774,0,10.665c0,3.98,2.186,7.445,5.417,9.278H5.413c0,0,2.577,1.739,2.976,' +
                    '4.3H6.511L10.712,30l4.109-5.757h-1.877c0.397-2.561,2.975-4.3,2.975-4.3h-0.004C19.147,18.11,21.332,14.646,21.332,10.665z M10.666,' +
                    '13.928c-1.812,0-3.28-1.468-3.28-3.279c0-1.812,1.469-3.28,3.28-3.28s3.28,1.469,3.28,3.28C13.946,12.459,12.478,13.928,10.666,13.928z',
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: 0,
            anchor: new google.maps.Point(14, 18),
            // scale: 0.6,
            rotation: angle
        };
    }
    catch (err) {
        //Exception occured!, will log it later
    }

    return svg;
}

// Plot All Routes on Map
function PlotAllRoutes(map, routeid) {
    if (routeid == undefined) {
        routeid = 0;
    }

    $.ajax({
        type: "POST",
        url: DomainUrl() + 'ListofRoutesLocations/PlotRoutesOnMap/',
        data: { routeid: routeid },


        beforeSend: function () {
        },
        success: function (data) {
            //Assign route data into variable to use later
            defaultRoutedata = data;

            DrawRoutesOnMap(routeid);
        }
    });
}

// Draw given Route on map, if routeid not given than all routes would be drawn by default
function DrawRoutesOnMap(RouteID) {
    debugger

    var data = defaultRoutedata;
    var Pre_Routeid = 0, Curr_Routeid = 0;

    lats = [];
    longs = [];
    ColorArray = [];
    routeList = [];
    var PolyCount = 0;

    $.each(data, function (i, value) {
        if ($.inArray(value.RouteId, routeList) === -1) {
            //if ((RouteID == undefined) || (RouteID.indexOf(value.RouteId) != -1))
            routeList.push(value.RouteId);
        }


    });

    $.each(routeList, function (i, value) {
        var result = $.grep(data, function (e, j) {
            return e.RouteId == value;
        });

        if (routeList[i] == RouteID) {
            routeList.splice(i, 1);
        }

        var myLatlng = [];
        var LatLong = [];
        var currentRouteColor = "";
        $.each(result, function (k, latLong) {
            currentRouteColor = latLong.ColorCode;

            myLatlng.push(new google.maps.LatLng(parseFloat(latLong.Latitude), parseFloat(latLong.longitude)))
            LatLong.push([parseFloat(latLong.longitude), parseFloat(latLong.Latitude)]);
        });

        var distance = 10 / 20000, // Radius to draw polygon
        geoInput = {
            type: "LineString",
            coordinates: LatLong
        };
        var geoReader = new jsts.io.GeoJSONReader(), geoWriter = new jsts.io.GeoJSONWriter();
        var geometry = geoReader.read(geoInput).buffer(distance);
        var polygon = geoWriter.write(geometry);

        var oLanLng = [];
        oCoordinates = polygon.coordinates[0];
        for (i = 0; i < oCoordinates.length; i++) {
            var oItem;
            oItem = oCoordinates[i];
            oLanLng.push(new google.maps.LatLng(oItem[1], oItem[0]));
        }
        if (RouteID == undefined || RouteID == 0) {
            currentRouteColor = "#666666";

            var polygone = new google.maps.Polygon({
                paths: oLanLng,
                strokeColor: currentRouteColor,
                fillColor: 'Gray',
                strokeOpacity: 0.5,
                map: map
            });

            polygone.setMap(map);
            arrPolygon.push([value, polygone, currentRouteColor]);
            RemoveArrPolygon.push([value, polygone, currentRouteColor]);
        }
        else {
            // Set color of only selected routeid and clear all

            for (var i = 0; i < arrPolygon.length; i++) {    //clears whole route polygon
                if (arrPolygon[i][0] == RouteID) {
                    if (arrPolygon[i][1])
                        arrPolygon[i][1].setOptions({ strokeColor: currentRouteColor });
                }
                else {
                    if (arrPolygon[i][1])
                        arrPolygon[i][1].setOptions({ strokeColor: '#666666' });
                }
            }
        }
        PolyCount++;
        RemoveArrPolygon.length = 0;
    });
}

function CreateSVGMarker(rotation, servicetype, position, map, displayMarker) {
    try {
        var color, svg, backgroundSVGImage = '';
        var angle = 0;

        if (rotation != -1)
            angle = (rotation > 180) ? (rotation - 180) : (180 + rotation);

        if (servicetype == serviceType.svcTypeACBus) {
            backgroundSVGImage = '../Images/Route%20replay%20svg%20icons/Green_Icon-07.svg';
        }
        else if (servicetype == serviceType.svcTypeStandardBus) {
            backgroundSVGImage = '../Images/Route%20replay%20svg%20icons/Blue_Icon-05.svg';
        }
        else if (servicetype == serviceType.svcTypeMidiBus) {
            backgroundSVGImage = '../Images/Route%20replay%20svg%20icons/Red_Icon-09.svg';
        }
        else {
            backgroundSVGImage = '../Images/Route%20replay%20svg%20icons/Blue_Icon-05.svg';
        }

        var marker = new google.maps.Marker({
            position: position,
            //map: map,
            size: new google.maps.Size(25, 25),
        });

        var icon;
        if (angle > 0) {
            icon = {
                url: RotateIcon.makeIcon(backgroundSVGImage, angle)
                .setRotation({ deg: angle }).updatedImage.src,
                anchor: new google.maps.Point(13, 16)
            };
        }
        else {
            icon = {
                url: RotateIcon.makeIcon(backgroundSVGImage, angle)
                .setRotation({ deg: angle }).updatedImage.src
            }
        }

        marker.setOptions({
            icon: icon
        });

        if (displayMarker)
            marker.setMap(map);

        return marker;
    }
    catch (err) {
        // Exception occured!, will log it later
        console.log(err);
    }

    return null;
}

function UpdateBusMarker(marker, rotation, servicetype, position) {
    var angle = (rotation > 180) ? (rotation - 180) : (180 + rotation);
    var backgroundSVGImage = '';

    if (servicetype == serviceType.svcTypeACBus) {
        backgroundSVGImage = '../Images/Route%20replay%20svg%20icons/Green_Icon-07.svg';
    }
    else if (servicetype == serviceType.svcTypeStandardBus) {
        backgroundSVGImage = '../Images/Route%20replay%20svg%20icons/Blue_Icon-05.svg';
    }
    else if (servicetype == serviceType.svcTypeMidiBus) {
        backgroundSVGImage = '../Images/Route%20replay%20svg%20icons/Red_Icon-09.svg';
    }
    else {
        backgroundSVGImage = '../Images/Route%20replay%20svg%20icons/Blue_Icon-05.svg';
    }

    marker.setOptions({
        icon: {
            url: RotateIcon.makeIcon(backgroundSVGImage, angle)
            .setRotation({ deg: angle }).updatedImage.src,
            anchor: new google.maps.Point(13, 16)
        },
        position: position
    });
}

function CreateNumberMarker(rotation, servicetype, position, vehicleNo, map, index, displayMarker) {
    var imagePath, vehicleNumber, arrVehicleData;
    var angle = (rotation > 180) ? (rotation - 180) : (180 + rotation);

    arrVehicleData = vehicleNo.split('-');
    vehicleNumber = arrVehicleData[arrVehicleData.length - 1];

    if (servicetype == serviceType.svcTypeACBus) {
        imagePath = '../Images/Route%20replay%20svg%20icons/Green_Bus_Number-08.svg';
    }
    else if (servicetype == serviceType.svcTypeStandardBus) {
        imagePath = '../Images/Route%20replay%20svg%20icons/Blue_Bus_Number-05.svg';
    }
    else if (servicetype == serviceType.svcTypeMidiBus) {
        imagePath = '../Images/Route%20replay%20svg%20icons/Red_Bus_Number-10.svg';
    }
    else {
        imagePath = '../Images/Route%20replay%20svg%20icons/City%20Bus-02.svg';
    }

    var offset = CheckandSetOffset(angle);

    var image = {
        url: imagePath,
        anchor: new google.maps.Point(offset.x, offset.y)
    };

    var marker = new google.maps.Marker({
        position: position,
        //map: map,
        size: new google.maps.Size(25, 10),
        icon: image,
        label: {
            text: vehicleNumber,
            // Add in the custom label here
            fontFamily: 'Roboto, Arial, sans-serif',
            fontSize: '12px',
            fontWeight: 'Bold',
            color: '#FFFFFF'
        },
        //zIndex: 100 + index
    });

    if (displayMarker)
        marker.setMap(map);

    return marker;
    //}
}

function UpdateNumberMarker(marker, rotation, servicetype, position, vehicleNo) {
    var imagePath, vehicleNumber, arrVehicleData;
    var angle = (rotation > 180) ? (rotation - 180) : (180 + rotation);

    arrVehicleData = vehicleNo.split('-');
    vehicleNumber = arrVehicleData[arrVehicleData.length - 1];

    if (servicetype == serviceType.svcTypeACBus) {
        imagePath = '../Images/Route%20replay%20svg%20icons/Green_Bus_Number-08.svg';
    }
    else if (servicetype == serviceType.svcTypeStandardBus) {
        imagePath = '../Images/Route%20replay%20svg%20icons/Blue_Bus_Number-05.svg';
    }
    else if (servicetype == serviceType.svcTypeMidiBus) {
        imagePath = '../Images/Route%20replay%20svg%20icons/Red_Bus_Number-10.svg';
    }
    else {
        imagePath = '../Images/Route%20replay%20svg%20icons/City%20Bus-02.svg';
    }

    var offset = CheckandSetOffset(angle);

    var image = {
        url: imagePath,
        anchor: new google.maps.Point(offset.x, offset.y)
    };

    marker.setOptions({
        position: position,
        icon: image,
        label: {
            text: vehicleNumber,
            // Add in the custom label here
            fontFamily: 'Roboto, Arial, sans-serif',
            fontSize: '12px',
            fontWeight: 'Bold',
            color: '#FFFFFF'
        }
    });
}

function CheckandSetOffset(angle) {
    var yoffset = 33, xoffset = 22;
    //var yoffset = 5, xoffset = 8;

    // Return object of offsets..
    return { x: xoffset, y: yoffset };
}

// Styling map, retro theme
function CreateStyledMapType() {
    var styledMapType = new google.maps.StyledMapType(
                [
  {
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#ebe3cd"
        }
      ]
  },
  {
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#444444"
        },
        {
            "weight": 1.5
        }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
            "visibility": "off"
        }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
            "color": "#c9b2a6"
        }
      ]
  },
  {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
            "color": "#dcd2be"
        }
      ]
  },
  {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#ae9e90"
        }
      ]
  },
  {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#dfd2ae"
        }
      ]
  },
  {
      "featureType": "poi",
      "stylers": [
        {
            "visibility": "off"
        }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#dfd2ae"
        }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#93817c"
        }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
            "color": "#a5b076"
        }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#447530"
        }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#f5f1e6"
        }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
            "visibility": "off"
        }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#fdfcf8"
        }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#f8c967"
        }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
            "color": "#e9bc62"
        }
      ]
  },
  {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#e98d58"
        }
      ]
  },
  {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
            "color": "#db8555"
        }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#806b63"
        }
      ]
  },
  {
      "featureType": "transit",
      "stylers": [
        {
            "visibility": "off"
        }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#dfd2ae"
        }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#8f7d77"
        }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
            "color": "#ebe3cd"
        }
      ]
  },
  {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#dfd2ae"
        }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
            "color": "#b9d3c2"
        }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#92998d"
        }
      ]
  }
                ],
                { name: 'Map' });

    return styledMapType;
}