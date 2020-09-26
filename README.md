# API-JS-Playground

Sample playground for creating and testing an API with express.js, and consume from [JS-Playground](https://github.com/CatinhoCR/ES6-Playground).

## Dependencies

- Node (NPM)
- MongoDB

## Installation

- Clone this, then run `npm install` on the root folder.

## Usage

- Basic initial implementantion. The `extras` folder in the root has the Postman Environment & Collection to import.
- Check the `src/env/constants.js` file and change any value needed to match your local setup.
- Use the Register endpoint to create a new user, then login with your credentials.
- The login endpoint response will return a token. For now, you need to add this to your environment's variables (Postman) as `value` to the `authentication` key.

### TODO

- Songs, artists, Albums, Collectives controllers, models, etc.
- Better user handling for security and automatization of token etc.

**Add better script habdling npm, this is a basic example for ideas whenever:**

```bash
"build": "babel src/app.js -d dist/app.js",
"start": "npm run build && node dist",
"restart": "rimraf dist && npm run start",
"dev": "nodemon --exec npm run restart",
```
