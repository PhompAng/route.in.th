var app = angular.module('Route', ['ngRoute', 'ngAnimate']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'choose.html',
            controller: 'ChooseController',
            resolve: {
                "ifHome": function($q, $timeout) {
                    var tmp = $q.defer();
                    $timeout(function(){
                        tmp.resolve({
                            data: function() {
                                return "/";
                            }
                        });
                    }, 100);
                    return tmp.promise;
                }
            }
        })
        .when('/th', {
            templateUrl: 'index_th.html',
            controller : 'RouteController',
            resolve: {
                "ifHome": function($q, $timeout) {
                    var tmp = $q.defer();
                    $timeout(function(){
                        tmp.resolve({
                            data: function() {
                                return "/th";
                            }
                        });
                    }, 100);
                    return tmp.promise;
                }
            }
        })
        .when('/en', {
            templateUrl: 'index_en.html',
            controller : 'RouteController',
            resolve: {
                "ifHome": function($q, $timeout) {
                    var tmp = $q.defer();
                    $timeout(function(){
                        tmp.resolve({
                            data: function() {
                                return "/th";
                            }
                        });
                    }, 100);
                    return tmp.promise;
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.factory('InputFactory', function(){
    var input_data = {
            method: "POST",
            url: "http://127.0.0.1:8000/calculate",
            data: {
                    origin: "A1",
                    destination: "BW1",
                    card_type_bts: "0",
                    card_type_mrt: "0",
                    card_type_arl: "0"
                }
        };

    var setOrigin = function(origin) {
        input_data["data"]["origin"] = origin;
    };

    var setDestination = function(destination) {
        input_data["data"]["destination"] = destination;
    };

    var getInput = function() {
        return input_data;
    };

    return {
        setOrigin: setOrigin,
        setDestination: setDestination,
        getInput: getInput
    };

});

app.controller('ChooseController', ['$rootScope', '$scope', '$location', 'InputFactory', 'ifHome', function($rootScope, $scope, $location, InputFactory, ifHome){
    $rootScope.ifHome = ifHome.data() == "/";

    $scope.submit = function() {
        InputFactory.setOrigin($scope.input_origin);
        InputFactory.setDestination($scope.input_destination);
        $location.path('th');
    };
}]);
app.controller('IndexController', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location){
    $scope.ui_lang = "th";
    $rootScope.ifHome = "/";

    $scope.trip_detail = {"th": "ข้อมูลการเดินทาง",
                        "en": "Trip Detail"};

    $scope.edit_trip = {"th": "เปลี่ยนเส้นทาง",
                        "en": "Edit Trip"};

    $scope.toggleLang = function() {
        $scope.ui_lang = $scope.ui_lang === "th" ? "en" : "th";
    };
}]);
app.controller("RouteController", ['$rootScope', '$scope', '$http', 'InputFactory', 'ifHome', function($rootScope, $scope, $http, InputFactory, ifHome) {
        $scope.full_route = false;
        $rootScope.ifHome = ifHome.data() == "/";

        input_data = InputFactory.getInput();

        var res = $http(input_data);
        res.success(function(data, status, headers, config) {
            $scope.response = data;
            $scope.object_route = data["object_route"];
            $scope.bts_same_line = data["BTS_same_line"];

            $scope.arl_cnt = 0;
            $scope.bts_cnt = 0;
            $scope.mrt_cnt = 0;

            $.each(data["route"], function(i, val) {
                if (val.indexOf("A") > -1) {
                    $scope.arl_cnt += 1;
                } else if (val.indexOf("B") > -1) {
                    $scope.bts_cnt += 1;
                } else if (val.indexOf("M") > -1) {
                    $scope.mrt_cnt += 1;
                }
            });
        });
        res.error(function(data, status, headers, config) {
            alert(JSON.stringify({data: data}));
        });

        $scope.toggleRoute = function() {
            $scope.full_route = $scope.full_route === false ? true : false;
        };
    }]
);
