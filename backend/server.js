const express = require('express');
const cors = require('cors');
const jsonGraphqlExpress = require('json-graphql-server').default;
const ip = require('ip');
const get = require('lodash.get');
const randomstring = require('random-string');

const { isActivated, insertActivation, logout, getMe } = require('./helpers');
const db = require('./db');

const PORT = 3100;
const IP = ip.address();
const app = express();

const DELAY = 500;
app.use((req, res, next) => setTimeout(next, DELAY));

app.use(cors());

app.get('/me', (req, res) => {
  const uuid = get(req, 'headers.uuid', null);
  if (!uuid) {
    res.sendStatus(400);
  } else {
    getMe(uuid, me => {
      if (!me) {
        res.sendStatus(401);
      } else {
        res.json(me);
      }
    });
  }
});

app.get('/activation-code', (req, res) => {
  const uuid = get(req, 'headers.uuid', null);
  if (!uuid) {
    res.sendStatus(400);
  } else {
    const activationCode = randomstring({ length: 6 }).toUpperCase();
    const newDevice = {
      activationCode,
      uuid,
      activated: false,
    };

    insertActivation(newDevice, () => {
      res.json(activationCode);
    });
  }
});

app.get('/logout', (req, res) => {
  const uuid = get(req, 'headers.uuid', null);
  if (!uuid) {
    res.sendStatus(400);
  } else {
    logout(uuid, result => {
      if (!result) {
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  }
});

app.use((req, res, next) => {
  const uuidHeaders = get(req, 'headers.uuid', null);
  const uuidParams = get(req, 'query.uuid', null);
  const uuid = uuidHeaders || uuidParams;

  if (uuid && isActivated(uuid)) {
    next();
  } else {
    res.sendStatus(401);
  }
});

app.use('/graphql', jsonGraphqlExpress(db));

app.listen(PORT, () => {
  console.log(`GraphQL server is running on http://${IP}:${PORT}`);
});
