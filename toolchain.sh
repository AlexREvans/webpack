#!/bin/bash

IMG=${1:-toolchain}

[[ -z "${2}" ]] || docker build -t "$IMG" .
WS="/ws"
exec docker run -v"$PWD:$WS" -ti -w "$WS" "$IMG"
