var app = angular.module('myApp', []);
app.controller('MyController', function($scope, $http) {
    $scope.x = 10;
    $scope.changeX = function() {
        $scope.x++;
    }
    $scope.loadData = function() {

        $http.get('/select').then(res => {
            $scope.books = res.data;
        });
    }
    $scope.save = function() {

        $http.post('/save', $scope.book).then(res => {
            if (res.data.message == 'success') {
                alert("The book have just saved.");
                $scope.loadData();
            }
        });

    }
    $scope.edit = function(b) {
        $scope.book = b;
    }
    $scope.cancelSave = function() {
        $scope.loadData();
    }
    $scope.del = function(b) {
            var conf = confirm("Do you want to delete the book?")
            if (conf) {
                $http.post('/del', b).then(res => {
                    if (res.data.message == 'success') {
                        alert("The book have just Deleted.");
                        $scope.loadData();
                    }
                });
            }
        }
        // $scope.loadData();
});