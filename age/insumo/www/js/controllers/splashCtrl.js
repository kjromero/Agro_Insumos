angular.module('proyect.controllers.splashCtrl',[])

.controller('splashCtrl', function($scope,InfoService, $http, $state,cordovaGeolocationService,GetCityDefault) {
	 
	var municipioId;
	var nameMunicipio ;
	var nameDepartamento;
	$scope.getCurrentPosition = function () {
            cordovaGeolocationService.getCurrentPosition(successHandler);
    };
    $scope.startWatchingPosition = function () {
            $scope.watchId = cordovaGeolocationService.watchPosition(successHandler);
    };
    $scope.stopWatchingPosition = function () {
            cordovaGeolocationService.clearWatch($scope.watchId);
            $scope.watchId = null;
            $scope.currentPosition = null;
    };
    // Handlers
     var successHandler = function (position) {
            $scope.currentPosition = position;
            GetCityDefault.get($scope.currentPosition.coords.latitude,$scope.currentPosition.coords.longitude)
            .then(function(response){
	            municipioId = response.data.Data.MunicipioId;
				nameMunicipio = response.data.Data.Nombre;
	     		nameDepartamento = response.data.Data.Departamento;
	     		// console.log(municipioId+ nameMunicipio +nameDepartamento);
	            // console.log("RESULT DATA : "+angular.toJson(response.data.Data));
	            // console.log("ID BY DEFAULT : "+municipio);
	            InfoService.setMunicipio(municipioId,nameMunicipio,nameDepartamento);
	            var municipio = InfoService.getMunicipio();
	            console.log(angular.toJson(municipio)+ municipio.nameM + municipio.nameD);
            });

    };
     $scope.cleanStack = function(){     
        $ionicHistory.goBack(-3);
    }

    $scope.getCurrentPosition();
  

})


.constant('cordovaGeolocationConstants', {
    apiVersion: '1.0.0',
    cordovaVersion: '>=3.4.0'
})
.factory('cordovaGeolocationService', ['$rootScope', '$log', 'cordovaGeolocationConstants', function ($rootScope, $log, cordovaGeolocationConstants) {
    return {
        /**
         * Return the current API version.
         */
        apiVersion: function () {
            $log.debug('cordovaGeolocationService.apiVersion.');
            return cordovaGeolocationConstants.apiVersion;
        },

        /**
         * Return the cordova API version.
         */
        cordovaVersion: function () {
            $log.debug('cordovaGeolocationService.cordovaVersion.');
            return cordovaGeolocationConstants.cordovaVersion;
        },

        /**
         * Check the geolocation plugin availability.
         * @returns {boolean}
         */
        checkGeolocationAvailability: function () {
            $log.debug('cordovaGeolocationService.checkGeolocationAvailability.');
            if (!navigator.geolocation) {
                $log.warn('Geolocation API is not available.');
                return false;
            }
            return true;
        },

        /**
         * Returns the device's current position to the geolocationSuccess callback with a Position object as the parameter.
         * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationgetcurrentposition
         */
        getCurrentPosition: function (successCallback, errorCallback, options) {
            $log.debug('cordovaGeolocationService.getCurrentPosition.');

            // Checking API availability
            if (!this.checkGeolocationAvailability()) {
                return;
            }

            // API call
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    $rootScope.$apply(successCallback(position));
                },
                function (error) {
                    $rootScope.$apply(errorCallback(error));
                },
                options
            );
        },

        /**
         * Returns the device's current position when a change in position is detected.
         * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationwatchposition
         */
        watchPosition: function (successCallback, errorCallback, options) {
            $log.debug('cordovaGeolocationService.watchPosition.');

            // Checking API availability
            if (!this.checkGeolocationAvailability()) {
                return;
            }

            // API call
            return navigator.geolocation.watchPosition(
                function (position) {
                    $rootScope.$apply(successCallback(position));
                },
                function (error) {
                    $rootScope.$apply(errorCallback(error));
                },
                options
            );
        },

        /**
         * Stop watching for changes to the device's location referenced by the watchID parameter.
         * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationclearwatch
         */
        clearWatch: function (watchID) {
            $log.debug('cordovaGeolocationService.clearWatch.');

            // Checking API availability
            if (!this.checkGeolocationAvailability()) {
                return;
            }

            // API call
            navigator.geolocation.clearWatch(watchID);
        }
    };
}])


.service('GetCityDefault', function($http, $log) {
    this.get = function(lat,lon) { 
       var promise  = $http({
           method : 'GET',
           url : 'http://192.168.1.134:8081/api/AgroInsumo/GetLocation?Long='+lon+'&Lat='+lat,
           headers: headers,
       }).success(function(data, status, headers, config) {
           detail = data.Data;
           return detail;
       }).error(function(data,status, headers, config) {
       }); 
       return promise; 
    };
})