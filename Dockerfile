FROM artsdatabanken/httpd
WORKDIR /usr/local/apache2/htdocs
COPY . .
RUN npm run process
EXPOSE 3001
CMD ["httpd-foreground"]
