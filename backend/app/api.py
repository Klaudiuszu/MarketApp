from datetime import datetime
from typing import List, Optional
from enum import Enum
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

MOCK_ORDERS = [
    OrderIntention(
        id="ORD-001",
        symbol="AAPL",
        side=Side.BUY,
        quantity=100,
        price=175.50,
        orderType=OrderType.LIMIT,
        status=Status.PENDING,
        timeInForce=TimeInForce.DAY,
        createdAt="2024-01-15 10:30:00",
        traderId="TRD-001",
        account="ACC-001",
        strategy="Momentum"
    ),
    OrderIntention(
        id="ORD-002",
        symbol="MSFT",
        side=Side.SELL,
        quantity=50,
        price=330.25,
        orderType=OrderType.MARKET,
        status=Status.FILLED,
        timeInForce=TimeInForce.IOC,
        createdAt="2024-01-15 11:15:00",
        traderId="TRD-002",
        account="ACC-002",
        strategy="Mean Reversion"
    ),
    OrderIntention(
        id="ORD-003",
        symbol="GOOGL",
        side=Side.BUY,
        quantity=75,
        price=135.80,
        orderType=OrderType.LIMIT,
        status=Status.PENDING,
        timeInForce=TimeInForce.GTC,
        createdAt="2024-01-15 09:45:00",
        traderId="TRD-001",
        account="ACC-001",
        strategy="Trend Following"
    ),
    OrderIntention(
        id="ORD-004",
        symbol="TSLA",
        side=Side.SELL,
        quantity=200,
        price=210.00,
        orderType=OrderType.STOP,
        status=Status.CANCELLED,
        timeInForce=TimeInForce.DAY,
        createdAt="2024-01-14 14:20:00",
        traderId="TRD-003",
        account="ACC-003"
    ),
    OrderIntention(
        id="ORD-005",
        symbol="AMZN",
        side=Side.BUY,
        quantity=150,
        price=145.30,
        orderType=OrderType.MARKET,
        status=Status.REJECTED,
        timeInForce=TimeInForce.IOC,
        createdAt="2024-01-14 16:10:00",
        traderId="TRD-002",
        account="ACC-002",
        strategy="Arbitrage"
    ),
]

app = FastAPI(
    title="Trading Blotter API",
    description="API do zarządzania zleceniami tradingowymi",
    version="1.0.0",
    docs_url="/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Trading Blotter API",
        "version": "1.0.0",
        "endpoints": {
            "orders": "/api/orders",
            "docs": "/docs",
        }
    }

@app.get("/api/orders", response_model=List[OrderIntention])
async def get_orders(
):  
    return MOCK_ORDERS

@app.get("/api/orders/{order_id}", response_model=OrderIntention)
async def get_order(order_id: str):
    for order in MOCK_ORDERS:
        if order.id == order_id:
            return order
    return {"error": "Order not found"}