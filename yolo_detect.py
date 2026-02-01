import os
import sys
import argparse
import glob
import time

import cv2
import numpy as np
from ultralytics import YOLO

# =========================
# ARGUMENT PARSER
# =========================
parser = argparse.ArgumentParser()
parser.add_argument('--model', required=True)
parser.add_argument('--source', required=True)
parser.add_argument('--thresh', default=0.5)
parser.add_argument('--resolution', default=None)
parser.add_argument('--record', action='store_true')
args = parser.parse_args()

model_path = args.model
img_source = args.source
min_thresh = float(args.thresh)
user_res = args.resolution
record = args.record

# =========================
# LOAD MODEL
# =========================
if not os.path.exists(model_path):
    print('ERROR: Model not found')
    sys.exit(0)

model = YOLO(model_path, task='detect')
labels = model.names

# =========================
# SOURCE TYPE
# =========================
img_ext = ['.jpg','.jpeg','.png','.bmp']
vid_ext = ['.avi','.mp4','.mkv']

if os.path.isdir(img_source):
    source_type = 'folder'
elif os.path.isfile(img_source):
    _, ext = os.path.splitext(img_source)
    source_type = 'image' if ext in img_ext else 'video'
elif 'usb' in img_source:
    source_type = 'usb'
    usb_idx = int(img_source[3:])
else:
    print('Invalid source')
    sys.exit(0)

resize = False
if user_res:
    resize = True
    resW, resH = map(int, user_res.split('x'))

if source_type in ['video','usb']:
    cap = cv2.VideoCapture(img_source if source_type == 'video' else usb_idx)
    if resize:
        cap.set(3, resW)
        cap.set(4, resH)

# =========================
# UTIL FUNCTION
# =========================
def is_inside(obj_box, person_box):
    ox1, oy1, ox2, oy2 = obj_box
    px1, py1, px2, py2 = person_box
    return ox1 > px1 and oy1 > py1 and ox2 < px2 and oy2 < py2

# =========================
# FPS VARIABLE
# =========================
fps_buffer = []
fps_avg_len = 30
avg_fps = 0

# =========================
# MAIN LOOP
# =========================
while True:
    t_start = time.perf_counter()

    if source_type in ['video','usb']:
        ret, frame = cap.read()
        if not ret:
            break
    elif source_type == 'image':
        frame = cv2.imread(img_source)
    elif source_type == 'folder':
        print("Folder mode not implemented in this version")
        break

    if resize:
        frame = cv2.resize(frame, (resW, resH))

    # =========================
    # YOLO INFERENCE
    # =========================
    results = model(frame, verbose=False)
    detections = results[0].boxes

    # =========================
    # INIT LIST
    # =========================
    persons = []
    no_helmet = []
    no_vest = []
    no_boots = []
    no_gloves = []

    # =========================
    # LOOP DETECTIONS
    # =========================
    for det in detections:
        xmin, ymin, xmax, ymax = det.xyxy.cpu().numpy().squeeze().astype(int)
        conf = det.conf.item()
        class_name = labels[int(det.cls.item())]

        if conf < min_thresh:
            continue

        if class_name == 'Person':
            persons.append((xmin,ymin,xmax,ymax))
        elif class_name == 'No Helmet':
            no_helmet.append((xmin,ymin,xmax,ymax))
        elif class_name == 'No Vest':
            no_vest.append((xmin,ymin,xmax,ymax))
        elif class_name == 'No Boots':
            no_boots.append((xmin,ymin,xmax,ymax))
        elif class_name == 'No Gloves':
            no_gloves.append((xmin,ymin,xmax,ymax))

        cv2.rectangle(frame,(xmin,ymin),(xmax,ymax),(255,255,0),2)
        cv2.putText(frame,f'{class_name} {int(conf*100)}%',
                    (xmin,ymin-5),
                    cv2.FONT_HERSHEY_SIMPLEX,0.5,(255,255,0),1)

    # =========================
    # APD COMPLIANCE LOGIC
    # =========================
    total_person = len(persons)
    patuh = 0
    tidak_patuh = 0

    for p in persons:
        violation = (
            any(is_inside(nh,p) for nh in no_helmet) or
            any(is_inside(nv,p) for nv in no_vest) or
            any(is_inside(nb,p) for nb in no_boots) or
            any(is_inside(ng,p) for ng in no_gloves)
        )

        px1,py1,px2,py2 = p
        if violation:
            tidak_patuh += 1
            color = (0,0,255)
            status = 'TIDAK PATUH'
        else:
            patuh += 1
            color = (0,255,0)
            status = 'PATUH'

        cv2.rectangle(frame,(px1,py1),(px2,py2),color,3)
        cv2.putText(frame,status,(px1,py1-10),
                    cv2.FONT_HERSHEY_SIMPLEX,0.6,color,2)

    compliance = (patuh / total_person * 100) if total_person > 0 else 0

    # =========================
    # DISPLAY INFO
    # =========================
    cv2.putText(frame,f'Person: {total_person}',(10,30),
                cv2.FONT_HERSHEY_SIMPLEX,0.7,(255,255,255),2)
    cv2.putText(frame,f'Patuh: {patuh}',(10,55),
                cv2.FONT_HERSHEY_SIMPLEX,0.7,(0,255,0),2)
    cv2.putText(frame,f'Tidak Patuh: {tidak_patuh}',(10,80),
                cv2.FONT_HERSHEY_SIMPLEX,0.7,(0,0,255),2)
    cv2.putText(frame,f'Kepatuhan APD: {compliance:.2f}%',(10,110),
                cv2.FONT_HERSHEY_SIMPLEX,0.8,(0,255,255),2)

    # =========================
    # FPS
    # =========================
    fps = 1 / (time.perf_counter() - t_start)
    fps_buffer.append(fps)
    if len(fps_buffer) > fps_avg_len:
        fps_buffer.pop(0)
    avg_fps = np.mean(fps_buffer)

    cv2.putText(frame,f'FPS: {avg_fps:.2f}',(10,140),
                cv2.FONT_HERSHEY_SIMPLEX,0.7,(255,255,0),2)

    cv2.imshow('APD Compliance Monitoring', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

if source_type in ['video','usb']:
    cap.release()
cv2.destroyAllWindows()
