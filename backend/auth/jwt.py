from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()
BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")
ALGORITHM = "HS256" # This should be consistent with how the token is signed
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # You can make this an environment variable as well

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token") # "token" is a placeholder, actual URL might be different based on frontend auth flow

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    if not BETTER_AUTH_SECRET:
        raise ValueError("BETTER_AUTH_SECRET environment variable not set.")
    encoded_jwt = jwt.encode(to_encode, BETTER_AUTH_SECRET, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)) -> int:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        if not BETTER_AUTH_SECRET:
            raise ValueError("BETTER_AUTH_SECRET environment variable not set.")
        payload = jwt.decode(token, BETTER_AUTH_SECRET, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id") # Assuming the user ID claim is "user_id"
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    return user_id