#!/bin/bash

IMG=${1:-toolchain}
docker build -t "$IMG" .
