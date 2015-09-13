'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'cityPointChart',
    'linechartBrush'

])
.config(['$routeProvider', function($routeProvider) {


    }])
.filter("trust", ["$sce",
        function($sce) {
            return $sce.trustAsHtml;
        }])
.controller('MainCtrl', ['$scope', '$http', '$window', '$interval','$timeout',


        function ($scope, $http, $window,$interval,$timeout) {

            $scope.focusinterval=null;

            $scope.$watch('focusinterval', function (newVal, oldVal, scope) {
                var form = {

                };

                $http({ method: "POST", url: "api/streamHour.php", data: form})
                .success(function(response) {

                        $scope.datalinechart = response;

                })
                .error(function(response) {  console.log('Request streamHour failed');  $scope.datalinechart = [];   });



            });


            $scope.$watch('contextinterval', function (newVal, oldVal, scope) {

                if ($scope.contextinterval && $scope.contextinterval.length>1) {

                    var form = {from: $scope.contextinterval[0].toISOString().replace('T',' ').replace('.000Z',''),
                        to: $scope.contextinterval[1].toISOString().replace('T',' ').replace('.000Z','')

                    };



                    $http({ method: "POST", url: "api/mapTurin.php", data: form})
                        .success(function(response) {

                            $scope.mapturin = response;


                        })

                    .error(function(response) {  console.log('Request mapTurin failed');  $scope.mapturin = [];   });




                }

            });



        }]);



