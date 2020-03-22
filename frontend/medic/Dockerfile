FROM node:13.10.1-alpine3.11 as build

RUN mkdir /home/app
WORKDIR /home/app
ADD . /home/app

RUN apk add --update git 
RUN npm install

RUN npm run build

FROM alpine:edge
ADD nginx-boot.sh /sbin/nginx-boot
RUN chmod +x /sbin/nginx-boot && \
    apk --update add nginx bash && \
    rm -fR /var/cache/apk/*

RUN mkdir -p /usr/local/nginx/html
COPY --from=build /home/app /usr/local/nginx/html
RUN cd /usr/local/nginx/html

CMD [ "/sbin/nginx-boot" ]
EXPOSE 80
