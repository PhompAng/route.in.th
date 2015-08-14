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
            console.log(data);
            $scope.stations = data["route"];
            $scope.station_name = station_name;

            $scope.object_route = data["object_route"];

            $scope.response = data;
            $scope.origin = data["origin"];
            $scope.destination = data["destination"];

            var station_cnt = {};
            arl_cnt = 0;
            bts_cnt = 0;
            mrt_cnt = 0;
            station_cnt[data["route"][0]] = 0;
            $scope.bts_same_line = data["BTS_same_line"];
            $scope.same_line = false;
            var tmp = data["route"][0];

            $.each(data["route"], function(i, val) {
                if (val.indexOf("A") > -1) {
                    arl_cnt += 1;
                } else if (val.indexOf("B") > -1) {
                    bts_cnt += 1;
                } else if (val.indexOf("M") > -1) {
                    mrt_cnt += 1;
                }

                if (typeof data["route"][i+1] == "undefined") {
                    return;
                };
                console.log(data["route"][i]);
                if (data["route"][i+1] === "BCEN") {
                    if (typeof data["route"][i+2] == "undefined") {
                        return;
                    };
                    if (data["route"][i][1] == "N" && data["route"][i+2][1] == "E") {
                        station_cnt[tmp] += 1;
                    } else if (data["route"][i][1] == "E" && data["route"][i+2][1] == "N") {
                        station_cnt[tmp] += 1;
                    } else if (data["route"][i][1] == "W" && data["route"][i+2][1] == "S") {
                        station_cnt[tmp] += 1;
                    } else if (data["route"][i][1] == "S" && data["route"][i+2][1] == "W") {
                        station_cnt[tmp] += 1;
                    } else {
                        station_cnt[tmp] += 1;
                        station_cnt["BCEN"] = 0;
                        tmp = data["route"][i+1];
                        $scope.same_line = true;
                    }
                } else if (data["route"][i][0] === data["route"][i+1][0]) {
                    station_cnt[tmp] += 1;
                } else {
                    station_cnt[data["route"][i+1]] = 0;
                    tmp = data["route"][i+1];
                }
                console.log(station_cnt);
            });

            $scope.station_cnt = station_cnt;
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
