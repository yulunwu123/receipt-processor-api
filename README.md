## Receipt Processor API

### Build the Docker Image
```bash
$ docker build -t receipt-processing-nestjs .
```

### Run the Docker Container
```bash
# bind port 3000 inside the container to port 3000 on the local machine
$ docker run -p 3000:3000 receipt-processing-nestjs
```


### If you would like to run the project locally (will run on port 3000)

```bash
$ npm install
$ npm run start:dev
```

### Run tests locally

```bash
# unit tests
$ npm run test
```

### Potential Improvements
logger