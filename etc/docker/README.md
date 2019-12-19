# Install docker and docker-compose

* install [Docker](https://docs.docker.com/install/)
* install `docker-compose`
  * with [pip](https://packaging.python.org/tutorials/installing-packages/): `pip install docker-compose`
# Docker-compose scenarios
* start an nginx with the client:
``` shell
npm install
npm run-script build
docker-compose -f etc/docker/docker-compose-dev.yml up --build
```
* clone and start an nginx with the client:
``` shell
docker-compose -f etc/docker/docker-compose-prod.yml up --build
```
* run the backend server API and all it's dependencies
``` shell
docker-compose -f etc/docker/docker-compose-backend.yml up
```
