from flask import Flask, request,render_template, redirect,session, url_for
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
app.secret_key = 'secret_key'


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

    
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    cafe_name = db.Column(db.String(120), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500), nullable=False)

with app.app_context():
    db.create_all()


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')
@app.route('/signup2')
def signup2():
    return render_template('signup2.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/login2')
def login2():
    return render_template('login2.html')



@app.route('/logout')
def logout():
    return redirect('/')

@app.route('/cafes')
def cafes():
   return render_template('cafes.html')

@app.route('/cafes2')
def cafes2():
   return render_template('cafes2.html')
  

@app.route('/fastfood')
def fastfood():
    return render_template('fastfood.html')

@app.route('/dessert')
def dessert():
    return render_template('dessert.html')
@app.route('/fastfood2')
def fastfood2():
    return render_template('fastfood2.html')

@app.route('/dessert2')
def dessert2():
    return render_template('dessert2.html')

@app.route('/drinks')
def drinks():
    return render_template('drinks.html')
@app.route('/drinks2')
def drinks2():
    return render_template('drinks2.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/about2')
def about2():
    return render_template('about2.html')

@app.route('/contact2')
def contact2():
    return render_template('contact2.html')

@app.route('/review')
def review():
    return render_template('review.html')

@app.route('/review2')
def review2():
    return render_template('review2.html')


if __name__ == '__main__':
    app.run(debug=True)