// Controllers
matchApp.controller('thanksController', ['$scope', 'resultService', function($scope, resultService) {
    $scope.myResult = resultService.getResult();
    $scope.numChildIsAre;
    $scope.numChildChildChildren;
    
    if (resultService.getNumResult() > 1) {
        $scope.numChildChildChildren = 'children';
        $scope.numChildIsAre = 'are';
    } else {
        $scope.numChildChildChildren = 'child';
        $scope.numChildIsAre = 'is';
    }
    
    
    $('.cls-whole').css('background-color', 'none');
    
    $scope.$on('$locationChangeStart', function(event, next, current){            
        // Here you can take the control and call your own functions:
        alert('Sorry ! Back Button is disabled');
        // Prevent the browser default action (Going back):
        event.preventDefault();            
    });

}]);

