# Skill: SQLModel Model Definition

## Description
This skill provides a standardized template for defining a new database table model using SQLModel. The template includes essential fields, table arguments, and a predefined relationship to the `User` model.

This is a critical skill for the `db-agent` as it enforces the project's data architecture, where every resource must be owned by a user. By using this template, all new models will automatically include the `owner_id` foreign key and the corresponding `owner` relationship, ensuring user data isolation at the database level.

## Example Prompt
"As the `db-agent`, use the `sqlmodel-model-skill` to define the `Task` model. It requires the following fields: `title` (a required string), `description` (an optional string), and `completed` (a boolean that defaults to `False`). It must be linked to a user."

## Template
```python
# In a file like `backend/models/task.py`

from typing import Optional
from sqlmodel import Field, SQLModel, Relationship

# Assumes User model is defined in backend.models.user
# and is imported to resolve the relationship.
from .user import User


class TaskBase(SQLModel):
    title: str = Field(index=True)
    description: Optional[str] = None
    completed: bool = Field(default=False)


class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    owner_id: int = Field(default=None, foreign_key="user.id")
    owner: User = Relationship(back_populates="tasks")


class TaskCreate(TaskBase):
    pass


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

# In the User model (`backend/models/user.py`), the corresponding
# relationship must be added to complete the link:
#
# from typing import List
# from .task import Task
#
# class User(UserBase, table=True):
#   ...
#   tasks: List["Task"] = Relationship(back_populates="owner")

```
The template includes `TaskBase`, `Task` (the table model), `TaskCreate`, and `TaskUpdate` to cover different API use cases, following FastAPI best practices.
