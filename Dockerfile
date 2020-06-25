FROM artsdatabanken/httpd
RUN apk update
RUN apk add --update nodejs nodejs-npm
WORKDIR /usr/local/apache2/htdocs
COPY . .
COPY ./config/yourConfig.json ./config/config.json
RUN npm run process
RUN crontab -l | { cat; echo "* * * * 0 /usr/local/apache2/htdocs/oppdater/oppdater.sh"; } | crontab -
RUN crontab -l
EXPOSE 3001
CMD ["httpd-foreground"]
