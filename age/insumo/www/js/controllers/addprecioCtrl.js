angular.module('proyect.controllers.addprecioCtrl',[])

.controller('addprecioCtrl', function($scope,InfoService, $http, $state, ProductoService,PuntoDeVentaService) {
	 
	     $scope.adding = true;

      var URL = "http://192.168.1.134:8081/api/agroinsumo/";

      var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };


    var userToken = InfoService.getToken();
    var dataAdding = InfoService.getAddPrecio();
    var categoria = InfoService.getCategoryId();
    var defIdCategoria;
    console.log("---------------"+dataAdding.idPresentacion);
    var productoId;
    var IdPv ;

    $scope.precioModel = {
	   categoria  : '',
      producto : dataAdding.producto,
      presentacion: dataAdding.presentacion,
      ciudad: dataAdding.ciudad,
      direccion: '',
      nombrePuntoDeVenta: '',
      precio: '',
      comentario: '' 
    };


    if(!dataAdding.categoria == " "){
    	defIdCategoria = dataAdding.categoria;

    }
    if(!categoria == " "){
    	defIdCategoria = categoria;
    }

    console.log(defIdCategoria);
    console.log(categoria);
    console.log(dataAdding.categoria);

    productoId = dataAdding.idInsumo;

    switch(defIdCategoria) {

	    case 1:
	         $scope.precioModel.categoria = "1";
	        break;
	    case 2:
	       $scope.precioModel.categoria = "2";
	        break;
        case 3:
	        $scope.precioModel.categoria = "3";
	        break;
        case 4:
	        $scope.precioModel.categoria = "4";
	        break;
	    default:
	        $scope.precioModel.categoria = "0";
	}

	//Obtener imagen de la categoria
    $scope.imgCategoria = obtenerImgCategoria(defIdCategoria);
    //Obtener titulo de la categoria 
    $scope.nameCategoria = obtenerNameCategoria(defIdCategoria);



	var userToken = InfoService.getToken();
	
  	$scope.modificarDatos = function(){
  		$scope.adding = true;
  		// $route.reload();
  	}
  	
  	$scope.goConfirmar = function(){
  		$scope.adding = false;

  		// $route.reload();
  	}
 
  	


 	//buscador
	// $scope.precioModel = {  "producto" : '' };

	//Peticion de busqueda
	$scope.searchProducto = function() {

  	if (!$scope.precioModel.producto == " ") {
  	  ProductoService.searchAirlines($scope.precioModel.producto, categoria ,userToken).then(
  	    function(matches) {
  	      console.log(matches);
  	      $scope.precioModel.airlines = matches;
  	    }
  	  )
  	}else{
  	  $scope.precioModel.airlines = [];
  	}

	}

	$scope.selectProducto = function(NombreInsumo, Cantidad, UnidadPresentacion ,IdInsumo, municipio , departamento, presentacion){
    
      $scope.precioModel.producto =  NombreInsumo ;
      $scope.precioModel.presentacion =  Cantidad + " "+ UnidadPresentacion;
      $scope.precioModel.ciudad =  municipio + " "+departamento;
      productoId = IdInsumo;

      $scope.precioModel.airlines = [];
  }

  $scope.goToAddPV = function(){
  	$state.go('addPuntoVenta');
  }


  
  //Peticion de busqueda de puntos de venta 
  $scope.searchPuntoVenta = function() {
// ObtenerPuntoDeVenta
    if (!$scope.precioModel.nombrePuntoDeVenta == " ") {
      PuntoDeVentaService.searchPV($scope.precioModel.nombrePuntoDeVenta, categoria).then(
        function(matches) {
          console.log(matches);
          $scope.precioModel.puntosVenta = matches;
        }
      )
    }else{
      $scope.precioModel.puntosVenta = [];
    }

  }

  $scope.selectPuntoVenta = function(nombrePV, idPv){
    
      $scope.precioModel.nombrePuntoDeVenta =  nombrePV ;
      IdPv = idPv;

      $scope.precioModel.puntosVenta = [];
  }



  $scope.addPrecio = function(){

    //   $http({
    //     method: 'POST',
    //     url: URL+'Agreg',
    //     data: { "IdPresentacionProducto":dataAdding.categoria,
    //       "Producto":productoId,
    //       "PuntoDeVenta":"123",
    //       "Marca":"1",
    //       "Precio":$scope.precioModel.precio,
    //       "Comentario":$scope.precioModel.comentario,
    //       "Token":userToken
    //       },
    //     headers:headers,
    //  }).then(function(result) {
    //         console.log(result);
    //         alert(result.data.Texto);
    //         $state.go('home');

    //      }, function(error) {
    //          console.log(error);
    //          alert("Ha ocurrido un error"+error);
    //     });


     $http({
      method: 'POST',
      url: URL+'AgregarPrecioReportado',
      data: { "IdPresentacionProducto":dataAdding.idPresentacion,
          "Producto":productoId,
          "PuntoDeVenta":IdPv,
          "Marca":"1",
          "Precio":$scope.precioModel.precio,
          "Comentario":$scope.precioModel.comentario,
          "Token":userToken
          },
      headers:headers,
    }).then(function(result) {
        // $scope.favoritos = result.data.Data;
        alert("Precio Añadido correctamente ");
         $state.go('home');
         }, function(error) {
          console.log(error);
    });


  }


})
 
//buscar productos
.factory('ProductoService', function( $q, $timeout, $http ) {

    // $scope.API = API;
    var searchAirlines = function(searchFilter , idCategoria ,token) {
         
        // console.log('la busqueda es' + searchFilter);

        $http({
		    method: 'POST',
		    url: URL+'ObtenerInsumos',
		    data: {"CategoryId":idCategoria,"MunicipioId":"110", "Query":searchFilter,"Token":token},
		    headers:headers,
    		}).then(function(result) {
    		      airlines = result.data.Data;
    			    var matches = airlines.filter(function(airline) {
    			    	if(airline.NombreInsumo.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
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

        searchAirlines : searchAirlines

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


//retorna el Nombre de la categoria segun el id
var obtenerNameCategoria = function(idCategoria) {
  Categoria1 = "Fertilizantes";
  Categoria2 = "Medicamentos Veterinarios";
  Categoria3 = "Vacunas ";
  Categoria4 = "Plagicidas";
  categoria = "";

  switch(idCategoria) {

    case 1:
        categoria = Categoria1;
        break;

    case 2:
        categoria = Categoria4;
        break;

    case 3:
        categoria = Categoria2;
        break;

    case 4:
        categoria = Categoria3;
        break;  

    default:
        categoria = " ";
        break;
  }
   return categoria;
}


//retorna la imagen de la categoria segun el id
var obtenerImgCategoria = function(idCategoria) {
  Imagen1 = "Icon_fertilizante";
  Imagen2 = "Icon_medicamentos";
  Imagen3 = "icon_vacunas";
  Imagen4 = "icon_plaguicidas";
  Imagen = "";

  switch(idCategoria) {

    case 1:
        Imagen = Imagen1;
        break;

    case 2:
        Imagen = Imagen4;
        break;

    case 3:
        Imagen = Imagen2;
        break;

    case 4:
        Imagen = Imagen3;
        break;  

    default:
        Imagen = " ";
        break;
  }
  return Imagen;
};
