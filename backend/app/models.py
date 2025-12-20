from datetime import datetime
from typing import List, Optional
from enum import Enum
from pydantic import BaseModel


class Side(str, Enum):
    BUY = "BUY"
    SELL = "SELL"


class OrderType(str, Enum):
    MARKET = "MARKET"
    LIMIT = "LIMIT"
    STOP = "STOP"


class Status(str, Enum):
    PENDING = "PENDING"
    FILLED = "FILLED"
    CANCELLED = "CANCELLED"
    REJECTED = "REJECTED"


class TimeInForce(str, Enum):
    DAY = "DAY"
    GTC = "GTC"
    IOC = "IOC"


class OrderIntention(BaseModel):
    id: str
    symbol: str
    side: Side
    quantity: float
    price: float
    orderType: OrderType
    status: Status
    timeInForce: TimeInForce
    createdAt: str
    traderId: str
    account: str
    strategy: Optional[str] = None