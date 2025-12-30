from app.models import Portfolio

MOCK_PORTFOLIOS = [
    Portfolio(portfolioId="PF1001", portfolioLongName="Portfolio 1001", carveoutId="CV0001", carveoutLongName="Carveout 1", currency="USD"),
    Portfolio(portfolioId="PF1001", portfolioLongName="Portfolio 1001", carveoutId="CV0002", carveoutLongName="Carveout 2", currency="EUR"),
    Portfolio(portfolioId="PF2001", portfolioLongName="Portfolio 2001", carveoutId="CV0001", carveoutLongName="Carveout 1", currency="GBP"),
    Portfolio(portfolioId="PF3001", portfolioLongName="Portfolio 3001", carveoutId="CV0001", carveoutLongName="Carveout 1", currency="JPY"),
]
