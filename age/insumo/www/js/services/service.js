angular.module('proyect.service', [] ) 
// se creo factori para la manupulacion de datos para que
// funcione se inyecta el nombre en los controladores

.factory('InfoService', ['$window', function($window){

    var token = $window.localStorage['token'] ;
    var userLogin = $window.localStorage['userLOgin'] ;
    var insumoDetalle = {};
    var addingPrecioFormat = {};
    var categoryId;
    var favoriteAll = [];
    var IdMunicipio;
    var NameMunicipio;
    var NameDepartamento
    var municipío = $window.localStorage['municipío'] ;
    var LoadFister = $window.localStorage['LoadFister'];


 

    var setMunicipio = function(idM, nameM , nameD){
        IdMunicipio = idM;
        NameMunicipio = nameM;
        NameDepartamento = nameD;

        municipío = {
        id : IdMunicipio,
        nameM : NameMunicipio,
        nameD : NameDepartamento
        
        }
        $window.localStorage['municipío'] = municipío;

    }


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
       // userLogin = $window.localStorage['userLOgin'] ;
        // userLogin = boleam;
    }

    var setLoadFister = function(boleam){
        $window.localStorage['LoadFister'] = boleam;
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
    var createSection = function(){
        
            console.log("Agregar");
            createISection(); 
            
        
    }

    var closeSection = function(){
        deleteDB();
    }

    //crear 
    function createISection(){
        $window.localStorage['token'] || " ";
        $window.localStorage['userLOgin'] || " ";  
    }

    // eliminar LocalStorege 
    function createLocalStoregeFavorites(){
        $window.localStorage['favortieData'] = angular.toJson(favoriteAll)   
    }

    function deleteDB(){
        console.log("Eliminar");
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('userLOgin');
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
        },

        setMunicipio: function(idM, nameM, nameD){
            setMunicipio(idM, nameM, nameD);
        },

        getMunicipio : function(){
            return municipío;
        },

        closeSection : function(){
            closeSection();
        },

        createSection : function(){
            createSection();
        },

        setLoadFister : function(boleam){
            setLoadFister(boleam);
        },

        getloadFister: function(){
            return LoadFister;
        }


 
    }



}])