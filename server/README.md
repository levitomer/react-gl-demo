## Getting the database set up

`yarn` will install all necessary Node dependencies.

You will need Docker in order to install a containerised MySQL dev environment. After getting docker, run the following command anywhere:

```sh
docker run \
  -p 0.0.0.0:7999:3306 \
  --name demo-db \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_USER=demo-dev \
  -e MYSQL_PASSWORD=password \
  -e MYSQL_DATABASE=demo \
  -d mysql:5.7.20
```

This will create a Docker instance called `demo-db`, running MySQL v5.7.20, with the root password being `password`. It also creates a database called `demo`, creates a user called `demo-dev` (with password `password`), and assigns that user full permissions onto the `demo` database.