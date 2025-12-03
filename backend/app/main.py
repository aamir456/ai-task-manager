from fastapi import FastAPI
from .database import Base, engine
from .routers import tasks

app = FastAPI()

@app.on_event("startup")
def on_startup():
    # create tables on startup, when DB is (hopefully) ready
    Base.metadata.create_all(bind=engine)

app.include_router(tasks.router)
