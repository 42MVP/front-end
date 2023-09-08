#!/bin/bash

IP_ADDRESS=$(ipconfig getifaddr en0)

sed -i '' "s|VITE_APP_API_URL=.*|VITE_APP_API_URL=http://$IP_ADDRESS:3000|" .env

echo "VITE_APP_API_URL updated to http://$IP_ADDRESS:3000"
