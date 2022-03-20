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

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

WORKDIR="$(mktemp -d)"
DEPLOYMENT_NUMBER="$(date -u +%FT%TZ)"
STAGE="$1"
TFWORKSPACE="$2"
AWS_ACCOUNT_ID="$3"

[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh"
[ -x /opt/homebrew/bin/brew ] && [ -s "$(/opt/homebrew/bin/brew --prefix)/opt/nvm/nvm.sh" ] && source "$(/opt/homebrew/bin/brew --prefix)/opt/nvm/nvm.sh"

echo "$DEPLOYMENT_NUMBER" > "$DIR/../deployment_number.$STAGE"

echo "Copying files into workdir..."
cp -a "$DIR/../application" "$WORKDIR/"

pushd "$WORKDIR/application/shared" || exit
  rm -rf build
  rm -rf node_modules
  nvm install
  nvm use
  npm i --no-save
  npm run build
  rm -rf node_modules
  npm i --only=prod --target_arch=x64 --target_platform=linux --target_libc=glibc --no-save
popd || exit

pushd "$WORKDIR/application/backend/rest-apis/default" || exit
  rm -rf build
  rm -rf node_modules
  nvm install
  nvm use
  npm i --no-save
  npm update hygieia-webapp-shared
  npm run build
  rm -rf node_modules
  npm i --only=prod --target_arch=x64 --target_platform=linux --target_libc=glibc --no-save
  cp -aL node_modules build/
  pushd build || exit
    zip -r rest_api_default.zip ./
    source "$DIR/../../hygieia-infrastructure-bootstrap/bin/assume-role.sh" "$AWS_ACCOUNT_ID"
    aws s3 cp ./rest_api_default.zip "s3://hygieia-webapp-rest-apis-lambdas-$STAGE/default/$DEPLOYMENT_NUMBER/rest_api_default.zip"
    source "$DIR/../../hygieia-infrastructure-bootstrap/bin/unassume-role.sh"
  popd || exit
popd || exit

pushd "$WORKDIR/application/backend/handlers/file-check-result" || exit
  rm -rf build
  rm -rf node_modules
  nvm install
  nvm use
  npm i --no-save
  npm update hygieia-webapp-shared
  npm run build
  rm -rf node_modules
  npm i --only=prod --target_arch=x64 --target_platform=linux --target_libc=glibc --no-save
  cp -aL node_modules build/
  pushd build || exit
    zip -r handlers_file_check_result.zip ./
    source "$DIR/../../hygieia-infrastructure-bootstrap/bin/assume-role.sh" "$AWS_ACCOUNT_ID"
    aws s3 cp ./handlers_file_check_result.zip "s3://hygieia-webapp-handlers-lambdas-$STAGE/file-check-result/$DEPLOYMENT_NUMBER/handlers_file_check_result.zip"
    source "$DIR/../../hygieia-infrastructure-bootstrap/bin/unassume-role.sh"
  popd || exit
popd || exit

pushd "$DIR/../infrastructure/terraform/main" || exit
  terraform-1.1.5 workspace select "$TFWORKSPACE"
  terraform-1.1.5 apply -var deployment_number="$DEPLOYMENT_NUMBER"
popd || exit


pushd "$WORKDIR/application/shared" || exit
  rm -rf build
  rm -rf node_modules
  nvm install
  nvm use
  npm i --no-save
  npm run build
popd || exit

pushd "$WORKDIR/application/frontend" || exit
  rm -rf build
  rm -rf node_modules
  nvm install
  nvm use
  npm i --no-save
  npm update hygieia-webapp-shared
  npm run build
  source "$DIR/../../hygieia-infrastructure-bootstrap/bin/assume-role.sh" "$AWS_ACCOUNT_ID"
  aws s3 cp --recursive --acl public-read build/ "s3://hygieia-webapp-frontend-$STAGE/"
  source "$DIR/../../hygieia-infrastructure-bootstrap/bin/unassume-role.sh"
popd || exit

rm -rf "$WORKDIR"
