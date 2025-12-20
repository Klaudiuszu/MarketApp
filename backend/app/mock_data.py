from app.models import OrderIntention, Side, OrderType, Status, TimeInForce

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