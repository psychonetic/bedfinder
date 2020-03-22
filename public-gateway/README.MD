# Additional instructions

NGINX is installed locally on the Hetzner server and not via Docker(-compose). Certbot + nginx-plugin
are also installed locally.

apt update
add-apt-repository ppa:certbot/certbot
apt install python-certbot-nginx
apt install nginx
systemctl status nginx

Wildcard certificate's auto-verification is incative

You'll find the configuration applied in the app.conf file which is stored on the server here:
/etc/nginx/conf.d/gateway.conf