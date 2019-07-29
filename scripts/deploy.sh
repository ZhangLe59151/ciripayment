#!/bin/bash
set -x
ssh silot@$DEPLOY_SERVER_DEV <<sshoff
pwd;
cd /silot/mvp/self;
ls -al;

tar -zxf frontend.tar.gz
rm -rf frontend.tar.gz
rm -rf /silot/mvp/self/www

mv dist www
cd /silot/mvp/self/www

ls -al
exit 0
sshoff
echo "deploy success!!"


