from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from db import get_session
from models import Task
from schemas.task import TaskCreate, TaskRead, TaskUpdate
from auth.jwt import get_current_user

router = APIRouter()

@router.post("/", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(
    task_create: TaskCreate,
    user_id: int = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task = Task(user_id=user_id, **task_create.model_dump())
    task.user_id = user_id
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.get("/", response_model=list[TaskRead])
def read_tasks(
    status: str = "all", # Default to "all"
    user_id: int = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    statement = select(Task).where(Task.user_id == user_id)
    
    if status == "pending":
        statement = statement.where(Task.completed == False)
    elif status == "completed":
        statement = statement.where(Task.completed == True)
    # No filter needed for "all"

    tasks = session.exec(statement).all()
    return tasks

@router.get("/{task_id}", response_model=TaskRead)
def read_task(
    task_id: int,
    user_id: int = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    user_id: int = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    # Update task fields
    for key, value in task_update.model_dump(exclude_unset=True).items():
        setattr(task, key, value)
    
    task.__pre_update__() # Manually call pre_update for timestamps
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.delete("/{task_id}", status_code=status.HTTP_200_OK)
def delete_task(
    task_id: int,
    user_id: int = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    
    session.delete(task)
    session.commit()
    return {"message": "Task deleted successfully"}

@router.patch("/{task_id}/complete", response_model=TaskRead)
def toggle_task_completion(
    task_id: int,
    user_id: int = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    
    task.completed = not task.completed
    task.__pre_update__() # Manually call pre_update for timestamps
    session.add(task)
    session.commit()
    session.refresh(task)
    return task



