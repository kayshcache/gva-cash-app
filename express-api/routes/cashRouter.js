import express from 'express';
import {
  readCashFloat,
  createCashFloat,
  updateCashFloat,
  deleteCashFloat,
} from '../controllers/cashFloatsController';

export default express.Router()
  .get('/', readCashFloat)
  .post('/', createCashFloat)
  .put('/:cashFloatId', updateCashFloat)
  .delete('/:cashFloatId', deleteCashFloat);

