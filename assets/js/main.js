$.getScript("assets/js/dict.js", function(){});

var app = angular.module("Route", []);
app.controller(
    "RouteController", ['$scope', '$http', function($scope, $http) {
        var aaa = {
            method: "POST",
            url: "http://127.0.0.1:8000/calculate",
            data: {
                    origin: "A1",
                    destination: "BE4",
                    card_type_bts: "0",
                    card_type_mrt: "0",
                    card_type_arl: "0"
                }
        };
        var res = $http(aaa);
        res.success(function(data, status, headers, config) {
            console.log(data);
            $scope.stations = data["route"];
            $scope.full_name = full_name;
            arl_cnt = 0;
            bts_cnt = 0;
            mrt_cnt = 0;

            $scope.response = data;
            $scope.origin = data["origin"];
            $scope.destination = data["destination"];
            $scope.total = data["fare"]["total"];

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

            $scope.arl_fare = data["fare"]["ARL"];
            $scope.bts_fare = data["fare"]["BTS"];
            $scope.mrt_fare = data["fare"]["MRT"];
        });
        res.error(function(data, status, headers, config) {
            $scope.response = JSON.stringify({data: data});
        });
    }]
);
