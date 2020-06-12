const express = require('express');
const cors = require('cors');
const jsonGraphqlExpress = require('json-graphql-server').default;
const db = require('./db');

const PORT = '3100';
const app = express();

app.use(cors());
app.use('/graphql', jsonGraphqlExpress(db));

app.listen(PORT);

const msg = `GraphQL server running with your data at http://localhost:${PORT}/`;
console.log(msg);
