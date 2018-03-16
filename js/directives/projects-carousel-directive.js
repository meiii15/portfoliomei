portfolio.controller('projectsCarouselController', ['$scope', function($scope){
    this._currentProjectIndex = 0;
    
    this._selectProject = function(project){
    
    };

    $scope.next = function(){
        var currentProject = $scope.projects[++this._currentProjectIndex];
        this._selectProject(currentProject);
        this._updateCarousel();
    };
    
    $scope.previous = function(){
        var currentProject = $scope.projects[--this._currentProjectIndex];
        this._selectProject(currentProject);
        this._updateCarousel();
    };
    
    this.$onInit = function()
    {
        var slides = [];
        
        const DISTANCE = 500;
        var selectedProjectIndex = parseInt(PROJECTS.length / 2);
        var eachProjAngle = 360 / PROJECTS.length;
        
        for(var projectIndex = 0; projectIndex < PROJECTS.length; projectIndex++){
            var project = PROJECTS[projectIndex];
            project.isSelected = projectIndex === selectedProjectIndex;
            
            const currentPos = (projectIndex - selectedProjectIndex);
            var zPos = Math.cos(currentPos * eachProjAngle);
            var xPos = Math.sin(currentPos * eachProjAngle);

            console.log(selectedProjectIndex, projectIndex, currentPos, zPos );
            
            slides.push({ project: project,
                            slide: {
                                zPos: Math.abs(parseInt(zPos * DISTANCE)),
                                zIndex: Math.abs(currentPos) * -1
                            } });
        }
        
        $scope.slides = slides;
        
    }
}]);

portfolio.directive('projectsCarousel', function(){
    return {
        templateUrl: 'views/projects-carousel.html',
        restrict: 'E',
        controller: 'projectsCarouselController',
        replace:true
    }
});