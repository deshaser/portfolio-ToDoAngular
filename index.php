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
        <h2>todos</h2>
        <div ng-controller="TodoCtrl">
            <form ng-submit="addTodo()">
                <input type="text" ng-model="todoText"  size="30" placeholder="What needs to be done?">
                <input class="btn-primary" type="submit" value="add">
            </form>
            <ul class="unstyled">
                <li ng-repeat="todo in todos">
                    <input type="checkbox" ng-model="todo.done">
                    <span class="done-{{todo.done}}">{{todo.text}}</span>
                </li>
            </ul>
            <span>{{remaining()}} item left</span>
            <a href="" ng-click="archive()">Clear completed({{todos.length - remaining()}})</a>
        </div>
    </body>
</html>