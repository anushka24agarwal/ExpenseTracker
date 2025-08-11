import Expense from '../models/Expense';

export const resolvers = {
  Query: {
    // getExpenses: async () => {
    //   return await Expense.find().sort({ date: -1 });
    // },
    // getExpenses: async (_: any, args: { month?: number, year?: number }) => {
    //   const filter: any = {};
    //   if (args.month !== undefined && args.year !== undefined) {
    //     const start = new Date(args.year, args.month, 1);
    //     const end = new Date(args.year, args.month + 1, 0, 23, 59, 59);
    //     filter.date = { $gte: start, $lte: end };
    //   }

    //   return await Expense.find(filter).sort({ date: -1 });
    // },
    getExpenses: async (_: any, { month, year }: { month?: number; year?: number }) => {
      if (typeof month === 'number' && typeof year === 'number') {
        // month is expected 1..12
        const start = new Date(year, month - 1, 1, 0, 0, 0, 0);                       // 1st day 00:00
        const end = new Date(year, month, 0, 23, 59, 59, 999);                        // last day 23:59:59.999
        return await Expense.find({ date: { $gte: start, $lte: end } }).sort({ date: -1 });
      }
      // no filter: return all
      return await Expense.find().sort({ date: -1 });
    },
  },

  Mutation: {
    addExpense: async (_: any, args: any) => {
      console.log('Received date in backend:', args.date); 
      const newExpense = new Expense({
        title: args.title,
        amount: args.amount,
        category: args.category,
        date: args.date, 
      });

      return await newExpense.save();
    },
    updateExpense: async (_: any, { id, ...rest }: any) => {
      return await Expense.findByIdAndUpdate(id, rest, { new: true });
    },
    deleteExpense: async (_: any, { id }: any) => {
      const deleted = await Expense.findByIdAndDelete(id);
      return !!deleted;
    },
  },
};
