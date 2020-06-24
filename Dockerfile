FROM artsdatabanken/httpd
RUN apk update
RUN apk add --update nodejs npm
WORKDIR /usr/local/apache2/htdocs
COPY . .
RUN npm run process
EXPOSE 3001
CMD ["httpd-foreground"]