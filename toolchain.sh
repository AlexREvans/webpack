#!/bin/bash

IMG=${1:-toolchain}
WS="/ws"
exec docker run -v"$PWD:$WS" -ti -w "$WS/src" -p"8080:8080" "$IMG"
