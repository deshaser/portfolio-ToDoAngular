var TodoModel = require('./libs/mongoose').TodoModel;

module.exports.setup = function (app, qs) {

    // get all todo's
    app.get('/api/todo', function(req, res) {
        //var query = qs.parse(req._parsedUrl.query);
        return TodoModel.find(function (err, data) {
            if (!err) {
                return res.send(data);
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    });

    // get one todo
    app.get('/api/todo/:id', function(req, res) {
        //var query = qs.parse(req._parsedUrl.query);
        return TodoModel.findById(req.params.id, function (err, data) {
            if(!data) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if (!err) {
                return res.send(data);
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    });

    // add new todo
    app.put('/api/todo', function (req, res){
        var query = qs.parse(req._parsedUrl.query),
            todo = new TodoModel();
        todo.text = query.text;
        todo.done = query.done;
        return todo.save(function (err, data) {
            if (!err) {
                return res.send(data);
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            }
        });
    });

    // update old todo
    app.post('/api/todo/:id', function (req, res){
        return TodoModel.findById(req.params.id, function (err, todo) {
            if(!todo) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            var query = qs.parse(req._parsedUrl.query);
            todo.text = query.text;
            todo.done = query.done;
            return todo.save(function (err) {
                if (!err) {
                    return res.send(todo);
                } else {
                    if(err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({ error: 'Validation error' });
                    } else {
                        res.statusCode = 500;
                        res.send({ error: 'Server error' });
                    }
                }
            });
        });
    });

    // remove old todo
    app.delete('/api/todo/:id', function (req, res){
        return TodoModel.findById(req.params.id, function (err, todo) {
            if(!todo) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            return todo.remove(function (err, data) {
                if (!err) {
                    return res.send(data);
                } else {
                    res.statusCode = 500;
                    return res.send({ error: 'Server error' });
                }
            });
        });
    });

};


