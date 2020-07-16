
// SERVICES
matchApp.service('searchService', function() {
    var self = this;
    this.sex;
    this.age;
    this.country;

});

matchApp.service('getDataService', ['$http', 'searchService', function($http, searchService) {

    var searchUrl = "https://www.youthempoweringnation.org/match/search";
    var details = {};

    function getData() {
        // console.log("searchService.sex: ", searchService.sex);
        // console.log("searchService.age: ", searchService.age);
        // console.log("searchService.country: ", searchService.country);
        return $http({method: 'GET',
               url: searchUrl,
               params: {sex: searchService.sex, age: searchService.age, country: searchService.country}
//               params: {sex: temp_sex, age: temp_age, country: temp_country}
        }).then(function(response) {
//            $scope.searchResult = response.data;
            // console.log("response.data-success", response.data);
            // console.log("response-success.status: ", response.status);

            return {details: response.data}
        }, function(response) {
            // console.log("response-fail", response);
            // console.log("response-fail.status: ", response.status);
        });
    }

    return {
        getData: getData
    }


}]);

matchApp.service('resultService', function() {
    var resultList = [];

    var addResult = function(newObj) {
        resultList.push(newObj);
    };

    var getResult = function(){
        return resultList;
    };

    var getNumResult = function() {
        return resultList.length;
    }

    return {
        addResult: addResult,
        getResult: getResult,
        getNumResult: getNumResult
    };
});
