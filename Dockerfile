FROM artsdatabanken/httpd
RUN apt-get update
RUN apt-get -y install npm
RUN apt-get -y install node
WORKDIR /usr/local/apache2/htdocs
COPY . .
RUN npm run process
EXPOSE 3001
CMD ["httpd-foreground"]
