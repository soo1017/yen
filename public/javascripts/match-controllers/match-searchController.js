// Controllers
matchApp.controller('searchController', ['$scope', 'searchService', function($scope, searchService) {
    $scope.sex = searchService.sex;
    $scope.age = searchService.age;
    $scope.country = searchService.country;

     $scope.verifyAge = function() {
        var ageRegex = /^\d{1}|[1]\d{1}|$/i;
        var dashRegex = /\-/i;
        var temp_age = $scope.age;
        if (temp_age) {
            temp_age = temp_age.replace(/[ ]/g, '');
        } else {
            temp_age = '';
        }
        $scope.age = temp_age;
        // console.log("temp_age: ", temp_age);
        // console.log("love");
        if (dashRegex.test(temp_age)) {             // Age Range
            // console.log("inside");
            var arrayAge = temp_age.split("-");
            if (ageRegex.test(arrayAge[0]) && arrayAge[0] < 18 && ageRegex.test(arrayAge[1]) && arrayAge[1] < 18 && arrayAge[0] <= arrayAge[1]) {
                $scope.dspl = true;
            } else {
                $scope.dspl = false;
                $scope.search_error_message = "Please insert correct age";
                setInterval(function(){ $scope.dspl = true; }, 1000);
            }
        } else {
            if (ageRegex.test(temp_age)) {
                if (temp_age < 18) {
                    $scope.dspl = true;
                } else {
                    $scope.dspl = false;
                    $scope.search_error_message = "Please insert correct age";
                    setInterval(function(){ $scope.dspl = true; }, 1000);
                }
            } else {
                if (temp_age == '') {
                    $scope.dspl = true;
                } else {
                    $scope.dspl = false;
                    $scope.search_error_message = "Please insert correct age";
                    setInterval(function(){ $scope.dspl = true; }, 1000);
                }
            }
        }
    }

    $scope.$watch('sex', function() {
        searchService.sex = $scope.sex;
    });
    $scope.$watch('age', function() {
        searchService.age = $scope.age;
//        console.log("se-ctrl2", searchService.age);
    });
    $scope.$watch('country', function() {
        searchService.country = $scope.country;
    });

//    console.log("num-recip", window.localStorage.getItem("num-recip"));
//    console.log("match-session", window.sessionStorage.getItem("match-session"));
    if (window.localStorage.getItem("num-recip") >= 1 && window.sessionStorage.getItem("match-session")) {
        $scope.dspl = true;
        if (window.localStorage.getItem("num-recip") == 1) {
            $scope.child_num = "1 child."
        } else {
            $scope.child_num = "up to " + window.localStorage.getItem("num-recip") + " children."
        }
    } else {
        $scope.dspl = false;
    }

}]);
