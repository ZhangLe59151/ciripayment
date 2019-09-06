# BASE IMAGE
FROM centos:7

# MAINTAINER
MAINTAINER linjie.miao@silot.ai

# add gosu
ENV GOSU_VERSION 1.10
RUN set -ex; \
	\
	yum -y install epel-release; \
	yum -y install wget dpkg; \
	\
	dpkgArch="$(dpkg --print-architecture | awk -F- '{ print $NF }')"; \
	wget -O /usr/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$dpkgArch"; \
	wget -O /tmp/gosu.asc "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$dpkgArch.asc"; \
	\
# verify the signature
	export GNUPGHOME="$(mktemp -d)"; \
	gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4; \
	gpg --batch --verify /tmp/gosu.asc /usr/bin/gosu; \
	rm -r "$GNUPGHOME" /tmp/gosu.asc; \
	\
	chmod +x /usr/bin/gosu; \
# verify that the binary works
	gosu nobody true; \
	\
	yum -y remove wget dpkg; \
	yum clean all

# create ssh server and user
RUN yum install -y passwd openssh-server && mkdir /var/run/sshd && ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key -N '' && ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key -N '' && /bin/echo 'root:MhxzKhl'|chpasswd && /bin/sed -i 's/.*session.*required.*pam_loginuid.so.*/session optional pam_loginuid.so/g' /etc/pam.d/sshd && /bin/echo -e "LANG=\"en_US.UTF-8\"" > /etc/default/local && yum clean all && groupadd -g 1500 silot && useradd silot -d /home/silot -g silot -u 1500 && mkdir -p /silot && useradd silot-runner -d /silot/runner -g silot -u 1501 && useradd silot-nginx -d /silot/nginx -g silot -u 1502 &&  mkdir -p /silot/logs/nginx/ && mkdir -p /silot/nginx/run && yum clean all

RUN yum -y install wget gcc-c++ make pcre-devel zlib-devel && wget http://nginx.org/download/nginx-1.16.1.tar.gz && tar zxvf nginx-1.16.1.tar.gz && cd nginx-1.16.1 && ./configure --prefix=/silot/nginx && make && make install && yum -y remove wget gcc-c++ make pcre-devel zlib-devel && yum clean all 

CMD ["/bin/bash"]
