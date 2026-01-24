import { z } from "zod";

export const Side = z.enum(["BUY", "SELL"]);
export const State = z.enum(["OPEN", "CLOSED"]);

export const TradeIntentchema = z
  .object({
    id: z.string(),
    newIssueId: z.string(),
    symbol: z.string(),
    side: Side,
    quantity: z.number(),
    price: z.number(),
    strategy: z.string().nullable().optional(),
    traderId: z.string(),
    account: z.string(),
    orderType: z.string(),
    status: z.string(),
    timeInForce: z.string(),
    createdAt: z.string(),
  })
  .strict();

export const TradeIntentArraySchema = z.array(TradeIntentchema);

export type ITradeIntentType = z.infer<typeof TradeIntentchema>;
