# nginx pra servir o html e o javascript
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY js /usr/share/nginx/html/js
EXPOSE 80
