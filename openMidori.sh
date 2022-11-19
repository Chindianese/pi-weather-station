#!/bin/bash

echo opening midori in 20 seconds
sleep 20
export DISPLAY=:0.0
echo opening midori...
midori -e Fullscreen http://localhost:8080/