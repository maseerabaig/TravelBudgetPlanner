import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    budgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget", // Reference to the Budget model
      required: true,
    },
    date: { type: Date, required: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Transport",
        "Accommodation",
        "Entertainment",
        "Shopping",
        "Health",
        "Education",
        "Others",
      ],
    },
    amount: { type: Number, required: true, min: 0 }, // Ensure expense is non-negative
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const expenseModel = mongoose.model("Expense", expenseSchema);

export { expenseModel };
