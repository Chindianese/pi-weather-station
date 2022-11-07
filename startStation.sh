#!/bin/bash

cd /home/hello/pi-weather-station
sh scripts/update
# git remote set-url origin https://github.com/Chindianese/PiPager.git
sh openMidori.sh & npm start
#cd ../
