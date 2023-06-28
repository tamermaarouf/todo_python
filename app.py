from flask import Flask, render_template, redirect, url_for, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:abc@localhost:5432/todoapp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Todo(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(), nullable=False)
    completed = db.Column(db.Boolean, nullable=False)
    def __repr__(self):
         return f'<Todo ID: {self.id}, description: {self.description}>'

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    #data = Todo.query.all()
    todos = Todo.query.order_by('id').all()
    return render_template('index.html', data=todos)

@app.route('/todos/create', methods=['POST'])
def create_todo():
    error = False
    body = {}
    try:
        #description = request.form.get('description', '')
        description = request.get_json()['description']
        todo = Todo(description=description)
        db.session.add(todo)
        db.session.commit()
        body['id'] = todo.id
        body['completed'] = todo.completed
        body['description'] = todo.description
        #return redirect(url_for('index'))
        # return jsonify({'description': todo.description})
    except:
        error = True
        db.session.rollback()
        print(sys.exc_info())
    finally:
        db.session.close()
    if error:
        abort(400)
    else:
        return jsonify(body)

@app.route('/todos/<todo_id>/set-completed', methods=['POST'])
def set_completed_todo(todo_id):
    try:
        completed = request.get_json()['completed']
        todos = Todo.query.get(todo_id)
        todos.completed = completed
        db.session.commit()
        print('completed', completed)
        print('todo_id', todo_id)
    except:
        db.session.rollback()
    finally:
        db.session.close()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8081)
    print(__name__)
