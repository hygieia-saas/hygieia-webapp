#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

/usr/bin/env bash "$DIR/deploy.sh" prod default 199387562978
