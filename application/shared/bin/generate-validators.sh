#!/usr/bin/env bash

set -e

if [ ! -s "$HOME/.nvm/nvm.sh" ]
then
  if [ ! -x /opt/homebrew/bin/brew ] || [ ! -s "$(/opt/homebrew/bin/brew --prefix)/opt/nvm/nvm.sh" ]
  then
    echo "This script requires a working NVM installation."
    exit 1
  fi
fi

[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh"
[ -x /opt/homebrew/bin/brew ] && [ -s "$(/opt/homebrew/bin/brew --prefix)/opt/nvm/nvm.sh" ] && source "$(/opt/homebrew/bin/brew --prefix)/opt/nvm/nvm.sh"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

pushd "$DIR/.."
  nvm use
  rm -rf src/types/*.validator.ts
  for TYPESFILE in $(find src/types -name *.ts); do
    npx typescript-json-validator "$TYPESFILE"
  done
popd
