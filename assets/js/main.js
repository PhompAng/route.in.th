$.getScript("assets/js/dict.js", function(){});

var app = angular.module("Route", []);
app.controller(
    "RouteController", ['$scope', '$http', function($scope, $http) {
        $scope.full_route = true;

        var aaa = {
            method: "POST",
            url: "http://127.0.0.1:8000/calculate",
            data: {
                    origin: "BW1",
                    destination: "M8",
                    card_type_bts: "0",
                    card_type_mrt: "0",
                    card_type_arl: "0"
                }
        };
        var res = $http(aaa);
        res.success(function(data, status, headers, config) {
            console.log(data);
            $scope.stations = data["route"];
            $scope.station_name = station_name;
            arl_cnt = 0;
            bts_cnt = 0;
            mrt_cnt = 0;

            $scope.response = data;
            $scope.origin = data["origin"];
            $scope.destination = data["destination"];

            $.each(data["route"], function(i, val) {
                if (val.indexOf("A") > -1) {
                    arl_cnt += 1;
                } else if (val.indexOf("B") > -1) {
                    bts_cnt += 1;
                } else if (val.indexOf("M") > -1) {
                    mrt_cnt += 1;
                }
            });

            $scope.arl_cnt = arl_cnt;
            $scope.bts_cnt = bts_cnt;
            $scope.mrt_cnt = mrt_cnt;

        });
        res.error(function(data, status, headers, config) {
            $scope.response = JSON.stringify({data: data});
        });

        $scope.toggleRoute = function() {
            $scope.full_route = $scope.full_route === false ? true : false;
        };
    }]
);
