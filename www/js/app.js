// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

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
  .state('login',{
    url:'/login',
    templateUrl: 'views/login/login.html'
  })

  .state('home',{
    url:'/home',
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

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/opciones',
    views: {
      'tab-opciones': {
        templateUrl: 'views/perfil/opciones.html'
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
    url:'/fertilizantes',
    controller: 'FertilizantesController',
    templateUrl: 'views/categorias/fertilizantes/fertilizantes.html'
  })
  .state('addprecio',{
    url:'/addprecio',
    templateUrl: 'views/addprecio/addprecio.html'
  })
  .state('confirmar',{
    url:'/confirmar',
    templateUrl: 'views/addprecio/confirmar.html'
  })
  .state('insumo',{
    url:'/insumo',
    templateUrl: 'views/categorias/insumo/insumo.html'
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splash');

});
