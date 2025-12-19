import uvicorn # type: ignore

if __name__ == "__main__":
    uvicorn.run(
        "app.api:app",
        host="127.0.0.1",
        port=8000,
        reload=True,  # Auto-reload przy zmianach
        log_level="info"
    )