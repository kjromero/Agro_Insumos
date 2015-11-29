var airlines = [{}];
var municipios = [{}];
    

var headers = {
	'Access-Control-Allow-Origin' : '*',
	'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
	'Content-Type': 'application/json',
	'Accept': 'application/json'
};

// Id categoria seleccionada por el usuario

var idCategoria = 0 ;
var IdInsumos = 0;
var municipio= 0;
var desde= 0;
var userLog = false;

var URL = "http://192.168.1.134:8081/api/agroinsumo/";
// http://186.155.199.197:8000/api/agroinsumo/Registro


angular.module('proyect.controllers', [])

 
// Login controller
.controller('loginCtrl', function($scope, $http ,$state,InfoService) {

  // http://192.168.1.134:8081/api/agro/IniciarSesion

 
  // datos ingresados por el usuario
  $scope.login = {
  	email : '',
  	password: ''
  };   
 

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
                  $scope.existUser = false;
                  if (result.data.Estado == 1) {
                    alert(result.data.Texto);
                    $state.go('login');
                  }else if(result.data.Estado == 0){
                    alert(result.data.Texto +" ingrese por favor");
                    console.log(result);
                    $state.go('login');
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
                    InfoService.setToken(result.data.Token);
                    alert(result.data.Texto);
                    InfoService.setUserLogin(true);
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
        url: URL+'/Olvido',
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
.controller('categoriaCtrl', function($scope, $state,InsumoService ,InfoService,$http) {

  var categoria = InfoService.getCategoryId();
  $scope.insumos ={};
  var token = InfoService.getToken();
  //poblar lista  
 
     InsumoService.searchAirlines("", categoria).then(
        function(matches) {

          angular.forEach(matches, function(value, key){
            if (value.Favorito == false) {
              value["starFav"] = "icon-star_line_off";
            }else if (value.Favorito == true) {
              value["starFav"] = "icon-star_line_on";
            };
              console.log(value.Favorito);
          });

          $scope.insumos = matches;
        }
      )
    //Funcion Autocompletable dentro de categoria
    $scope.data = {  "searchInCategoria" : '' };
    $scope.searchInCategoria = function() {

      if (!$scope.data.searchInCategoria == " ") {
        InsumoService.searchAirlines($scope.data.searchInCategoria, categoria).then(
          function(matches) {

            $scope.data.airlines = matches;
          }
        )
      }else{
      $scope.data.airlines = [];
      }  
    }



    // //obtener id de insumo
    // $scope.pasId = function(idInsumo){
    //   IdInsumos = idInsumo ;
    // }

    //Obtener imagen de la categoria
   $scope.imgCategoria = obtenerImgCategoria(categoria);
   //Obtener titulo de la categoria 
   $scope.nameCategoria = obtenerNameCategoria(categoria);
  
   $scope.goToInsumo = function(idIns, idGeo, idPret){
      var dataInsumo = {
        Id : idIns,
        Municipio : idGeo,
        idPret : idPret
      }

      InfoService.setInfoInsumo(dataInsumo);
      console.log("id insumo:"+dataInsumo.Id+"id municipio:"+dataInsumo.Municipio+"id presentacion:"+dataInsumo.idPret);

      $state.go('insumo');

   }
    $scope.iconFavorite = "icon-star_line_on"
    $scope.textStateFavorite = "Quitar de favoritos";
    
   $scope.actionFavorite = function(insumoObjet){      

    if (insumoObjet.Favorito){

        $http({
          method: 'POST',
          url: URL+'Favorito',
          data: {
            "Token":token,
            "Id":insumoObjet.IdInsumo,
            "Estado":"false",
            "IdPresentacion":insumoObjet.IdUnidadPresentacion,
            "IdGeografia":insumoObjet.IdGeografia
          },
          headers:headers,
        }).then(function(result) {
              alert(result.data.Texto);
              $route.reload();
           }, function(error) {
             alert("error");
            console.log(error);
        });

        // InfoService.deleteFavorite(object) 
    }else if (!insumoObjet.Favorito){
        
      $http({
        method: 'POST',
        url: URL+'Favorito',
        data: {
          "Token":token,
          "Id":insumoObjet.IdInsumo,
          "Estado":"True",
          "IdPresentacion":insumoObjet.IdUnidadPresentacion,
          "IdGeografia":insumoObjet.IdGeografia
        },
        headers:headers,
      }).then(function(result) {
            alert(result.data.Texto);
            $route.reload();
         }, function(error) {
          alert("error");
          console.log(error);
      });   
    }
      
  }

})












//controlador Detalle insumo
.controller('insumoCtrl', function($scope , $http ,InfoService, SearchMunicipioInsumo, $state, $cordovaSocialSharing) {

  var dataInsumo = InfoService.getDetalleInsumo();
 
  var IdMunicipio ;
  var token = InfoService.getToken();

  $scope.municipioDefaul = {
    busqueda : ''
  }

  $scope.detalleInsumo = {};
  $scope.groups = [];

  //servicio obtener detalle de insumo 
  $http({
      method: 'POST',
      url: URL+'ObtenerDetalleInsumo',
      data: {"Id":dataInsumo.Id, "Municipio":dataInsumo.Municipio, "Presentacion":dataInsumo.idPret},
      headers:headers,
  }).then(function(result) {
            $scope.detalleInsumo = result.data.Data;
            console.log(result);
             $scope.detalleInsumo.Marcas.NombreMarca;
             $scope.detalleInsumo.PuntosDeVentas.Nombre;
             $scope.detalleInsumo.Historicos.Precio;


            $scope.municipioDefaul = {
              busqueda :$scope.detalleInsumo.Municipio +" , "+ $scope.detalleInsumo.Departamento
            }


            //Obtener imagen de la categoria
            $scope.imgCategoria = obtenerImgCategoria($scope.detalleInsumo.CategoriaId);
            //Obtener titulo de la categoria 
            $scope.nameCategoria = obtenerNameCategoria($scope.detalleInsumo.CategoriaId);
            
         }, function(error) {
          console.log(error);
      });
    

    // //vistas desplegables

      $scope.desplegado1 = false;
      $scope.desplegado2 = false;
      $scope.desplegado3 = false;
    $scope.desplegar = function(num){
      if (num==1) {
          $scope.desplegado1 = true;
          $scope.desplegado2 = false;
          $scope.desplegado3 = false;
      }else if (num==2) {
          $scope.desplegado1 = false;
          $scope.desplegado3 = false;
          $scope.desplegado2 = true;
      }else if (num==3) {
          $scope.desplegado3 = true;
          $scope.desplegado1 = false;
          $scope.desplegado2 = false;
      };
    }



    // addprecio
    $scope.goToAddPrecio = function(){
      var addingPrecioFormat = {
        categoria: $scope.detalleInsumo.CategoriaId,
        producto: $scope.detalleInsumo.NombreInsumo,
        presentacion: $scope.detalleInsumo.Cantidad + " " + $scope.detalleInsumo.UnidadPresentacion,
        ciudad: $scope.detalleInsumo.Municipio +" , "+ $scope.detalleInsumo.Departamento,
        namepv:'',
        precio:'',
        comentarios:'',
        idInsumo: $scope.detalleInsumo.IdInsumo,
        idMunicipio: $scope.detalleInsumo.CodigoMunicipio,
        idPresentacion: $scope.detalleInsumo.IdUnidadPresentacion

      }
      InfoService.setAddPrecio(addingPrecioFormat);
      console.log(addingPrecioFormat);
      $state.go('addprecio');

    }

    //le fue util la informacion 
    $scope.yea = function(numero){
      var util;
      if (numero == 1) {
        util = true;
        alert("Ha marcado esta informacion como util");

      }
      if (numero == 2) {
        util = false;
        alert("Ha marcado esta informacion como NO! util");
      }

      $http({
        method: 'POST',
        url: URL+'MarcarComoUtil',
        data:{"Id":dataInsumo.Id,"Estado":util},
        headers:headers,
     }).then(function(result) {
            console.log(result);
            alert(result.data.Texto);
            $state.go('home');

         }, function(error) {
             console.log(error);
             alert("Ha ocurrido un error"+error);
        });



    }


    $scope.municipioDefaul = {  "busqueda" : '' };

    $scope.searchMunicipio = function(){
      

      if(!$scope.municipioDefaul.busqueda == " ") {
        SearchMunicipioInsumo.searchMunicipios($scope.municipioDefaul.busqueda).then(
            function(matches) {
            $scope.municipioDefaul.municipios = matches;
          
            // $scope.imgCategoria = obtenerImgCategoria($scope.data.airlines.IdInsumo);
           }
        )
      }else{
         $scope.municipioDefaul.municipios = [];
      }
      // console.log($scope.municipioDefaul.municipios);

    }

    $scope.selectMunicipio = function(nameMunicipio, nameDepartamento, idM ){
        IdMunicipio = idM;
        console.log(nameMunicipio);
        console.log(nameDepartamento);
        $scope.municipioDefaul = {
          busqueda : nameMunicipio +", "+ nameDepartamento
        }
        $scope.municipioDefaul.municipios = [];
    }

    $scope.share =  function(name, precio){
      $cordovaSocialSharing.share(
          "El precio promedio a nivel nacional del insumo " + name + " es de  $" + precio,
          "Costo promedio de " + name,
          null,
          "https://play.google.com/store"
      )
       
    }

    $scope.actionFavorite = function(insumoObjet){      

    if (insumoObjet.Favorito){

        $http({
          method: 'POST',
          url: URL+'Favorito',
          data: {
            "Token":token,
            "Id":insumoObjet.IdInsumo,
            "Estado":"false",
            "IdPresentacion":insumoObjet.IdUnidadPresentacion,
            "IdGeografia":insumoObjet.IdGeografia
          },
          headers:headers,
        }).then(function(result) {
              alert(result.data.Texto);
              $route.reload();
           }, function(error) {
             alert("error");
            console.log(error);
        });

        // InfoService.deleteFavorite(object) 
    }else if (!insumoObjet.Favorito){
        
      $http({
        method: 'POST',
        url: URL+'Favorito',
        data: {
          "Token":token,
          "Id":insumoObjet.IdInsumo,
          "Estado":"True",
          "IdPresentacion":insumoObjet.IdUnidadPresentacion,
          "IdGeografia":insumoObjet.IdGeografia
        },
        headers:headers,
      }).then(function(result) {
            alert(result.data.Texto);
            $route.reload();
         }, function(error) {
          alert("error");
          console.log(error);
      });   
    }
      
  }

})

// controlador home
  
.controller('homeCtrl', ['$scope', 'InsumoService','InfoService','$state', function($scope, InsumoService,InfoService,$state,$route) {

  InfoService.setCategoryId(0);
  $scope.userLog = InfoService.getUserLogin();
  //Obtener imagen de la categoria
  var categoria = InfoService.getCategoryId();
  
  // var url = $scope.API.url;
  $scope.categoriaId = function(categoriaId){
      idCategoria = categoriaId;
      InfoService.setCategoryId(categoriaId);

  }


  //buscador
  $scope.data = {  "search" : '' };

  //Peticion de busqueda
  $scope.search = function() {


    if (!$scope.data.search == " ") {
      InsumoService.searchAirlines($scope.data.search, categoria).then(
        function(matches) {
          
          angular.forEach(matches, function(value, key){
              value["NameImagen"] = obtenerImgCategoria(value.CategoriaId);
              
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
    InfoService.setUserLogin(false);
    InfoService.setToken("");
    // $route.reload();
    $scope.userLog = false;
  }

  $scope.goToInsumo = function(idIns, idGeo, idPret){
    var dataInsumo = {
      Id : idIns,
      Municipio : idGeo,
      idPret : idPret
    }

    InfoService.setInfoInsumo(dataInsumo);
    console.log("id insumo:"+dataInsumo.Id+"id municipio:"+dataInsumo.Municipio+"id presentacion:"+dataInsumo.idPret);

    $state.go('insumo');

  }


}])


// ------------------- factorias 

// servicio Autocompletable Busqueda de insumos 

.factory('InsumoService', function( $q, $timeout, $http,InfoService ) {

    // $scope.API = API;
    var searchAirlines = function(searchFilter , idCategoria) {
        var token = InfoService.getToken();
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


// busqueda de insumos
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


// //controlador Detalle insumo
// .controller('insumoCtrl', function($scope , $http ,InfoService, SearchMunicipioInsumo, $state) {

//   v

// })



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

