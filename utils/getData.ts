import { ApiStatus } from "@/components/blotter/constants";
import {
  IOrderIntentionsType,
  OrderIntentionsArraySchema,
} from "@/lib/schemas";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface GetDataParams {
  setData: React.Dispatch<React.SetStateAction<IOrderIntentionsType[]>>;
  setStatus: React.Dispatch<React.SetStateAction<ApiStatus>>;
}

export const getData = async ({
  setData,
  setStatus,
}: GetDataParams): Promise<IOrderIntentionsType[]> => {
  try {
    setStatus(ApiStatus.PENDING);
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 3000));
    const fetchPromise = fetch(`${API_URL}/api/orders`);
    const [_, response] = await Promise.all([delayPromise, fetchPromise]);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    const validatedData = OrderIntentionsArraySchema.parse(jsonData);

    setStatus(ApiStatus.ONLINE);
    setData(Array.isArray(validatedData) ? validatedData : []);

    return validatedData;
  } catch (error) {
    setStatus(ApiStatus.ERROR);
    console.error("Error fetching orders:", error);
    setData([]);
    throw error;
  }
};
