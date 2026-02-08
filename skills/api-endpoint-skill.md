# Skill: API Endpoint Generation

## Description
This skill provides a reusable template for generating a complete FastAPI router for a specific resource. The generated code includes full CRUD (Create, Read, Update, Delete) functionality, mandatory JWT authentication, user data isolation, and database session management.

By using this template, the `backend-agent` can rapidly scaffold robust and secure API endpoints that are consistent with the project's architecture. It automatically enforces the rule that users can only interact with their own data.

## Example Prompt
"As the `backend-agent`, use the `api-endpoint-skill` to create the API endpoints for the `Task` resource. The router should be prefixed with `/api/tasks` and use the `Task`, `TaskCreate`, and `TaskUpdate` models. All endpoints must be protected and operate only on the data owned by the authenticated user."

## Template
```python
# In a file like `backend/api/routes/tasks.py`

from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from backend.database import get_session
from backend.models.task import Task, TaskCreate, TaskUpdate
from backend.models.user import User
from backend.auth import get_current_active_user

router = APIRouter()


@router.post("/", response_model=Task)
def create_task(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user),
    task: TaskCreate
):
    """
    Create a new task for the current user.
    """
    db_task = Task.from_orm(task, {"owner_id": current_user.id})
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@router.get("/", response_model=List[Task])
def read_tasks(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    """
    Retrieve all tasks for the current user.
    """
    tasks = session.exec(select(Task).where(Task.owner_id == current_user.id)).all()
    return tasks


@router.patch("/{task_id}", response_model=Task)
def update_task(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user),
    task_id: int,
    task: TaskUpdate
):
    """
    Update a task belonging to the current user.
    """
    db_task = session.get(Task, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    if db_task.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")
    
    task_data = task.dict(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)
    
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@router.delete("/{task_id}")
def delete_task(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user),
    task_id: int
):
    """
    Delete a task belonging to the current user.
    """
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this task")
    
    session.delete(task)
    session.commit()
    return {"ok": True}

```
