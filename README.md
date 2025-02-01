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
I would implement a data validation pipeline to ensure that the incoming data adheres to the expected structure, instead of iteratively checking each attribute in the service layer function. For example, a combination of `class-validator` and `class-transformer`, bootstrapped with a global validation pipeline.
In a real-world scenaio, 

I would also use Logger to track events, errors, or any unexpected behaviors to improve the maintainability and debugging of the application.