var airlines = [{}];


var headers = {
	'Access-Control-Allow-Origin' : '*',
	'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
	'Content-Type': 'application/json',
	'Accept': 'application/json'
};

// Id categoria seleccionada por el usuario

var idCategoria = 0 ;
var IdInsumos = 0;
var municipio= 12;
var desde= 0;
var userLog = false;

var URL = "http://192.168.1.134:8081/api/agroinsumo/";
// http://186.155.199.197:8000/api/agroinsumo/Registro


angular.module('proyect.controllers', [])

 
// Login controller
.controller('loginCtrl', function($scope, $http ,$state) {

  // http://192.168.1.134:8081/api/agro/IniciarSesion


  // datos ingresados por el usuario
  $scope.login = {
  	email : '',
  	password: ''
  };

  var loguear = function(){
   
  }





  //form login/rregistro
  $scope.existUser = true;
  $scope.textButton = "Crear una cuenta"
  $scope.typeInput = "password"

  var stateViewPassword = true;

  $scope.existUserAction = function(){
    $scope.existUser = false;
    $scope.textButton =  "Ingresar"
  }

  $scope.viewPassword = function(){
    if (stateViewPassword) {
      //Ver
      stateViewPassword = false
      $scope.typeInput = "text"
      
    }else {
      stateViewPassword = true
      $scope.typeInput = "password"
    }
  }

  $scope.onSubmit = function(valid){

    console.log(valid);

    //validamos que los datos vengan correctos
    if (valid) {
      //validamos en  que vista estamos 
      if ($scope.existUser) {
        //si estanmos en registro, registramos los datos 
        $http({
            method: 'POST',
            url: URL+'/Registro',
            data: { 
                  "Correo":$scope.login.email,
                  "Clave" :$scope.login.password,
                  "AppId" :"0",
                  "TokenPush": "q239890afa8904"
                  },
            headers:headers,
         }).then(function(result) {
                  console.log(result);
                  if (result.data.Estado == 1) {
                    alert(result.data.Texto);
                    userLog = true;
                    $state.go('registro-result');
                  }else if(result.data.Estado == 0){
                    alert(result.data.Texto +" ingrese por favor");
                    console.log(result);
                  }
               }, function(error) {
                   console.log(error);
                   alert("Ha ocurrido un error");
              });

      }else if (!$scope.existUser){
        //si estanmos en registro, ingresamos el perfil
        $http({
            method: 'POST',
            url: URL+'/IniciarSesion',
            data: { 
                  "Email":$scope.login.email,
                  "password" :$scope.login.password,
                  "AppId" :"0",
                  "TokenPush": "q239890afa8904"
                  },
            headers:headers,
         }).then(function(result) {
                  console.log(result);
                  if (result.data.Estado == 1) {
                    alert(result.data.Texto);
                    userLog = true;
                    $state.go('registro-result');
                  }else if(result.data.Estado == 0){
                    alert(result.data.Texto);
                    console.log(result);
                  }
               }, function(error) {
                   console.log(error);
                   alert("ocurrio error");
                  return error;
              });
      }      
    } else {
      alert("Verifique sus datos");
    }

  }
  
  
})

//controlador de vista olvidoContrasena
.controller('olvidoContrasenaCtrl', function($scope, $http, API,$state) {

  $scope.errorEmail = false;
  $scope.enviado = false;

  $scope.textButton = "Enviar";

    $scope.formModel = {
      email : ''
    };


  // http://localhost:50145/api/AgroTeConecta/Olvido

  $scope.recuperarContrasena = function(){
    
    if (!$scope.formModel.email == " ") {
    $http({
        method: 'POST',
        url: 'http://192.168.1.134:8081/api/AgroTeConecta/Olvido',
        data: { "Correo":$scope.formModel.email},
        headers:headers,
      }).then(function(result) {
            
             if (result.data.Estado == 0) {
                $scope.errorEmail = true;
             }else if (result.data.Estado == 1) {
                $scope.enviado = true;
             }
         }, function(error) {
             console.log(error);
             console.log(" respuesta NEGATIVA");
      });
      
    }else{
      alert("el campo no puede estar vacio");
    };


  }
  
})









//controlador categorias
.controller('categoriaCtrl', function($scope, InsumoService ) {

  //Obtener imagen de la categoria
  $scope.imgCategoria = obtenerImgCategoria(idCategoria);

  $scope.insumos ={};
  console.log(idCategoria);

  //poblar lista  
 

  $scope.loadMore = function(){
    console.log("va en : "+desde);
    if ( desde == 15 ) {
       $scope.noMoreItemsAvailable = true;
    }
     InsumoService.searchAirlines("", idCategoria).then(
        function(matches) {

          $scope.insumos = matches;
        }
      )
     
    desde=desde+1;
    $scope.$broadcast('scroll.infiniteScrollComplete');  
  }



    //Funcion Autocompletable dentro de categoria
    $scope.data = {  "searchInCategoria" : '' };


    $scope.searchInCategoria = function() {

      if (!$scope.data.searchInCategoria == " ") {
        InsumoService.searchAirlines($scope.data.searchInCategoria, idCategoria).then(
          function(matches) {
            $scope.data.airlines = matches;
          }
        )
      }else{
      $scope.data.airlines = [];
      }  
    }

    //obtener id de insumo
    $scope.pasId = function(idInsumo){
      IdInsumos = idInsumo ;
    }

   //Obtener titulo de la categoria 
   $scope.nameCategoria = obtenerNameCategoria(idCategoria);
    
})


// controlador home

.controller('homeCtrl', ['$scope', 'InsumoService', function($scope, InsumoService) {

  $scope.userLog = userLog;
  //Obtener imagen de la categoria
  
	// var url = $scope.API.url;
  $scope.categoriaId = function(categoriaId){
      idCategoria = categoriaId;
      console.log(idCategoria);
  }


  //buscador
  $scope.data = {  "search" : '' };

  //Peticion de busqueda
  $scope.search = function() {


    if (!$scope.data.search == " ") {
      InsumoService.searchAirlines($scope.data.search, idCategoria).then(
        function(matches) {
          
          angular.forEach(matches, function(value, key){
              value["NameImagen"] = obtenerImgCategoria(value.IdInsumo);
              
              console.log(matches);
          });
          $scope.data.airlines = matches;
          // $scope.imgCategoria = obtenerImgCategoria($scope.data.airlines.IdInsumo);
        }
      )
    }else{
      $scope.data.airlines = [];
    }

  }


  //obtener id de insumo
  $scope.pasId = function(idInsumo){
    IdInsumos = idInsumo ;
  }

  $scope.closeSesion = function(){
    userLog = false;
    $scope.userLog = false;
  }


}])


//controlador Detalle insumo
.controller('insumoCtrl', function($scope , $http) {


  //Obtener imagen de la categoria
  $scope.imgCategoria = obtenerImgCategoria(idCategoria);
  //Obtener titulo de la categoria 
  $scope.nameCategoria = obtenerNameCategoria(idCategoria);

  $scope.detalleInsumo = {};
  $scope.groups = [];

  console.log("el insumo que enviamos es ====="+ IdInsumos);
  //servicio obtener detalle de insumo 
  $http({
      method: 'POST',
      url: URL+'ObtenerDetalleInsumos',
      data: {"Id":IdInsumos},
      headers:headers,
  }).then(function(result) {
            $scope.detalleInsumo = result.data.Data;

            $scope.groups[0] = {
                'name' : 'Marcas en el mercado',
                'items': $scope.detalleInsumo.Marca
            };

            $scope.groups[1] = {
                'name' : 'Puntos de venta',
                'items': $scope.detalleInsumo.PuntosVenta
            };

         }, function(error) {
          console.log(error);
  });

    //vistas desplegables
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };   

    //le fue util la informacion 
    $scope.yea = function(numero){
      if (numero == 1) {
        alert("Si");

      }else{
        alert("No");
      }
    }

  

})




// servicio Autocompletable Busqueda de insumos 

.factory('InsumoService', function( $q, $timeout, $http ) {

    // $scope.API = API;

   

    var searchAirlines = function(searchFilter , idCategoria) {
         
      
        // console.log('la busqueda es' + searchFilter);

        $http({
		    method: 'POST',
		    url: URL+'ObtenerInsumos',
		    data: {"CategoryId":idCategoria,"MunicipioId":"12", "Query":searchFilter},
		    headers:headers,
    		}).then(function(result) {
    		        airlines = result.data.Data;
    		        console.log("la respuesta fueee "+ airlines);

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