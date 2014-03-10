var todoApp = angular.module('TodoApp', ['ngSocket']);

todoApp.controller('TodoCtrl', function($scope, $socket, $http) {

    // function initializes todo's
    $http({method: 'GET', url: '/api/todo'})
        .success(function(data, status, headers, config) {
            $scope.todos = data;
        })
        .error(function(data, status, headers, config) {
            console.log('Unable to connect to server');
        });

    // function send todo in server
    $scope.addTodo = function() {
        if ($scope.todoText) {
            $http({method: 'PUT', url: '/api/todo', params : {'text' : $scope.todoText, 'done' : 'false'}})
                .success(function(data, status, headers, config) {
                    $scope.todoText = '';
                })
                .error(function(data, status, headers, config) {
                    console.log('Unable to connect to server');
                });
        }
    };

    // functon awaiting data from the server and added new todo
    $socket.on('new todo', function(data) {
        $scope.todos.push({_id: data._id, text: data.text, done: data.done});
    });

    // function update one todo
    $scope.updateTodo = function(id) {
        var el = _.find($scope.todos, function(todo){ return todo._id == id; })
        if (el.done) {
            el.done = false;
        } else {
            el.done = true;
        }
        $http({method: 'POST', url: '/api/todo/' + id, params : { 'text' :  el.text, 'done' : el.done }})
            .error(function(data, status, headers, config) {
                console.log('Unable to connect to server');
            });
    };

    // functon awaiting data from the server and update todo
    $socket.on('update todo', function(data) {
        var el = _.find($scope.todos, function(todo){ return todo._id == data._id; });
        el.text = data.text;
        el.done = data.done;
    });

    // function remove the one todo
    $scope.remove = function(id) {
        //$scope.todos = _.reject($scope.todos, function(todo){ return todo._id == id; });
        $http({method: 'DELETE', url: '/api/todo', params : [id]})
            .error(function(data, status, headers, config) {
                console.log('Unable to connect to server');
            });
    };

    // functon awaiting data from the server and remove the one todo
    $socket.on('remove todo', function(data) {
        $scope.todos = _.reject($scope.todos, function(todo){ return todo._id == data._id; });
    });

    // function clears the finished todo's
    $scope.archive = function() {
        var params = _.pluck(_.where($scope.todos, {done: true}), '_id');
        $http({method: 'DELETE', url: '/api/todo', params : params})
            .error(function(data, status, headers, config) {
                console.log('Unable to connect to server');
            });
    };

    // function returns the number of active todo's
    $scope.remaining = function() {
        var countBy = _.countBy($scope.todos, function(todo) { return todo.done ? 'done' : 'undone'; });
        var count = countBy.undone || 0;
        return count;
    };

    // function returns the number of completed todo's
    $scope.trash = function() {
        var countBy = _.countBy($scope.todos, function(todo) { return todo.done ? 'done' : 'undone'; });
        var count = countBy.done || 0;
        return count;
    };

});