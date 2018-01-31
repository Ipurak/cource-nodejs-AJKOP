// var app = angular.module('myApp', []);
app.controller('MongoController', function($scope, $http) {
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

    $scope.loadBookAll = function() {
        $http.post('/bookAll').then(res => {
            var arr = [];
            res.data.forEach(item => {
                var param = { user_id: item.user_id };

                $http.post('/userInfo', param).then(res => {
                    var user_name = "";

                    if (res.data[0] != null) {
                        user_name = res.data[0].name;
                    }
                    var row = {
                        _id: item._id,
                        isbn: item.isbn,
                        name: item.name
                    };
                    arr.push(row);

                });

            });
            $scope.books = res.data;
        });
    }

    // $scope.loadData();
    $scope.loadBookAll();
});