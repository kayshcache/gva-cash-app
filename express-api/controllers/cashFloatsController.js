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
export const readCashFloat = (req, res, next) =>
  CashFloat.find({}, (err, cashFloat) =>
    err ? res.send(err) : res.status(200).json(cashFloat));

// U (update):
export const updateCashFloat = (req, res) => {
  console.dir(req.body);
  CashFloat.findOneAndUpdate({_id: req.params.cashFloatId}, req.body, {new: true, useFindAndModify: false}, (err, cashFloat) =>
    err ? res.send(err) : res.json(cashFloat));
}

// D (delete):
export const deleteCashFloat = (req, res) => {
  const cashFloatId = req.params.cashFloatId;
  CashFloat.deleteOne({_id: cashFloatId}, (err, cashFloat) =>
    err ? res.send(err) : res.json({msg: `Deleted Mongo document ID: ${cashFloatId}`}));
}

// IGNORE UNTIL LATER MAKING A CLASS OUT OF THIS FILE
// 
//
export default class CashFloatController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.cashFloatId = req.params.cashFloatId || null;
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
    CashFloat.findOneAndUpdate({_id: this.cashFloatId}, this.req.body, {new: true}, (err, cashFloat) =>
      err ? res.send(err) : res.json(cashFloat));
  }

  delete() {
    CashFloat.deleteOne({_id: this.cashFloatId}, (err, cashFloat) =>
      err ? res.send(err) : res.json({msg: `Deleted Mongo document ID: ${this.cashFloatId}`}));
  }
}
