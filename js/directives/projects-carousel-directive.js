portfolio.controller('projectsCarouselController', ['$scope', function($scope){
    this._currentProjectIndex = 0;
    
    this._selectProject = function(project){
    
    };

    $scope.previous = function(){
        var projects = PROJECTS;
        var lastProject = projects.pop();
        projects.splice(0, 0, lastProject);
        
        $scope.slides = buildSlides(projects);
    };

    $scope.next = function(){
        var projects = PROJECTS;
        var firstProject = projects.splice(0, 1)[0];
        projects.push(firstProject);

        $scope.slides = buildSlides(projects);
    };
    
    this.$onInit = function()
    {
        $scope.slides = buildSlides(PROJECTS);
    }
    
    function buildSlides(projects){
        
        const HORIZONTAL_COMPANTION = -75;
        const DISTANCE = 500;
        
        var slides = [];
        var selectedProjectIndex = parseInt(projects.length / 2);
        var eachProjAngle = 360 / projects.length;
        
        for(var projectIndex = 0; projectIndex < projects.length; projectIndex++){
            var project = PROJECTS[projectIndex];
            project.isSelected = projectIndex === selectedProjectIndex;
            
            const currentPos = (projectIndex - selectedProjectIndex);
            var zPos = Math.cos(currentPos * eachProjAngle);

            slides.push({ project: project,
                            slide: {
                                xPos:  currentPos  * HORIZONTAL_COMPANTION,
                                zPos: Math.abs(parseInt(zPos * DISTANCE)),
                                zIndex: Math.abs(currentPos) * -1
                            } 
                        });
        }
        
        return slides;
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