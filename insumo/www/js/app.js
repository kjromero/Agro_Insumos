// Ionic proyect App addPuntoVentaCtrl

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'proyect' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'proyect.controllers' is found in controllers.js
angular.module('proyect',
  [
    'ionic', 
    'ngCordova',
    'proyect.controllers',
    'proyect.controllers.perfilCtrl',
    'proyect.controllers.addprecioCtrl',
    'proyect.controllers.addPuntoVentaCtrl',
    'proyect.controllers.favoritoCtrl',
    'proyect.controllers.publicacionesCtrl',
    'proyect.service'

  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider

  .state('splash',{
    url:'/splash',
    templateUrl: 'views/splash/splash.html'
  })

  .state('registro',{
    url:'/registro',
    templateUrl: 'views/login/registro.html'
  })

  .state('registro-result',{
    url:'/registro/result',
    templateUrl: 'views/login/resultLogin.html'
  })

  
  .state('login',{
    url:'/login',
    controller: 'loginCtrl',
    templateUrl: 'views/login/login.html'
  })

  .state('olvidoContrasena',{
    url:'/olvidoContrasena',
    controller: 'olvidoContrasenaCtrl',
    templateUrl: 'views/login/olvidoContrasena.html'
  })
 
  .state('home',{
    cache: false,
    url:'/home',
    controller: 'homeCtrl',
    templateUrl: 'views/home/home.html'
  })

  .state('perfil',{
    url:'/perfil',
    templateUrl: 'views/perfil/perfil.html'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/perfil/tabs.html'
  })

  .state('tab.dash', {
    cache: false,
    url: '/opciones',
    views: {
      'tab-opciones': {
        templateUrl: 'views/perfil/opciones.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/sugerencias',
    views: {
      'tab-sugerencias': {
        templateUrl: 'views/perfil/sugerencias.html'
      }
    }
  })

  .state('fertilizantes',{
    cache: false,
    url:'/fertilizantes',
    controller: 'categoriaCtrl',
    templateUrl: 'views/categorias/fertilizantes/fertilizantes.html'
  })

  .state('addprecio',{
    cache: false,
    url:'/addprecio',
    templateUrl: 'views/addprecio/addprecio.html',
    controller: 'addprecioCtrl'
  })

  .state('addPuntoVenta',{
    cache: false,
    url:'/addPuntoVenta',
    templateUrl: 'views/addprecio/addPuntoVenta.html',
    controller: 'addPuntoVentaCtrl'
  })

  .state('confirmar',{
    url:'/confirmar',
    templateUrl: 'views/addprecio/confirmar.html'
  })

  .state('insumo',{
    cache: false,
    url:'/insumo',
    controller: 'insumoCtrl',
    templateUrl: 'views/categorias/insumo/insumo.html'
  })
  
  .state('publicaciones',{
    url:'/publicaciones',
    templateUrl: 'views/favoritos/publicaciones.html',
    controller: 'publicacionesCtrl'
  })

  .state('favoritos',{
    url:'/favoritos',
    templateUrl: 'views/favoritos/favoritos.html',
    controller: 'favoritoCtrl'
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splash');

});
