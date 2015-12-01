angular.module('proyect.controllers.perfilCtrl',[])

.controller('perfilCtrl', 
  function($scope,InfoService, $http, SearchMunicipioInsumo,$ionicPopup,CambiarClave,  $ionicScrollDelegate,$ionicHistory,$ionicPopup) {

	var URL = "http://192.168.1.134:8081/api/agroinsumo/";

	var headers = {
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};

	var userToken = InfoService.getToken();
  var IdMunicipio;
	$scope.perfil ={};

	$scope.userModel = {
	    nombreCompleto  : '',
      email : '',
      documentId: '',
      education: '',
      placeCity: '',
      direccion : '',
      genero: '',
      cellPhone: '',
      productionList: '',
      direccionProduccion: '',
      asociation: '',
      activity: '',
      category: '',
      productionPricipal: '',
      superfice: ''
    };


	$http({
	    method: 'POST',
	    url: URL+'ObtenerPerfil',
	    data: {"UserId":userToken},
	    headers:headers,
	 }).then(function(result) {
          console.log(result);
          $scope.perfil = result.data.Data;

          $scope.userModel.nombreCompleto = result.data.Data.Nombre;
          $scope.userModel.email = result.data.Data.Correo;
          $scope.userModel.documentId = result.data.Data.DocIdentidad;
          $scope.userModel.education = result.data.Data.NivelEducativo;
          $scope.userModel.placeCity = result.data.Data.IdMunicipio;
          $scope.userModel.direccion = result.data.Data.Direccion;
          $scope.userModel.genero = result.data.Data.Genero;
          $scope.userModel.cellPhone = result.data.Data.NumeroCelular;
          $scope.userModel.productionList = result.data.Data.LugarDeProduccion;
          $scope.userModel.direccionProduccion = 
          $scope.userModel.asociation = result.data.Data.PerteneceAsociacion;
          $scope.userModel.activity = result.data.Data.IdActividadAgricola;
          $scope.userModel.category = result.data.Data.IdCategoriaProducto;
          $scope.userModel.productionPricipal = result.data.Data.Correo;
          $scope.userModel.superfice = result.data.Data.Correo;

       }, function(error) {
           console.log(error);
           alert("Ha ocurrido un error");
      });

  $scope.actualizarPerfil = function(){

    $http({
      method: 'POST',
      url: URL+'ActualizarPerfil',
      data: { "UserId":userToken,
              "Nombre":$scope.userModel.nombreCompleto,
              "SegundoNombre":$scope.userModel.nombreCompleto,
              "Apellido":$scope.userModel.nombreCompleto,
              "SegundoApellido":$scope.userModel.nombreCompleto,
              "Correo":$scope.userModel.email,
              "DocIdentidad":$scope.userModel.documentId,
              "NivelEducativo":$scope.userModel.education,
              "IdMunicipio":IdMunicipio,
              "Direccion":$scope.userModel.direccion,
              "Genero":$scope.userModel.genero,
              "NumeroCelular":$scope.userModel.cellPhone,
              "LugarDeProduccion":$scope.userModel.productionList,
              "PerteneceAsociacion":$scope.userModel.asociation,
              "Asociacion":"asopapa",
              "NitAsociacion":"1587456",
              "IdActividadAgricola":$scope.userModel.activity,
              "IdCategoriaProducto":$scope.userModel.category 
            },
      headers:headers,
   }).then(function(result) {
          console.log(result);

          alert("Sus datos han sido guardados");
       }, function(error) {
           console.log(error);
           alert("Ha ocurrido un error");
      });

  }

  $scope.userModel = {  "placeCity" : '' };

  $scope.searchMunicipio = function(){

      if(!$scope.userModel.placeCity == " ") {
        SearchMunicipioInsumo.searchMunicipios($scope.userModel.placeCity).then(
            function(matches) {
            $scope.userModel.municipios = matches;
          
            // $scope.imgCategoria = obtenerImgCategoria($scope.data.airlines.IdInsumo);
           }
        )
      }else{
         $scope.userModel.municipios = [];
      }
      // console.log($scope.userModel.municipios);
    }

    $scope.selectMunicipio = function(nameMunicipio, nameDepartamento, idM ){
        IdMunicipio = idM;
        $scope.userModel.placeCity = nameMunicipio +", "+ nameDepartamento;

        $scope.userModel.municipios = [];
    }


    /*$scope.showPopup = function() {
    $scope.data = {}
    // An elaborate, custom popup 
    var myPopup = $ionicPopup.show({
      template: '<input type="password" placeholder="Ingrese su nueva clave" ng-model="data.password"> <br>'+
                '<input type="password" placeholder="Re ingrese la clave" ng-model="data.repassword">',
      title: 'Restablesca su clave',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Recuperar</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (angular.equals($scope.data.password,$scope.data.repassword)) {
              var dataUs= userToken
              console.log("SETTING TOKEN "+dataUs)
              console.log("las contrasenas son "+ $scope.data.password +$scope.data.repassword)
              CambiarClave.update(dataUs,$scope.data.password,$scope.data.repassword).then(function(response){
                 var datares=response.data;
                 if(datares.Estado== 1) {
                   $ionicPopup.alert({
                       title: datares.Texto,
                       template: '<br>'
                     }).then;
                  }
                  else{
                    $ionicPopup.alert({
                       title: datares.Texto,
                       template: '<br>'
                     }).then;
                  }
            });
          e.preventDefault();
        } else {
          $ionicPopup.alert({
                title: 'Resultado',
                template: "Las claves ingresadas no coinciden. Por favor rectifique e intente de nuevo"
              }).then;
          }
        }
       }
      ]
    });
  }*/

  $scope.showPopup = function() {
  $scope.modaldata = {'datos':''}
  $scope.modaldatare = {'datosre':''}
  console.log($scope.modaldata.datos);
  console.log($scope.modaldatare.datosre);
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" placeholder="Ingrese su nueva clave" ng-model="modaldata.datos"> <br>'+
              '<input type="password" placeholder="Re ingrese la clave" ng-model="modaldatare.datosre">',
    title: 'Restablesca su clave',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'Cancelar' },
      {
        text: '<b>Recuperar</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (angular.equals($scope.modaldata.datos,$scope.modaldatare.datosre)) {
            var modaldataUs=userToken;
            console.log("SETTING TOKEN "+modaldataUs)
            CambiarClave.update(modaldataUs,$scope.modaldata.datos,$scope.modaldatare.datosre).then(function(response){
                       var datares1=response.data;
                       if(datares1.Estado== 1) {
                         $ionicPopup.alert({
                             title: 'Resultado',
                             template: response.Texto
                           }).then;
                        }
                        else{
                          $ionicPopup.alert({
                             title: 'Resultado',
                             template: response.Texto
                           }).then;
                        }
                  });
            e.preventDefault();
          } else {
            $ionicPopup.alert({
                  title: 'Resultado',
                  template: "Las claves ingresadas no coinciden. Por favor rectifique e intente de nuevo"
                }).then;
            }
          }
         }
        ]
      });
    }


})




// busqueda de municipio
.factory('SearchMunicipioInsumo', function($q, $timeout, $http ) {

 
    var searchMunicipios = function(searchMini) { 

        $http({
        method: 'POST',
        url: URL+'ObtenerMunicipios',
        data: {"query":searchMini},
        headers:headers,
        }).then(function(result) {
              municipios = result.data.Data;
              var matches = municipios.filter(function(municipio) {
                if(municipio.Nombre.toLowerCase().indexOf(searchMini.toLowerCase()) !== -1 ) return true;
              })

           
            $timeout( function(){
            
               deferred.resolve( matches );

            }, 100);


           }, function(error) {
            console.log(error);
      });

        var deferred = $q.defer();

        return deferred.promise;

    };

    return {

        searchMunicipios : searchMunicipios

    }
})




.service('CambiarClave', function($http, $log) {
    this.update = function(token,nueva,confirmacion) {
      var toSend={ "UserId":token,"Nueva":nueva,"Confirmacion":confirmacion}
       console.log("JSON TO SEND : "+angular.toJson(toSend))
       var promise  = $http({
           method : 'POST',
           url : URL+'CambiarContrasena',
           data: { "UserId":token,"Nueva":nueva,"Confirmacion":confirmacion},
           headers: headers,
       }).success(function(data, status, headers, config) {
           console.log("JSON CREADO : "+angular.toJson(data))
           customers = data;
           return customers;
       }).error(function(data,status, headers, config) {
       }); 
       return promise; 
    };
});