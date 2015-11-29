angular.module('proyect.service', [] ) 
// se creo factori para la manupulacion de datos para que
// funcione se inyecta el nombre en los controladores

.factory('InfoService', ['$window', function($window){

    var token = $window.localStorage['token']; 
    var userLogin ;
    var insumoDetalle = {};
    var addingPrecioFormat = {};
    var categoryId;
    var favoriteAll = [];


    var favoriteAll = angular.fromJson($window.localStorage['favortieData'] || "[]") 
 
    var setToken = function(tokenId){
        $window.localStorage['token'] = tokenId;
        // token = tokenId;
    }
    
   
    var setInfoInsumo = function(objet){
        insumoDetalle = objet;
        console.log("el detalle del unsumo es ------"+insumoDetalle);
    }

    var setAddPrecio = function(objet){
        addingPrecioFormat = objet;
    }
    var setCategoryId = function(cId){
        categoryId = cId;
    }

    var setUserLogin = function(boleam){
       $window.localStorage['userLOgin'] = boleam;
       userLogin = $window.localStorage['userLOgin'] ;
        // userLogin = boleam;
    }

    var insertFavoriteData = function(object){

        console.log("Insertando object")
        favoriteAll.push(object)
        createLocalStoregeFavorites()
        
    }

    var deteleObjectFavorite = function(object){

        //Eliminar del array General
        console.log("Eliminar services object")

        for (var i = 0; i < favoriteAll.length; i++){
            if (object.idObjec == favoriteAll[i].idObjec){
                favoriteAll.splice(i,1);
                
            }
        }
        createLocalStoregeFavorites()
    
    }

    // Crear LocalStorege Favoritos
    function createLocalStoregeFavorites(){
        $window.localStorage['favortieData'] = angular.toJson(favoriteAll)   
    }

    function deleteDB(){
        console.log("Eliminar")
        $window.localStorage.removeItem('dataUser');
        $window.localStorage.removeItem('favortieData');
    }

    return {

        getToken: function(){
            return token;
        },

        setToken: function(token){
            setToken(token)
        },

        getUserLogin: function(){
            return userLogin;
        },

        setInfoInsumo: function(objet){
            setInfoInsumo(objet);
        },

        getDetalleInsumo: function(){
            return insumoDetalle;
        },

        setAddPrecio: function(objet){
            setAddPrecio(objet);
        },

        getAddPrecio : function(){
            return addingPrecioFormat;
        },

        setCategoryId: function(cId){
            setCategoryId(cId);
        },

        getCategoryId : function(){
            return categoryId;
        },

        insertFavorite: function(object){        
            insertFavoriteData(object)
        },
        deleteFavorite: function(object){
            deteleObjectFavorite(object)
        },

        getFavoriteAll: function(){
            return favoriteAll;
        },

        setUserLogin :function(boleam){
            setUserLogin(boleam);
        },

        getUserLogin : function(){
            return userLogin;
        }


    }



}])