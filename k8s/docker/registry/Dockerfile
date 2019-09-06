# BASE IMAGE
FROM registry.silot.tech/taokae/merchant-portal-base:latest

# MAINTAINERS
MAINTAINER linjie.miao@silot.ai

ADD conf.tar.gz /silot/nginx/

ADD dist.tar.gz /silot/mvp/taokae/merchant-portal/

COPY entrypoint.sh /

ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
