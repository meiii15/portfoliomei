portfolio.controller("wrapperController", ["$scope", function($scope){
    
}]);

portfolio.directive("wrapper", function(){
    return {
        controller:"wrapperController",
        templateUrl:"views/wrapper.html",
        restrict: "E",
        transclude: true,
        replace: true
    }
})