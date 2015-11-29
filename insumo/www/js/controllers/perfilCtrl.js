angular.module('proyect.controllers.perfilCtrl',[])

.controller('perfilCtrl', function($scope,InfoService, $http) {

	var URL = "http://192.168.1.134:8081/api/agroinsumo/";

	var headers = {
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};

	var userToken = InfoService.getToken();
	$scope.perfil ={};

	$scope.userModel = {
	    name  : '',
      email : '',
      documentId: '',
      education: '',
      placeCity: '',
      genero: '',
      cellPhone: '',
      productionList: '',
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

          $scope.userModel.name = result.data.Data.Nombre;
          $scope.userModel.email = result.data.Data.Correo;
          $scope.userModel.documentId = result.data.Data.DocIdentidad;
          $scope.userModel.education = result.data.Data.NivelEducativo;
          $scope.userModel.placeCity = result.data.Data.IdMunicipio;
          $scope.userModel.genero = result.data.Data.Genero;
          $scope.userModel.cellPhone = result.data.Data.NumeroCelular;
          $scope.userModel.productionList = result.data.Data.LugarDeProduccion;
          $scope.userModel.asociation = result.data.Data.PerteneceAsociacion;
          $scope.userModel.activity = result.data.Data.IdActividadAgricola;
          $scope.userModel.category = result.data.Data.IdCategoriaProducto;
          $scope.userModel.productionPricipal = result.data.Data.Correo;
          $scope.userModel.superfice = result.data.Data.Correo;


          alert("funciono!!");
       }, function(error) {
           console.log(error);
           alert("Ha ocurrido un error");
      });

  $scope.actualizarPerfil = function(){

    $http({
      method: 'POST',
      url: URL+'/ActualizarPerfil',
      data: {"UserId":userToken,
              "Nombre":$scope.userModel.name,
              "SegundoNombre":$scope.userModel.name,
              "Apellido":$scope.userModel.name,
              "SegundoApellido":$scope.userModel.name,
              "Correo":$scope.userModel.email,
              "DocIdentidad":$scope.userModel.documentId,
              "NivelEducativo":$scope.userModel.education,
              "IdMunicipio":$scope.userModel.placeCity,
              "Direccion":"direccion",
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
  	
})