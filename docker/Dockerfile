FROM node:14

RUN apt-get update -y && \
     apt-get upgrade -y && \
     apt-get dist-upgrade -y && \
     apt-get -y autoremove && \
     apt-get clean

RUN apt-get install -y p7zip \
    p7zip-full \
    unace \
    zip \
    unzip \
    xz-utils \
    sharutils \
    uudeview \
    mpack \
    arj \
    cabextract \
    file-roller \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update
RUN apt-get --fix-broken install


RUN apt-get install -y chromium


RUN git config --global user.email "user@swtvap.com"
RUN git config --global user.name "User Name"

RUN npm config set strict-ssl false
RUN npm config set puppeteer_skip_chromium_download true -g

RUN npm install -g @angular/cli@14

RUN npm install -g @angular-devkit/schematics-cli

RUN npm install typescript -g

RUN npm i nodemon -g 

RUN export CHROME_BIN=/usr/bin/chromium

#docker build -t ANGULAR-PROY-V1-SWTVAP-WEB-S2401 . 