#!/usr/bin/env bash

curl -k \
    --user 22aeeef20e8b0e7a83caac3160cbeb9dc606233a: \
    --request POST \
    --form revision=cd1e43b887aaedc8f7db7d5374a00a9ce885cb54 \
    --form config=@.circleci/config.yml \
    --form notify=false  \
    https://circleci.com/api/v1.1/project/github/Plant-for-the-Planet-org/treecounter-app/tree/staging
