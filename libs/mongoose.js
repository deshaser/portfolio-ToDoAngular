var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todoangular');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback() {
    console.log('Connected to DB');
});

var todoSchema = mongoose.Schema({
    text: String,
    done: Boolean
});
var Todos = mongoose.model('Todos', todoSchema);

// if db is empty - add new todo's
Todos.find(function(err, data){
    if (data && !data[0]) {
        // init demo todo's
        var demoTodos = [
            { text: 'something', done: false },
            { text: 'everything', done: true }
        ];
        var todoOne = [];
        // save in db all demo todo's
        for (var i = 0; i < demoTodos.length; i++) {
            todoOne[i] = new Todos(demoTodos[i]);
            todoOne[i].save();
        }
    };
});

module.exports.TodoModel = Todos;