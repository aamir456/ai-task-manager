from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models, schemas

router = APIRouter(prefix="/tasks")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def add_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    new = models.Task(title=task.title, description=task.description)
    db.add(new)
    db.commit()
    db.refresh(new)
    return new

@router.get("/")
def list_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()
    
