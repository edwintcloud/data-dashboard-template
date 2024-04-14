#!/bin/bash
# server
docker-compose up --build&
# client
cd client && npm i && npm run dev
# open browser
open http://localhost:8080