#!/bin/bash
ROOT="`cd $(dirname $0)/..; echo $PWD`"
NO_DOCS=1 "$ROOT/node_modules/@bitaccess/ts-config/library/bin/build.sh" "$ROOT"
