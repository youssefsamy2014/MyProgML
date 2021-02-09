from models import Entity_list_user,Entity_list_Attendance
from DB import db
from cv2 import cv2
import datetime
import time


class CLS_Attendance():
    def __init__(self,name):
        self.name=name

    def Attendence(self):

        recognizer = cv2.face.LBPHFaceRecognizer_create()
        recognizer.read("Assets\\TrainingImageLabel\\trainer.yml")
        harcascadePath = "Assets\\haarcascade\\haarcascade_frontalface_default.xml"
        faceCascade = cv2.CascadeClassifier(harcascadePath)
        cam = cv2.VideoCapture("Assets\\avideos\\"+self.name+".webm")
        #add='http://192.168.1.12:8080/video'
        #cam.open(add)
        font = cv2.FONT_HERSHEY_SIMPLEX
        cam.set(3, 640)  # set video widht
        cam.set(4, 480)  # set video height
        # Define min window size to be recognized as a face
        minW = 0.1 * cam.get(3)
        minH = 0.1 * cam.get(4)


        while True:
            _, img = cam.read()
            #img = cv2.flip(img, -1)  # Flip vertically
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = faceCascade.detectMultiScale(
                gray,
                scaleFactor=1.2,
                minNeighbors=5,
                minSize=(int(minW), int(minH)),
            )

            for (x, y, w, h) in faces:
                cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
                id, confidence = recognizer.predict(gray[y:y + h, x:x + w])
                ts = time.time()
                date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
                timeStamp = datetime.datetime.fromtimestamp(ts).strftime('%H:%M:%S')
                #count = 0
                
                # If confidence is less them 100 ==> "0" : perfect match
                if (confidence < 100):
                    user = Entity_list_user.query.filter_by(FacultyID=id).first()
                    Name = user.FirstName + '_' + user.LastName
                    # Label = '[' + str(id) + '_' + Name + ']'
                    confidence = "  {0}%".format(round(100 - confidence))
                    check_user = Entity_list_Attendance.query.filter_by(FacultyID=id, Date=date, InOut='In').first()

                    if check_user :
                        if not check_user.InOut=='Out':
                            new_user = Entity_list_Attendance(FacultyID=id, Name=Name, Time=timeStamp, Date=date, InOut='Out')
                            db.session.add(new_user)
                            db.session.commit()
                    else :
                        new_user = Entity_list_Attendance(FacultyID=id, Name=Name, Time=timeStamp, Date=date, InOut='In')
                        db.session.add(new_user)
                        db.session.commit()

                else:
                    # Label = "{ UNKNOWN }"
                    confidence = "  {0}%".format(round(100 - confidence))


                # cv2.putText(img,Label,(x + 5, y - 5),font,.5,(255, 0, 255),1)
                # cv2.putText(img,str(confidence),(x + 5, y + h - 5),font,1,(255, 255, 0),1)
            ts = time.time()
            date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
            if not date:
                    return {'message': 'no one of student attend today'}
            else:
                students = Entity_list_Attendance.query.filter_by(Date=date, InOut='In').all()
                output = []
                for student in students:
                    Students_attend = {}
                    Students_attend['FacultyID'] = student.FacultyID
                    Students_attend['Name'] = student.Name
                    output.append(Students_attend)
                    return output ,True


            # cv2.imshow('camera', img)
            # if (cv2.waitKey(1) == ord('q')):
            #     cam.release()
            #     cv2.destroyAllWindows()
            #     break



