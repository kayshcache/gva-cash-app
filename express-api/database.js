import mongoose from 'mongoose';
require('dotenv').config()

export default class MongoAtlas {
  constructor(dbName) {
    this.atlasUrl = process.env.ATLAS_URL;
    this.credentials = process.env.ATLAS_CREDENTIALS;
    this.dbName = dbName;
    this.connectionString = `mongodb+srv://${this.credentials}@${this.atlasUrl + this.dbName}?retryWrites=true&w=majority`;
  }
  connect() {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Mongo Atlas');
  }
}

