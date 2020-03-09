import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FloatSchema = new Schema({
  fiveCents: {
    type: Number,
    required: true,
    default: 0,
  },
  tenCents: {
    type: Number,
    required: true,
    default: 0,
  },
  twentyCents: {
    type: Number,
    required: true,
    default: 0,
  },
  fiftyCents: {
    type: Number,
    required: true,
    default: 0,
  },
  oneDollar: {
    type: Number,
    required: true,
    default: 0,
  },
  twoDollars: {
    type: Number,
    required: true,
    default: 0,
  },
  fiveDollars: {
    type: Number,
    required: true,
    default: 0,
  },
  tenDollars: {
    type: Number,
    required: true,
    default: 0,
  },
  twentyDollars: {
    type: Number,
    required: true,
    default: 0,
  },
  fiftyDollars: {
    type: Number,
    required: true,
    default: 0,
  },
  oneHundredDollars: {
    type: Number,
    required: true,
    default: 0,
  },
});

