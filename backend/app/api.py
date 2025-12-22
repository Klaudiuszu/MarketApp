from http.client import HTTPException
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import Issue, OrderIntention
from app.mock_data import MOCK_ORDERS
from app.mock_issues import MOCK_ISSUES

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