var app = angular.module('myApp', []);
app.controller('LoginController', function($scope, $http) {

    $scope.checkLogin = function() {
        $http.post('/login', $scope.book).then(res => {
            if (res.data.message == 'success') {
                alert("The book have just saved.");
                $scope.loadData();
            }
        });
    }

});