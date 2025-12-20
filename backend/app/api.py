from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import OrderIntention
from mock_data import MOCK_ORDERS

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
async def get_orders():  
    return MOCK_ORDERS


@app.get("/api/orders/{order_id}", response_model=OrderIntention)
async def get_order(order_id: str):
    for order in MOCK_ORDERS:
        if order.id == order_id:
            return order
    return {"error": "Order not found"}