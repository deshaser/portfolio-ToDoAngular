function TodoCtrl($scope) {
    $scope.todos = [
        {id: 1, text:'learn angular', done:true},
        {id: 2, text:'build an angular app', done:false}];

    $scope.addTodo = function() {
        if ($scope.todoText) {
            var $id = $scope.todos.length ? $scope.todos[$scope.todos.length-1].id + 1 : 1; // in the future get this value into php
            $scope.todos.push({id: $id, text:$scope.todoText, done:false});
            $scope.todoText = '';
        }
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) $scope.todos.push(todo);
        });
    };

    $scope.remove = function(id) {
        angular.forEach($scope.todos, function(todo, key) {
            if (todo.id == id) {
                $scope.todos.splice(key, 1);
            }
        });
    };
}