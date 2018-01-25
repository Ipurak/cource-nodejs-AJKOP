var app = angular.module('myApp', []);
app.controller('LayoutController', function($scope, $http) {

    $http.post('/user/info').then(res => {
        $scope.user = res.data;
    });

    $scope.logout = function() {
        $http.get('/user/logout').then(res => {
            if (res.data.message == 'success') {
                alert("Logout");
                location.href = '/login';
            }
        });
    }

});