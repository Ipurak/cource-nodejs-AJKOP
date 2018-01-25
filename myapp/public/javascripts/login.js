// var app = angular.module('myApp', []);
app.controller('LoginController', function($scope, $http) {
    $scope.checkLogin = function() {
        $http.post('/user/checkLogin', $scope.user).then(res => {
            if (res.data.message == 'found') {
                location.href = "/home";
            } else {
                alert("Login fail");
            }
        });
    }

});