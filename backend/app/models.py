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
    newIssueId: str
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

class IssueStatus(str, Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"


class IssuePriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class IssueState(str, Enum):
    OPEN = "open"
    CLOSED = "closed"


class IssueType(str, Enum):
    BUG = "bug"
    FEATURE = "feature"
    TASK = "task"
    IMPROVEMENT = "improvement"


class Issue(BaseModel):
    id: str
    title: str
    status: IssueStatus
    priority: IssuePriority
    state: IssueState
    type: IssueType
    assignee: str
    createdAt: str

class CreateOrderRequest(BaseModel):
    newIssueId: str
    side: str
    quantity: int
    price: float

class Portfolio(BaseModel):
    portfolioId: str
    portfolioLongName: str
    carveoutId: str
    carveoutLongName: str
    currency: str
