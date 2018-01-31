app.controller('AllFileController', function($scope, $http) {
    $http.get('/FileInDir').then(res => {
        $scope.images = res.data
    });
});