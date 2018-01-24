var appMongo = angular.module('appMongo', []);
appMongo.controller('MongoController', function($scope, $http) {
    // alert("aa");
    $scope.save = function() {
        // alert("AAA");
        $http.post('/insert-mongo', $scope.book).then(res => {
            if (res.data.message == 'success') {
                alert("The book have just saved!");
                $scope.loadData();
            }
        });

    }
    $scope.loadData = function() {
        $http.get('/select-mongo').then(res => {
            $scope.books = res.data;
        })
    }
    $scope.edit = function(b) {
        $scope.book = b;
    }
    $scope.del = function(b) {
        $http.post('/del-mongo', b).then(res => {
            if (res.data.message == 'success') {
                alert("The book have just deleted!");
                $scope.loadData();
            }
        })
    }

    $scope.loadData();
});