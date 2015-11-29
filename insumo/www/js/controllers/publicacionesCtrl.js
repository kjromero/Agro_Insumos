angular.module('proyect.controllers.publicacionesCtrl',[])

.controller('publicacionesCtrl', function($scope,InfoService, $http, PuntoDeVentaService, $state) {

	var URL = "http://192.168.1.134:8081/api/agroinsumo/";

  $scope.oneditar = true;

	var headers = {
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};

  var productoId;
  var idPv ;

  var categoria = InfoService.getCategoryId();


	var userToken = InfoService.getToken();

      $http({
        method: 'POST',
        url: URL+'ObtenerPrecioReportado',
        data:{"Token":userToken},
        headers:headers,
     }).then(function(result) {
            console.log(result);
            $scope.publicaciones = result.data.Data;

         }, function(error) {
             console.log(error);
             alert("Ha ocurrido un error"+error);
        });


  $scope.actionEdit = function(objet){
      $scope.publicacion = {
        categoria  : '',
        producto : objet.Producto,
        presentacion: objet.IdPresentacionProducto,
        ciudad: '',
        direccion: '',
        nombrePuntoDeVenta: objet.PuntodeVentaText,
        precio: objet.Precio,
        comentario: objet.Comentario 
      };
      
      productoId = objet.Id

      $scope.oneditar = false;
      $route.reload();

  }


  $scope.actionDelete = function(objet){


       $http({
        method: 'POST',
        url: URL+'EliminaPrecioReportado',
        data: { "Id":objet.Id
          },
        headers:headers,
     }).then(function(result) {
            console.log(result);
            alert(result.data.Texto);
            $scope.oneditar = false;
            $state.go('home');

         }, function(error) {
             console.log(error);
             alert("Ha ocurrido un error"+error);
        });




  }



  $scope.goConfirmar = function(){
    

    $http({
        method: 'POST',
        url: URL+'EditarAgregarPrecioReportado',
        data: { "IdPresentacionProducto":$scope.publicacion.categoria,
          "Producto":productoId,
          "PuntoDeVenta":idPv,
          "Marca":"1",
          "Precio":$scope.publicacion.precio,
          "Comentario":$scope.publicacion.comentario,
          "Token":userToken
          },
        headers:headers,
     }).then(function(result) {
            console.log(result);
            alert(result.data.Texto);
            $scope.oneditar = false;
            $state.go('home');

         }, function(error) {
             console.log(error);
             alert("Ha ocurrido un error"+error);
        });


  }


  //Peticion de busqueda de puntos de venta 
  $scope.searchPuntoVenta = function() {
  // ObtenerPuntoDeVenta
    if (!$scope.publicacion.nombrePuntoDeVenta == " ") {
      PuntoDeVentaService.searchPV($scope.publicacion.nombrePuntoDeVenta, categoria).then(
        function(matches) {
          console.log(matches);
          $scope.publicacion.puntosVenta = matches;
        }
      )
    }else{
      $scope.publicacion.puntosVenta = [];
    }

  }

  $scope.selectPuntoVenta = function(nombrePV, idPv){
    
      $scope.publicacion.nombrePuntoDeVenta =  nombrePV ;
      idPv = idPv;

      $scope.publicacion.puntosVenta = [];
  }






})



// buscar punto de venta
.factory('PuntoDeVentaService', function( $q, $timeout, $http ) {

    // $scope.API = API;
    var searchPV = function(searchFilter) {
         
        // console.log('la busqueda es' + searchFilter);

        $http({
        method: 'POST',
        url: URL+'ObtenerPuntoDeVenta',
        data: {"Id":"0","Municipio":"723","IdPresentacion":"0","Query":searchFilter},
        headers:headers,
        }).then(function(result) {
              puntosVenta = result.data.Data;
              var matches = puntosVenta.filter(function(airline) {
                if(airline.Nombre.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
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

        searchPV : searchPV

    }
})
