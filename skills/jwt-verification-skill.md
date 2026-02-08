# Skill: JWT Verification Middleware

## Description
This skill provides a reusable FastAPI dependency for securing API endpoints with JWT authentication. The dependency, `get_current_active_user`, performs several critical security checks:
1. It expects a bearer token in the `Authorization` header.
2. It decodes the JWT using the secret key, verifying its signature and expiration time.
3. It extracts the user identifier (e.g., user ID) from the token's payload.
4. It fetches the corresponding user from the database.
5. It returns the full `User` object, making it available to the endpoint's logic.

If any step fails (e.g., token is missing, invalid, expired, or the user does not exist), it automatically raises the appropriate `HTTPException`. This skill is essential for the `auth-agent` to create a single, reliable source of truth for user authentication.

## Example Prompt
"As the `auth-agent`, use the `jwt-verification-skill` to create the core authentication dependency `get_current_active_user`. It needs to integrate with the database to fetch the user model and handle all standard JWT validation errors."

## Template
```python
# In a file like `backend/auth.py`

import os
from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
from sqlmodel import Session

from backend.database import get_session
from backend.models.user import User

# Load secrets from environment
SECRET_KEY = os.getenv("SECRET_KEY", "a-super-secret-key-that-should-be-in-env")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# This scheme will look for the token in the `Authorization: Bearer <token>` header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class TokenData(BaseModel):
    username: Optional[str] = None


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_active_user(
    session: Session = Depends(get_session), token: str = Depends(oauth2_scheme)
) -> User:
    """
    Dependency to get the current authenticated user from a JWT.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    user = session.query(User).filter(User.email == token_data.username).first()
    
    if user is None:
        raise credentials_exception
    
    # In a real app, you might also check if the user is active
    # if not user.is_active:
    #     raise HTTPException(status_code=400, detail="Inactive user")
        
    return user
```
