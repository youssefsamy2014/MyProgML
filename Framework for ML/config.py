import os

_basedir = os.path.abspath(os.path.dirname(__file__))

class Config (object):
    TESTING=False
    DEBUG=False
    SECRET_KEY =os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = "sqlite:////" + os.path.join(_basedir, "CLS_DB2.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class Development(Config):
    DEBUG=True
    SECRET_KEY =os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = "sqlite:///CLS_DB2.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
class Testing (Config):
    DEBUG=True

config={
    'development':Development,
    'testing':Testing
}