#!/usr/bin/env bash

curl -k \
    --user 22aeeef20e8b0e7a83caac3160cbeb9dc606233a: \
    --request POST \
    --form revision=f2d3b6dfa038dd27cb7a8a468229d48a677a4337 \
    --form config=@.circleci/config.yml \
    --form notify=false  \
    https://circleci.com/api/v1.1/project/github/Plant-for-the-Planet-org/treecounter-app/tree/staging
