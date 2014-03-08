<!DOCTYPE html>
<html ng-app>
    <head>
        <title>ToDo</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="static/styles.css">
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.12/angular.min.js"></script>
        <script src="static/scripts.js" type="text/javascript"></script>
    </head>
    <body>
        <section class="todoWrap">
            <h1 class="todoTitle">todos</h1>
            <div ng-controller="TodoCtrl">
                <form class="todoForm" ng-submit="addTodo()">
                    <input class="todoInput" type="text" ng-model="todoText" placeholder="What needs to be done?">
                    <input class="todoButtonAdd" type="submit" value="&#10004;" title="Add todo">
                </form>
                <ul class="todoList">
                    <li class="todoItem {{todo.done ? 'done' : ''}}" ng-repeat="todo in todos | filter : {done : searchQuery}">
                        <input id="todoItemInput{{$index + 1}}" class="todoItemInput" type="checkbox" ng-model="todo.done">
                        <label class="todoItemLabel" for="todoItemInput{{$index + 1}}"></label>
                        <span class="todoItemText">{{todo.text}}</span>
                        <div class="todoItemRemove" ng-click="remove($index)">&#10006;</div>
                    </li>
                </ul>
                <div class="todoFooter">
                    <span class="todoCountActive">{{remaining()}} item left</span>
                    <a ng-class="{selected: !searchQuery}" ng-click="searchQuery = ''" class="todoFilterLink" href="">All</a>
                    <a ng-class="{selected: searchQuery == 'false'}" ng-click="searchQuery = 'false'" class="todoFilterLink" href="">Active</a>
                    <a ng-class="{selected: searchQuery == 'true'}" ng-click="searchQuery = 'true'" class="todoFilterLink" href="">Completed</a>
                    <a href="" class="todoClearCompleted" ng-click="archive()">Clear completed({{todos.length - remaining()}})</a>
                </div>
            </div>
        </section>
    </body>
</html>