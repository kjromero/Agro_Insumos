angular.module('proyect')

.controller('categoriaCtrl', function($scope) {

  $scope.insumos =  [
   { name: "Agroland Vitta +", precio_m: "$85.000",precio_n: "$83.000",precio_d: "$9.000" },
   { name: "Agroland Vitta 2", precio_m: "$89.000",precio_n: "$81.000",precio_d: "$5.000" },
   { name: "Agroland Vitta 3", precio_m: "$7.000" ,precio_n: "$10.000",precio_d: "$3.000" },
   { name: "Agroland Vitta 4", precio_m: "$17.000",precio_n: "$12.000",precio_d: "$33.000" },
   { name: "Agroland Vitta 5", precio_m: "$27.000",precio_n: "$30.000",precio_d: "$473.000" },
   { name: "Agroland Vitta 6", precio_m: "$37.000",precio_n: "$14.000",precio_d: "$53.000" },
   { name: "Agroland Vitta 7", precio_m: "$47.000",precio_n: "$50.000",precio_d: "$36.000" },
   { name: "Agroland Vitta 8", precio_m: "$93.000",precio_n: "$28.000",precio_d: "$4.000" }
  ];
});