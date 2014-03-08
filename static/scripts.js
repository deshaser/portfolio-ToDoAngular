function TodoCtrl($scope) {

    // function initializes todo's
    $scope.todos = [
        {id: 1, text:'learn angular', done:true},
        {id: 2, text:'build an angular app', done:false}];

    // function added todo in todo's array
    $scope.addTodo = function() {
        if ($scope.todoText) {
            var $id = $scope.todos.length ? $scope.todos[$scope.todos.length-1].id + 1 : 1; // in the future get this value into php
            $scope.todos.push({id: $id, text:$scope.todoText, done:false});
            $scope.todoText = '';
        }
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

    // function clears the finished objects
    $scope.archive = function() {
        $scope.todos = _.reject($scope.todos, function(todo){ return todo.done == true; });
    };

    // function remove the todo
    $scope.remove = function(id) {
        $scope.todos = _.reject($scope.todos, function(todo){ return todo.id == id; });
    };

}