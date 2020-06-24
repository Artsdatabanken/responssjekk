FROM artsdatabanken/httpd
RUN apk update
RUN apk -y install npm
RUN apk -y install node
WORKDIR /usr/local/apache2/htdocs
COPY . .
RUN npm run process
EXPOSE 3001
CMD ["httpd-foreground"]
