import { Router } from "express";
import {
  signup,
  signin,
  forgotpassword,
  resetpassword,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/tokenValidationMiddleware.js";
import {
  createBudget,
  getBudgets,
  addExpenseToBudget,
  getBudgetWithExpenses,
  showBudgetData
} from "../controllers/ExpenseBudgetController.js";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

userRouter.post("/forgot-password", forgotpassword);
userRouter.post("/reset-password", resetpassword);


userRouter.use(authenticateToken);

userRouter.post("/budgets", createBudget);
userRouter.get("/budgets", getBudgets);
userRouter.post("/budgets/expenses", addExpenseToBudget);
userRouter.get("/budgets/showdata", showBudgetData);
userRouter.get("/budgets/:budgetId", getBudgetWithExpenses);



export { userRouter };
