## FIRST SETUP
> Only for the first time you use this project
- Install [Node.js](https://nodejs.org/en/download/)
- Install [Git](https://git-scm.com/downloads)
- Install [Surrealdb](https://surrealdb.com/install)
- Install Swagger - npm install -g swagger

### Install dependencies
Visit every folder and run :
```
    npm install
```

### Run the project
Run 3 databases in different terminals:
```
    surreal start --user root --pass root --bind 0.0.0.0:8090 memory
    surreal start --user root --pass root --bind 0.0.0.0:8080 memory
    surreal start --user root --pass root --bind 0.0.0.0:8000 memory
```

Run 3 servers in different terminals like this:
```
    cd cse-shop
    swagger project start
```

If you want to test APIs and edit using swagger, you can run these similar to the above command:
```
    cd cse-shop
    swagger project edit
```

Run the full stack clients: (run my-app before bank-app so that my-app has port 5173 and bank-app has port 5174)
```
    cd my-app
    npm run dev -- --open
```

Load users into banks before signup:
```
    curl -X POST \
	 -u "root:root" \
	 -H "NS: myapplication" \
	 -H "DB: myapplication" \
	 -H "Accept: application/json" \
	 -d "{"balance": 9800,"email": "mac22214u@gmail.com","id": "user:618lyjgbhancoqjrz8mw","password": "root","uuid": "2020","verified": false}" \
	 http://localhost:8080/sql
```

> Note: If you want to run the project again, you only need to run the servers and clients. No need to install dependencies again.
> The full stack applications are:
> - bank-app
> - my-app
> The servers are:
> - cse-shop
> - cse-logistics
> - la-banque

# FEEL FREE TO USE THIS PROJECT