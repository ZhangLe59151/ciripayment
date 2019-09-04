#!/bin/bash
set -x
ssh silot@$DEPLOY_SERVER_DEV <<sshoff
pwd;
cd /silot/taokae/frontend;
ls -al;

tar -zxf frontend.tar.gz
rm -rf frontend.tar.gz
rm -rf /silot/taokae/frontend/www

mv dist www
cd /silot/taokae/frontend/www

ls -al
exit 0
sshoff
echo "deploy success!!"


