var app = angular.module('Route', ['ngRoute', 'ngAnimate']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/choose.html',
            controller: 'ChooseController'
        })
        .when('/th', {
            templateUrl: '/index_th.html',
            controller : 'RouteController'
        })
        .when('/en', {
            templateUrl: '/index_en.html',
            controller : 'RouteController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.directive('onLastRepeat', function(){
    // Runs during compile
    return function(scope, iElm, iAttrs) {
            if(scope.$last) setTimeout(function() {
                scope.$emit('onLastRepeat', iElm, iAttrs);
            }, 1);
        };
});

app.factory('InputFactory', function(){
    var input_data = {
            method: "POST",
            url: "api/public/calculate",
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

app.controller('ChooseController', ['$rootScope', '$scope', '$location', '$http', 'InputFactory', function($rootScope, $scope, $location, $http, InputFactory){
    $rootScope.ifHome = $location.path() == "/";

    $scope.calc_route = {"th": "คำนวณเส้นทาง",
                        "en": "Calculate route"};

    $scope.origin_system = '0';
    $scope.destination_system = '1';
    $scope.input_origin = "A1";
    $scope.input_destination = "BN8";

    var res = $http({
            method: "GET",
            url: "api/public/getsystem"
        });
    res.success(function(data, status, headers, config) {
        $scope.systems = data;
    });
    res.error(function(data, status, headers, config) {
        alert(JSON.stringify({data: data}));
    });

    $scope.$on('onLastRepeat', function(scope, iElm, iAttrs) {
        $('#origin-system-selector').select2({
            placeholder: "ARL",
            minimumResultsForSearch: Infinity
        });
        $('#origin-selector').select2({
            placeholder: "เลือกสถานีต้นทาง"
        });

        $('#destination-system-selector').select2({
            placeholder: "ARL",
            minimumResultsForSearch: Infinity
        });
        $('#destination-selector').select2({
            placeholder: "เลือกสถานีปลายทาง"
        });
    });

    $scope.submit = function() {
        InputFactory.setOrigin($scope.input_origin);
        InputFactory.setDestination($scope.input_destination);
        if ($rootScope.ui_lang === "th") {
            $location.path('/th');
        } else {
            $location.path('/en');
        };
    };
}]);
app.controller('IndexController', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location){
    $rootScope.ui_lang = "th";
    $rootScope.ifHome = $location.path();

    $scope.trip_detail = {"th": "ข้อมูลการเดินทาง",
                        "en": "Trip Detail"};

    $scope.edit_trip = {"th": "เปลี่ยนเส้นทาง",
                        "en": "Edit Trip"};

    $scope.change_lang = {"th": "Change Language",
                        "en": "เปลี่ยนภาษา"};

    $scope.toggleLang = function() {
        $rootScope.ui_lang = $rootScope.ui_lang === "th" ? "en" : "th";
    };
}]);
app.controller("RouteController", ['$rootScope', '$scope', '$http', '$location', 'InputFactory', function($rootScope, $scope, $http, $location, InputFactory) {
        $scope.full_route = false;
        $rootScope.ifHome = $location.path() == "/";

        input_data = InputFactory.getInput();

        var res = $http(input_data);
        res.success(function(data, status, headers, config) {
            $scope.response = data;
            $scope.object_route = data["object_route"];
            $scope.bts_same_line = data["BTS_same_line"];
            $scope.stations = data["route"];

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
