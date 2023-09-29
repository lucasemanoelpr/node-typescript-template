#!/bin/bash

npm run migrate
npm run seed

node dist/index.js