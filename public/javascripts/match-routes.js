
// ROUTEs 
matchApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/matchpages/search.html',
        controller: 'searchController'
    })
    .when('/results', {
        templateUrl: '/matchpages/results.html',
        controller: 'resultsController'
    })
    .when('/thanks', {
        templateUrl: '/matchpages/thanks.html',
        controller: 'thanksController'
    })
    .when('/error', {
        templateUrl: '/matchpages/error.html',
        controller: 'errorController'
    })
});

