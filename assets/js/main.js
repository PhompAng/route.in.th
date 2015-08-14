$.getScript("assets/js/dict.js", function(){});

var app = angular.module("Route", []);
app.controller(
    "RouteController", ['$scope', '$http', function($scope, $http) {
        $scope.full_route = true;

        var aaa = {
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
        var res = $http(aaa);
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
            $scope.response = JSON.stringify({data: data});
        });

        $scope.toggleRoute = function() {
            $scope.full_route = $scope.full_route === false ? true : false;
        };
    }]
);
