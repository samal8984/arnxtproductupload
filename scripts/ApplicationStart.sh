#!/bin/bash
cd /home/ec2-user/frontend/src
npm start
pm2 start npm --name "uploading app" -- start
pm2 startup
pm2 save
pm2 restart all