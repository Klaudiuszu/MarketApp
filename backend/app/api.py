from http.client import HTTPException
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import CreateOrderRequest, Issue, OrderIntention, Portfolio
from app.mock_data import MOCK_ORDERS
from app.mock_issues import MOCK_ISSUES
from uuid import uuid4

from app.mock_portfolios import MOCK_PORTFOLIOS

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


@app.get("/api/orders/{new_issue_id}", response_model=List[OrderIntention])
async def get_orders_by_new_issue_id(new_issue_id: str):
    filtered_orders = [order for order in MOCK_ORDERS if order.newIssueId == new_issue_id]
    
    if not filtered_orders:
        return []    
    return filtered_orders

@app.get("/api/issues", response_model=List[Issue])
async def get_issues():
    return MOCK_ISSUES


@app.get("/api/issues/{issue_id}", response_model=Issue)
async def get_issue(issue_id: str):
    for issue in MOCK_ISSUES:
        if issue.id == issue_id:
            return issue
    raise HTTPException(status_code=404, detail="Issue not found")

@app.post("/api/orders", response_model=OrderIntention)
async def create_order(order: CreateOrderRequest):
    new_order = OrderIntention(
        id=str(uuid4()),
        newIssueId=order.newIssueId,
        side=order.side,
        quantity=order.quantity,
        price=order.price,
    )

    MOCK_ORDERS.append(new_order)
    return new_order

@app.get("/api/portfolios", response_model=List[Portfolio])
async def get_portfolios():
    return MOCK_PORTFOLIOS