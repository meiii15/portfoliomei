portfolio.directive('contentSection', function(){
    return{
        templateUrl:'views/content-section.html',
        restric:'E',
        transclude: true,
        replace: true
    }
})