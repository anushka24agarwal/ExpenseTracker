import mongoose, { Document, Schema } from 'mongoose';

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: string;
  date: Date;
}

const ExpenseSchema: Schema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
}, {
  timestamps: true
});

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
