import mongoose from 'mongoose';
import { FloatSchema } from '../models/cashFloatModel';

const CashFloat = mongoose.model('CashFloat', FloatSchema);

// C (create):
export const createCashFloat = (req, res) => {
  const newCashFloat = new CashFloat(req.body);
  newCashFloat.save((err, cashFloat) =>
    err ? res.send(err) : res.json(cashFloat));
}

// R (read):
export const readCashFloat = (req, res) => {
  CashFloat.find({}, (err, cashFloat) => 
    err ? res.send(err) : res.status(200).json(cashFloat));
}

// U (update):
export const updateCashFloat = (req, res) => {
  CashFloat.findOneAndUpdate({_id: req.params.cashFloatId}, req.body, {new: true}, (err, cashFloat) =>
    err ? res.send(err) : res.json(cashFloat));
}

// D (delete):
export const deleteCashFloat = (req, res) => {
  const cashFloatId = req.params.cashFloatId;
  CashFloat.deleteOne({_id: cashFloatId}, (err, cashFloat) =>
    err ? res.send(err) : res.json({msg: `Deleted Mongo document ID: ${cashFloatId}`}));
}

export default class CashFloatController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    CashFloat = mongoose.model('CashFloat', FloatSchema);
  }

  create() {
    const newCashFloat = new CashFloat(this.req.body);
    newCashFloat.save((err, cashFloat) =>
      err ? this.res.send(err) : this.res.json(cashFloat));
  }

  read() {
    CashFloat.find({}, (err, cashFloat) => 
      err ? this.res.send(err) : this.res.status(200).json(cashFloat));
  }

  update() {
    CashFloat.findOneAndUpdate({_id: req.params.cashFloatId}, req.body, {new: true}, (err, cashFloat) =>
      err ? res.send(err) : res.json(cashFloat));
  }

  delete() {
    const cashFloatId = req.params.cashFloatId;
    CashFloat.deleteOne({_id: cashFloatId}, (err, cashFloat) =>
      err ? res.send(err) : res.json({msg: `Deleted Mongo document ID: ${cashFloatId}`}));
  }
}
