import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
const getprofit = async () => {
  const profitcurr = Array(12).fill(0);
  const profitprev = Array(12).fill(0);
  const date = new Date();
  const year = date.getFullYear();
  //    console.log(year);
  try {
    const user = await Order.find({});
    user.map((use) => {
      if (use.createdAt.getFullYear() == year) {
        profitcurr[use.createdAt.getMonth() - 1] += parseInt(use.totalprice);
      }
      if (use.createdAt.getFullYear() == year - 1) {
        profitprev[use.createdAt.getMonth() - 1] += parseInt(use.totalprice);
      }
    });
  } catch (error) {
    console.log(error);
  }
  return [profitcurr,profitprev]
};

export default getprofit;
