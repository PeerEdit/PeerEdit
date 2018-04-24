# NGINX

NGINX is a highly oerformance HTTP server, load balancer, and proxy that
we use at PeerEdit to proxy resource requests. The `conf.d` folder
contains nginx configuration files designed to work
with the default installation of nginx, tested on Ubuntu 16.06 LTS.
A simple setup script `setup_nginx.sh` has been written to simplify
the installation process if additional configuration becomes needed.

A proxy server is required because PeerEdit aims to act as a *central location
for metadata on resources* of all types. In order to build effective views
and tools to interact with these resources, it is important to be able to
fetch those resources in a secure manner.

The same-origin policy restricts websites from making cross-domain requests,
ensuring that sessions are not hijacked by malicious websites. To ensure
compliant access of resources from a variety of sourcess, PeerEdit provides
its own NGINX endpoint that makes all external requests on behalf of the
PeerEdit users.

To users, resources will appear to originate from peeredit.com, or wherever
your development server is running.

## NGINX setup

On Ubuntu 16.06

    sudo apt-get install nginx
    sudo ./setup_nginx.sh

You can then directly manage the NGINX service using `systemctl`

    # check status
    systemctl status nginx

    # start nginx
    systemctl start nginx

    # stop nginx
    systemctl stop nginx

The configuration provided starts up the proxy server on `localhost:9876`.
This location is built into the source code for the PeerEdit express app, and
will need to be modified when pushing to production