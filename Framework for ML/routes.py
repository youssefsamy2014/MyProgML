from flask import Blueprint,jsonify,request,redirect,make_response
from models import Entity_list_user,Authienticat
from crud import CLS_CRUD
from DB import db
import jwt
import time
import base64
from functools import wraps
import datetime
from werkzeug.security import check_password_hash
from ML.CLS_Attendence import CLS_Attendance
from ML.CLS_Trainning import CLS_Trainning
from ML.CLS_VideoToImages import CLS_VideoToImages



main =Blueprint('main',__name__)

def token_required(f):
    @wraps(f)
    def decorater(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'The token has missing !!'}), 401
        try:
            data = jwt.decode(token,'SECRETKEY', algorithms=["HS256"])
            current_user = Entity_list_user.query.filter_by(NationalID=data['nationalid']).first()
        except:
            return jsonify({'message': 'Token is invalid !!!'}), 401
        return f(current_user, *args, **kwargs)

    return decorater



@main.route('/')
def homePage():
    db.create_all()
    return 'hi, in main route'


#recieve video string Done
@main.route('/savevide/<id>',methods=["POST"])
def save(id):
    videojson=request.get_json()
    user = Entity_list_user.query.filter_by(FacultyID=id).first()
    Name = user.FirstName+ '_' +user.LastName
    videoObj=videojson['video']
    image_64_decode = base64.b64decode(videoObj)
    videoName=Name+'_'+id
    image_result = open('Assets\\videos\\'+videoName+'.webm', 'wb')
    image_result.write(image_64_decode)
    return jsonify({'message':'done'})



#Spliter Done
@main.route('/Spliter/<facultyid>',methods=["GET"])
def Spliter(facultyid):
    if not facultyid:
        return jsonify({'message':'Not found FacultyID'})
    user = Entity_list_user.query.filter_by(FacultyID=facultyid).first()
    if not user :
        return jsonify({'message':'Not found user'})
    else:
        Id=user.FacultyID
        Name=user.FirstName+'_'+user.LastName
        NUser=CLS_VideoToImages(Id,Name)
        NUser.SpliterVideo()
        return jsonify({'message':'Video upload and divided into frames for user: '+Name +'_'+Id})




@main.route('/Attendance',methods=["POST"])
def Attendance():
    ts = time.time()
    date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
    timeStamp = datetime.datetime.fromtimestamp(ts).strftime('%H:%M:%S') 

    videoName='Attendance_'+date
    videojson=request.get_json()
    if videojson:
        videoObj=videojson['video']
        image_64_decode = base64.b64decode(videoObj)       
        image_result = open('Assets\\avideos\\'+str(videoName)+'.webm', 'wb')
        image_result.write(image_64_decode)
    else: 
        return jsonify({'message':'No videos send'})
    obj1=CLS_Attendance(videoName)
    output=obj1.Attendence()

    return jsonify({'students_attended_today':output})



#Train Done
@main.route('/Trainning',methods=["GET"])
def Trainning():
    Nuser=CLS_Trainning()
    Nuser.TrainImages()
    return jsonify({'message':'Trainning Done !!!'})




@main.route('/user', methods=['GET'])
@token_required
def getAllUsers(current_user):
        if not current_user.UserType=='admin':
            return jsonify({"error":"Not Allowed"})
        else:
            users=CLS_CRUD()
            output=users.read()
            return output


#Read one User
@main.route('/user/<nationalid>', methods=['GET'])
@token_required
def getOneUser(current_user, nationalid):
        if not current_user.UserType=='admin':
            return jsonify({"error":"Not Allowed"})
        else:
            user=CLS_CRUD()
            user_data=user.readOne(nationalid)
            return jsonify({'user': user_data})




@main.route('/userUpdate/<nationalid>', methods=['POST'])
@token_required
def PromotUser(current_user, nationalid):
        if not current_user.UserType=='admin':
            jsonify({"error":"Not Allowed"})
        else:
            UpdatedUser=CLS_CRUD()
            user=UpdatedUser.update(nationalid)
            return user



@main.route('/userDelete/<nationalid>', methods=['POST'])
@token_required
def DeleteUser(current_user, nationalid):
        if not current_user.UserType=='admin':
            jsonify({"error":"Not Allowed"})
        else:
            deleteuser=CLS_CRUD()
            us=deleteuser.delete(nationalid)
            return us


########################################################################################################################


#login for all users
@main.route('/Log-in',methods=['POST'])
def Log_inss():
        auth = request.get_json()
        email=auth['email']
        password=auth['password']
        if not auth or not email or not password:
            return make_response(jsonify({"error":"Login Required"})) 
        
        if not Entity_list_user.query.filter_by(Email=email).first():
            return make_response(jsonify({"error":"Login Required"}))
        user = Entity_list_user.query.filter_by(Email=email).first()

        if not check_password_hash(user.Password,password):
            return make_response(jsonify({"error":"Password invalid"}))
        
        expIN=3600
        token =jwt.encode({'nationalid': user.NationalID, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)},'SECRETKEY')
        auth=Authienticat(NationalID=user.NationalID,Token=token)
        db.session.add(auth)
        db.session.commit()
        AuthienticatedUser=Authienticat.query.filter_by(NationalID=user.NationalID,Token=token).first()
        AuthToken=AuthienticatedUser.Token
        AuthUserID=str(AuthienticatedUser.NationalID)
        json={'token':AuthToken,
                'userID':AuthUserID,
                'expIn':str(expIN)}
                
        return jsonify({'auth': json}), 201




@main.route('/Registration', methods=['POST'])
def create_User():
        newUser=CLS_CRUD()
        data=newUser.create()
        return jsonify({'message': 'the new user added'+data['nationalid'] })



#Handle Exception
#404,not found
@main.errorhandler(404)
def handle_exception(e):
    return redirect('/notfound')

@main.route('/notfound')
def NotFound():
    return jsonify({'error':'404,not found 404 !'})

#400 , bad request
@main.errorhandler(400 )
def handle_exception(e):
    return redirect('/badrequest')

@main.route('/badrequest')
def badrequest():
    return jsonify({'error':'400 , bad request !'})

#401  , unauthoraized
@main.errorhandler(401)
def handle_exception(e):
    return redirect('/unauthoraized'),401


@main.route('/unauthoraized')
def unauthoraized():
    return jsonify({'error':'401 ,unauthoraized !'})


#403 , forbiden
@main.errorhandler(403 )
def handle_exception(e):
    return redirect('/forbiden')


@main.route('/forbiden')
def forbiden():
    return jsonify({'error':'403 , forbiden !'})


#500 , internal server error
@main.errorhandler(500)
def handle_exception(e):
    return redirect('/internalservererror')

@main.route('/internalservererror')
def internalservererror():
    return jsonify({'error':'500 , internal server error !'})


#502  , bad gatway
@main.errorhandler(502)
def handle_exception(e):
    return redirect('/badgatway')

@main.route('/badgatway')
def badgatway():
    return jsonify({'error':'502  , bad gatway !'})


#504 , gatway timout
@main.errorhandler(504)
def handle_exception(e):
    return redirect('/gatwaytimout')


@main.route('/gatwaytimout')
def gatwaytimout():
    return jsonify({'error':'504 , gatway timout !'})
