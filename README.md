# Run backend
 
Needed: 
  docker
  node

Enter in the folder `backend` from terminal, first run:

```shell
docker volume create --name=phone-book-db-data
```

Then to put our db up we need to run:

```shell
docker-compose up -d
```

Now we need install deps with: 

```shell
npm i
```

Source our `env/dev.env``

```shell
source env/dev.env
```

With all setup we need to run our migration

```
npm run migrate
```

Everithing is ready to run:

```
npm run dev
```

# Run frontend

For frontend we just need enter on `frontend` folder from terminal:

```shell
cp .env-example .env
```

Install deps with 

```shell
npm i
```

Then we just need run 

```shell
npm start
```

