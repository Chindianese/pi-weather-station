#!/bin/bash

echo pulling from master...
cd /home/hello/pi-weather-station
#sleep 5
git reset --hard
git fetch
git pull origin master
python3 python/setup.py
# git remote set-url origin https://github.com/Chindianese/PiPager.git
sh openMidori.sh & npm start
#cd ../
