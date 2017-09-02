FROM ubuntu

RUN apt-get -y update
RUN apt-get install -y software-properties-common curl

RUN \
	add-apt-repository -y ppa:git-core/ppa && \
	apt-get update -y && \
	apt-get install -y git

RUN \
	curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN \
	apt-get update -y && \
	apt-get install -y nodejs yarn

EXPOSE 8080
