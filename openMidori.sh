#!/bin/bash

echo opening midori in 10 seconds
sleep 10
export DISPLAY=:0.0
midori -e Fullscreen http://localhost:8080/