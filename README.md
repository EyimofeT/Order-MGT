# Order-MGT
 An API designed with Nodejs to manage orders .


## API Documentation
Visit
   -> http://{BASE_URL}:{PORT}/api-docs/

      e.g Running locally using port 5001 - http://localhost:5001/api-docs/

## installation
        install required packages:
        ->  npm install 

        to run server
        -> npm run start - starts up the api services
    


## Database
Migrate Database by performing following actions
 -> npx prisma init
    npx prisma migrate dev --name init
    npm prisma generate
 

## Setting Environment Variables

-> Create a .env file in root directory and input:

    CONFIG_PATH=./env_config.json

-> Create a env_config.json file in root directory
    
    { 
        "API_PORT":5001,
        "BASE_URL":"/api/v1",
        "DATABASE_URL":"mysql://username:password@localhost:8889/database"
    }  



