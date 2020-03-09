import mongoose from 'mongoose';
import { ThingSchema } from '..models/model';

const Thing = mongoose.model('Thing', ThingSchema);

export const getThings = (req, res) => {
  Thing.find({}, (err, Thing) => {
    if (err) res.send(err);
    res.status(200).json(Thing);
  });
}
