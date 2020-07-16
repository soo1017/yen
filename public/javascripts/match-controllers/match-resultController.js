// Controllers
matchApp.controller('resultsController', ['$scope', 'searchService', 'getDataService', '$http', '$window', '$location', 'resultService', function($scope, searchService, getDataService, $http, $window, $location, resultService) {
    $scope.sex = searchService.sex;
    $scope.age = searchService.age;
    $scope.country = searchService.country;
    $scope.searchResult =[];
    $scope.displayNum = 10;
    $scope.child_number = window.localStorage.getItem("num-recip");
    $scope.myHeight;
    $scope.myHide;
    $scope.width = $window.innerWidth;
    $scope.submit_boolean;

    var temp_sex = searchService.sex;
    var temp_country = searchService.country;
    var temp_age = searchService.age;
    temp_sex = temp_sex ? temp_sex : '';
    temp_country = temp_country ? temp_country : '';
    temp_age = temp_age ? temp_age : '';


    getDataService.getData().then(function(res) {
        var extra_object = {Name: null, _id: "", Picture: "", Age: "", Sex: "", Birth: "", Country: "", Favorite: "", FutureDream: ""};
        if (res.details.length % 2 == 0) {
            angular.copy(res.details, $scope.searchResult);
        } else {
            res.details.push(extra_object);
            angular.copy(res.details, $scope.searchResult);
        }

//        $scope.num_search = res.details.length;
        if ($scope.searchResult.length >= $scope.displayNum) {
            if ($scope.width > 767) {
                $scope.myHeight = (($scope.displayNum / 2) * 240 + 120) + 'px';
            } else {
                $scope.myHeight = ($scope.displayNum * 240 + 120) + 'px';
            }
        } else {
            if ($scope.width > 767) {
                $scope.myHeight = (($scope.searchResult.length / 2) * 240 + 120) + 'px';
            } else {
                $scope.myHeight = ($scope.searchResult.length * 240 + 120) + 'px';
            }
        }
    })

    // console.log("searchResult: ", $scope.searchResult);
    var num_selection = window.localStorage.getItem("num-recip");

    $scope.selectRecip = function($event) {
        var self1 = $event.currentTarget.getElementsByTagName("div")[2];
        num_selection = parseInt(num_selection);
        if (this.$parent.$even == true || this.$parent.$odd == true) {
            if (num_selection >= 1) {                    //
                if ($(self1).attr("class") == "panel-body blurred") {               // Selected => Deselect
                    $(self1).attr("class", "panel-body");
                    var self2 = self1.parentNode.getElementsByTagName("i");
                    $(self2).attr("class", "ion-checkmark-round icon-select");
                    num_selection += 1;
                    $scope.child_number = num_selection;
//                    window.localStorage.setItem("num-recip", $scope.child_number);
                } else {                                                            // Not selected => Select
                    $(self1).attr("class", "panel-body blurred");
                    var self2 = self1.parentNode.getElementsByTagName("i");
                    $(self2).attr("class", "ion-checkmark-round icon-select white-color");
                    num_selection -= 1;
                    $scope.child_number = num_selection;
//                    window.localStorage.setItem("num-recip", $scope.child_number);
                }
            } else {
                if ($(self1).attr("class") == "panel-body blurred") {               // Selected => Deselect
                    $(self1).attr("class", "panel-body");
                    var self2 = self1.parentNode.getElementsByTagName("i");
                    $(self2).attr("class", "ion-checkmark-round icon-select");
                    num_selection += 1;
                    $scope.child_number = num_selection;
//                    window.localStorage.setItem("num-recip", $scope.child_number);
                }
            }
        }
    }

    $scope.increaseBy = function(num) {
        $scope.displayNum += num;

        if ($scope.searchResult.length >= $scope.displayNum) {
            if ($scope.width > 767) {
                $scope.myHeight = (($scope.displayNum / 2) * 240 + 120) + 'px';
            } else {
                $scope.myHeight = ($scope.displayNum * 240 + 120) + 'px';
            }
        } else {
            if ($scope.width > 767) {
                $scope.myHeight = (($scope.searchResult.length / 2) * 240 + 120) + 'px';
            } else {
                $scope.myHeight = ($scope.searchResult.length * 240 + 120) + 'px';
            }
        }
    }

    $scope.submitChild = function() {
        var submit_data = {};
        submit_data.donor = window.sessionStorage.getItem("match-session");
        var elH3Span = $('.panel-heading h3 span');
        var el = document.getElementsByTagName("i");
        // console.log("el: ", el);
        var i = 1;
        angular.forEach(el, function(element) {
            if ($(element).attr('class') == 'ion-checkmark-round icon-select white-color') {
                var h3Span = element.parentNode.firstElementChild.firstChild;
                var data = "data".concat(i);
                submit_data[data] = $(h3Span).text();
                resultService.addResult($(h3Span).text());
                i += 1;
            }
        });

        // console.log("submit_data: ", submit_data);
        var submitChildUrl = "https://www.youthempoweringnation.org/match/submitchild";
        $http({method: 'POST',
               url: submitChildUrl,
               data: submit_data
        }).then(function(response) {
//            $scope.searchResult = response.data;
            // console.log("response: ", response);
            // console.log("response.data-success: ", response.data);
            // console.log("response-success.status: ", response.status);
            if (response.status == 200) {
                $location.path('/thanks');
//                $location.url('/thanks');
            } else if (response.status == 405) {
                $location.path('/error');
            } else {
                $location.path('/error');
            }

//            return {details: response.data}
        }, function(response) {
            // console.log("response-fail", response);
            // console.log("response-fail.status: ", response.status);
            if (response.status == 200) {
                $location.path('/thanks');
            } else if (response.status == 405) {
                $location.path('/error');
            } else {
                $location.path('/error');
            }
        });
    }
    // console.log("$scope.submit_boolean: ", $scope.submit_boolean);

}]);
