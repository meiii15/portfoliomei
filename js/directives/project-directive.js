portfolio.controller('projectController',['$scope', function($scope){
    var Z_DISTANCE = 300;
    var X_DISTANCE = 300;
    
    $scope.panelIsVisible = false;
    
    const X = Math.sin($scope.angle) * X_DISTANCE;
    const Z = Math.cos($scope.angle) * Z_DISTANCE;
    
    //$scope.translation = 'transform: translate3d(' + parseInt(X) + "px, 0px, " + parseInt(Z) + "px); z-index:" + $scope.zIndex;
    
}]);

portfolio.directive('project', function(){
    return{
        scope:{
            name:'@',
            imageUrl:'@',
            description:'@',
            angle:'@',
            zIndex:'@'
        },
        templateUrl: 'views/project.html',
        controller: 'projectController',
        restrict: 'E',
        replace:true
    }
});