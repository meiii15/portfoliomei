portfolio.controller('projectController',['$scope', function($scope){
    $scope.panelIsVisible = false;
    
    $scope.translation = {
        "transform":"translateX("+ $scope.xPos +") translateZ(" + $scope.zPos + ")",
        "z-index":$scope.zIndex
    };
}]);

portfolio.directive('project', function(){
    return{
        scope:{
            name:'@',
            imageUrl:'@',
            description:'@',
            z:'@',
            x:'@',
            zIndex:'@'
        },
        templateUrl: 'views/project.html',
        controller: 'projectController',
        replace:true
    }
});