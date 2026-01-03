import { z } from "zod";

export const Side = z.enum(["BUY", "SELL"]);
export const OrderType = z.enum(["MARKET", "LIMIT", "STOP"]);
export const Status = z.enum(["PENDING", "FILLED", "CANCELLED", "REJECTED"]);
export const TimeInForce = z.enum(["DAY", "GTC", "IOC"]);

export const TradeIntentchema = z
  .object({
    id: z.string(),
    newIssueId: z.string(),
    symbol: z.string(),
    side: Side,
    quantity: z.number(),
    price: z.number(),
    orderType: OrderType,
    status: Status,
    timeInForce: TimeInForce,
    createdAt: z.string(),
    traderId: z.string(),
    account: z.string(),
    strategy: z.string().nullable().optional(),
  })
  .strict();

export const TradeIntentArraySchema = z.array(TradeIntentchema);

export type ITradeIntentType = z.infer<typeof TradeIntentchema>;
