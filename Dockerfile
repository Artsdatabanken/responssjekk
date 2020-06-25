FROM artsdatabanken/httpd
RUN apk update
RUN apk add --update nodejs nodejs-npm
WORKDIR /usr/local/apache2/htdocs
COPY . .
COPY ./config/yourConfig.json ./config/config.json
RUN npm run process
RUN (crontab -l && echo "* * * * 30 /usr/local/apache2/htdocs/oppdater/oppdater.sh") | crontab
EXPOSE 3001
CMD ["httpd-foreground"]
