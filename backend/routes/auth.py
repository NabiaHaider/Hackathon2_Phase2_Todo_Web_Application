from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from models import User
from schemas.user import UserCreate, UserLogin, UserResponse, TokenResponse
from db import get_session
from passlib.context import CryptContext
from auth.jwt import create_access_token
import os

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user_create: UserCreate, session: Session = Depends(get_session)):
    """
    Create a new user.
    """
    user_exists = session.exec(select(User).where(User.email == user_create.email)).first()
    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    hashed_password = pwd_context.hash(user_create.password)
    user = User(email=user_create.email, hashed_password=hashed_password)
    
    session.add(user)
    session.commit()
    session.refresh(user)
    
    return user

@router.post("/login", response_model=TokenResponse)
def login(user_login: UserLogin, session: Session = Depends(get_session)):
    """
    Log in a user and return a JWT token.
    """
    user = session.exec(select(User).where(User.email == user_login.email)).first()
    if not user:
        print(f"DEBUG: User with email {user_login.email} not found.")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password (user not found)",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # --- DEBUGGING START ---
    print(f"DEBUG: Input Password: {user_login.password}")
    print(f"DEBUG: Stored Hashed Password: {user.hashed_password}")
    # --- DEBUGGING END ---

    if not pwd_context.verify(user_login.password, user.hashed_password):
        print(f"DEBUG: Password verification failed for user {user_login.email}.")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password (password mismatch)",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"user_id": user.id})
    
    return {"access_token": access_token, "token_type": "bearer", "user": user}
