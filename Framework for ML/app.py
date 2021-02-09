from flask import Flask
from config import config
from routes import main
from DB import db
from flask_cors import CORS




def create_app(app_config='development'):
    app=Flask(__name__)
    CORS(app, support_credentials=True)
    app.config.from_object(config[app_config])
    db.init_app(app)
    app.register_blueprint(main)
    return app 

if __name__=="__main__":
    app=create_app()
    app.run()
# def register_extensions(app):
#     from app.DB import db
#     db.init_app(app)
