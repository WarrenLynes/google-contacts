import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware';
const fetch = require('node-fetch');
const request = require('request');
const querystring = require('querystring');
const path = require('path');
const cors = require('cors');
const {google} = require('googleapis');

function randomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default class App {
  public app: express.Application;
  private oauth2Client:any;
  private contacts: any = google.people('v1');
  private oauth: any = google.oauth2('v1');

  constructor() {
    this.app = express();

    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL
    );

    this.initializeMiddleWares();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`bounce-api - ${process.env.PORT}`);
    });

    //OAUTH REDIRECT
    this.app.get('/api/login', (req, res) => {
      const scopes = ['https://www.google.com/m8/feeds/', 'https://www.googleapis.com/auth/userinfo.profile']

      const url = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
      });

      res.redirect(url);
    });
    this.app.get('/api/auth-callback', async (req, res) => {
      const {tokens} = await this.oauth2Client.getToken(req.query.code);
      this.oauth2Client.setCredentials(tokens);

      res.redirect('/#' +
        querystring.stringify(tokens));
    });

    this.app.get('/api/me', async(req, res) => {
      console.log("hello");
      console.log(req.headers['authorization']);
      // const access_token = this.oauth2Client.credentials.access_token;
      await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        method: 'get',
        headers: { 'Authorization': req.headers['authorization'], },
      }).then(async (x) => {
        res.send(await x.json());
      });
    });

    this.app.get('/api/me/contacts', async(req,res) => {
      return this.contacts.people.connections.list({
        "resourceName": "people/me",
        "personFields": "names,phoneNumbers",
        "auth": this.oauth2Client
      }, (err, response) => {
        console.log(err, response);
        res.send(response.data.connections);
      })
    });

    this.app.post('/api/me/contacts', async(req,res) => {
      return this.contacts.people.createContact({
        "resource": {
          "names": req.body.names
        },
        "auth": this.oauth2Client
      }, (err, response) => {
        res.send(response.data);
      })
    });

    this.app.delete('/api/me/contacts/people/:id', async(req,res) => {
      return this.contacts.people.deleteContact({
        "resourceName": `people/${req.params.id}`,
        "auth": this.oauth2Client
      }, (err, response) => {
        res.send(response.connections);
      })
    });

    this.app.put('/api/me/contacts/people/:id', async(req,res) => {
      const update = req.body;
      delete update.id;
      console.log(update);
      return this.contacts.people.updateContact({
        "resourceName": `people/${req.params.id}`,
        "updatePersonFields": "names",
        "resource": {
          ...update,
          "names": update.names
        },
        "auth": this.oauth2Client
      }, (err, response) => {
        res.send(response.data);
      })
    });

    this.app.use(express.static(path.join(__dirname, '../../../dist/apps/dashboard')));
    this.app.use('/*', express.static(path.join(__dirname, '../../../dist/apps/dashboard/index.html')))
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleWares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use('/', morgan('dev'));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
