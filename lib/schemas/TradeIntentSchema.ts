import { z } from "zod";

export const Side = z.enum(["BUY", "SELL"]);
export const State = z.enum(["OPEN", "CLOSED"]);

export const TradeIntentchema = z
  .object({
    id: z.string(),
    newIssueId: z.string(),
    side: Side,
    quantity: z.number(),
    price: z.number(),
    strategy: z.string().nullable().optional(),
    trader: z.string(),
    carveoutLongname: z.string(),
    createdAt: z.string(),
    state: State,
    carveoutId: z.string(),
  })
  .strict();

export const TradeIntentArraySchema = z.array(TradeIntentchema);

export type ITradeIntentType = z.infer<typeof TradeIntentchema>;
