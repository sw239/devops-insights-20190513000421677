var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);
	

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";
    var a,b,c,d;
    var marker;
    var txt=null;
   

                var map = new google.maps.Map(document.getElementById('googleMap'), {
                          zoom: 4,
                        center: {lat: -36.8485, lng: 174.7633}
                    });
    google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
   
    });

function placeMarker(location) {
        marker = new google.maps.Marker({
        position: location,   
        map: map,
       
    });   
 	var lat= marker.getPosition().lat();
 	var lon= marker.getPosition().lng();
    
    
    var st=lat+'&lon='+lon+'&appid=b6907d289e10d714a6e88b30761fae22';
    $http({
                method: "GET",
                url: 'https://openweathermap.org/data/2.5/weather?lat='+st
                
            })
            .then( function(response) {
                var y=JSON.stringify(response); var z=y.split('"'); var i=0;
				while(z[i]!=="main"){
				i++;
				}
				
					txt="Weather is:  "+z[i+2];
            });
            
  			
}
var infowindow = new google.maps.InfoWindow({
    		content: txt
  			});
marker.addListener('click', function() {
    infowindow.open(map, marker);
  });   


    $scope.zip = function(which) {
       
        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        }

        if(data.length >= 4) {
           
            $http({
                method: "GET",
                url: '/api/v1/getWeather?zip=' + data
            }).then( function(response) {
                var myLatLng=null;
               
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    myLatLng = {lat: response.data.la, lng: response.data.lo};           

                    a= new google.maps.Marker({
                         position: myLatLng,
                        map: map,
                         
                    });
                  
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    myLatLng = {lat: response.data.la, lng: response.data.lo};           

                    b = new google.maps.Marker({
                         position: myLatLng,
                        map: map,
                         
                    });
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                    myLatLng = {lat: response.data.la, lng: response.data.lo};           

                    c = new google.maps.Marker({
                         position: myLatLng,
                        map: map,
                         
                    });
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                    myLatLng = {lat: response.data.la, lng: response.data.lo};           

                    d = new google.maps.Marker({
                         position: myLatLng,
                        map: map,
                         
                    });
                }
            });
        } else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                }
        }
    };
   
}]);