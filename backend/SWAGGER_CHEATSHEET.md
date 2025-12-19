App/
├── backend/ # Python backend
│ ├── app/
│ │ ├── **init**.py
│ │ └── api.py # Endpointy API
│ ├── requirements.txt
│ └── main.py # Uruchomienie serwera
└── (reszta projektu)
||-----------------------------------------------------------------------------||

# Przejdź do folderu backend

cd D:\PROGRAMMING\PORTFOLIO\stockMarketApp\App\backend

# Stwórz virtual environment (tylko raz)

py -m venv venv

# Aktywuj venv (Windows PowerShell)

venv\Scripts\Activate.ps1

# Jeśli błąd: uruchom z uprawnieniami

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
||-----------------------------------------------------------------------------||
Krok 3: Uruchom serwer

bash

# Z venv aktywowanym

python main.py

# Lub bezpośrednio

uvicorn app.api:app --reload --host 127.0.0.1 --port 8000
