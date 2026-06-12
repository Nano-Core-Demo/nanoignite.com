ARG CONTAINER_REGISTRY_SOURCE_LABEL

FROM nginx:alpine

LABEL org.opencontainers.image.source=CONTAINER_REGISTRY_SOURCE_LABEL

RUN rm -rf /usr/share/nginx/html/*

COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
