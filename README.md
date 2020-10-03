# API-JS-Playground

Sample playground for creating and testing an API with express.js, and consume from [JS-Playground](https://github.com/CatinhoCR/ES6-Playground).

## Dependencies

- Node (NPM)
- MongoDB (Will soon add option to use local fake JSON mocked-data)

## Installation

- Clone, then run `npm install`.
- Create a `.env` file at the root folder and add these: (Make sure your local URL matches.. Token secretes can be w/e for now and feel free to change the port to ur prefered dev flow)

```nodejs
MONGO_LOCAL_CONN_URL=mongodb://127.0.0.1:27017/
MONGO_DB_NAME=<your_local_db>
ACCESS_TOKEN_SECRET=addjsonwebtokensecretherelikeQuiscustodietipsoscustodes
REFRESH_TOKEN_SECRET=notsosecret
PORT=8000
```

## Usage

Fow now, simply run `npm run dev`.
**Note:** `clean` and `start` scripts are added but not functional yet, will be extended once production env workflow is added.
