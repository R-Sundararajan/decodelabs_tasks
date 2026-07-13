from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List

app = FastAPI()


class User(BaseModel):
    id: int
    name: str = Field(..., min_length=1)
    email: str = Field(..., min_length=5)


users: List[User] = []


@app.get("/")
def home():
    return {"message": "Backend API is running"}


@app.get("/users")
def get_users():
    return users


@app.get("/users/{user_id}")
def get_user(user_id: int):
    for user in users:
        if user.id == user_id:
            return user
    raise HTTPException(status_code=404, detail="User not found")


@app.post("/users", status_code=201)
def create_user(user: User):
    for existing_user in users:
        if existing_user.id == user.id:
            raise HTTPException(status_code=400, detail="User ID already exists")
    users.append(user)
    return {
        "message": "User created successfully",
        "user": user
    }


@app.put("/users/{user_id}")
def update_user(user_id: int, updated_user: User):
    for index, user in enumerate(users):
        if user.id == user_id:
            users[index] = updated_user
            return {
                "message": "User updated successfully",
                "user": updated_user
            }
    raise HTTPException(status_code=404, detail="User not found")


@app.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int):
    for index, user in enumerate(users):
        if user.id == user_id:
            users.pop(index)
            return
    raise HTTPException(status_code=404, detail="User not found")