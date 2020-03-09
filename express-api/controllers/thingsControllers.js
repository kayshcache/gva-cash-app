import mongoose from 'mongoose';
import { FloatSchema } from '..models/FloatModel';

const CashFloat = mongoose.model('CashFloat', FloatSchema);

export const readCashFloat = (req, res) => {
  CashFloat.find({}, (err, CashFloat) => {
    if (err) res.send(err);
    res.status(200).json(CashFloat);
  });
}

export const createCashFloat = (req, res) => {
  const newCashFloat = new CashFloat(req.body);
  newCashFloat.save((err, CashFloat) => {
    if (err) res.send(err);
    res.json(CashFloat);
  });
}
