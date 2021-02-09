from DB import db

class Entity_list_user(db.Model):
    ID = db.Column(db.Integer, primary_key=True)
    NationalID = db.Column(db.String(250),nullable=False,unique=True)
    FirstName = db.Column(db.String(250), nullable=False)
    LastName = db.Column(db.String(250), nullable=False)
    Email = db.Column(db.String(250), nullable=False)
    Password = db.Column(db.String(250), nullable=False)
    FacultyID = db.Column(db.String(250),unique=True)
    Faculty = db.Column(db.String(250))
    Dept = db.Column(db.String(250))
    UserType=db.Column(db.String(250),nullable=False)


class Entity_list_Attendance(db.Model):
    ID = db.Column(db.Integer, primary_key=True, )
    FacultyID = db.Column(db.String(250),nullable=False)
    Name = db.Column(db.String(250), nullable=False)
    Time = db.Column(db.String(250), nullable=False)
    InOut = db.Column(db.String(250), nullable=False)
    Date = db.Column(db.String(250), nullable=False)
    db.ForeignKeyConstraint(
        ['FacultyID'], ['Entity_list_user.FacultyID'],
        name='fk_FacultyID'
    )

class Authienticat (db.Model):
    ID = db.Column(db.Integer, primary_key=True, )
    NationalID = db.Column(db.String(250),nullable=False)
    Token=db.Column(db.String(250),nullable=False)