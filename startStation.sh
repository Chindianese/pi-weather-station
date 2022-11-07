#!/bin/bash

echo pulling from master...
cd /home/hello/pi-weather-station
#sleep 5
git fetch
git reset --hard
git pull origin master
# git remote set-url origin https://github.com/Chindianese/PiPager.git
sh openMidori.sh && npm start
#cd ../
