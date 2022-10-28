FROM artsdatabanken/httpd
RUN apk update
RUN apk add --update nodejs nodejs-npm
ARG TZ='Europe/Berlin'

ENV DEFAULT_TZ ${TZ}

RUN apk upgrade --update \
  && apk add -U tzdata \
  && cp /usr/share/zoneinfo/${DEFAULT_TZ} /etc/localtime \
  && apk del tzdata \
  && rm -rf \
  /var/cache/apk/*

WORKDIR /usr/local/apache2/htdocs
COPY . .
COPY ./config/yourConfig.json ./config/config.json
RUN npm install
RUN npm run process
RUN crontab -l | { cat; echo "* * * * 0 /usr/local/apache2/htdocs/oppdater/oppdater.sh"; } | crontab -
RUN crontab -l
RUN chmod +x /usr/local/apache2/htdocs/oppdater/oppdater.sh
RUN chown www-data:www-data -R /usr/local/apache2/htdocs
EXPOSE 3001
CMD ["httpd-foreground"]
