---
id: 002
title: Backend: Fix `ValidationError` for missing user_id in task creation
stage: fix
date: 2026-02-08
surface: agent
model: gemini-1.5-pro
feature: tasks
branch: main
user: Current User
command: ""
labels: ["backend", "bugfix", "validation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - backend/routes/tasks.py
tests_yaml: []
---
## Prompt
```text
abhe Failed to add task: Failed to fetch abhe bhe yehi bol raha hai terminal pe ye error bata raha hai isko fix kero INFO:     127.0.0.1:55168 - "GET /api/tasks HTTP/1.1" 307 Temporary Redirect
INFO:     127.0.0.1:55168 - "GET /api/tasks HTTP/1.1" 307 Temporary Redirect
2026-02-08 21:43:19,494 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2026-02-08 21:43:19,497 INFO sqlalchemy.engine.Engine SELECT task.id, task.user_id, task.title, task.description, task.completed, task.created_at, task.updated_at
FROM task
WHERE task.user_id = %(user_id_1)s
2026-02-08 21:43:19,498 INFO sqlalchemy.engine.Engine [generated in 0.00101s] {'user_id_1': 1}
INFO:     127.0.0.1:55169 - "GET /api/tasks/ HTTP/1.1" 200 OK
2026-02-08 21:43:19,936 INFO sqlalchemy.engine.Engine ROLLBACK
2026-02-08 21:43:21,347 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2026-02-08 21:43:21,349 INFO sqlalchemy.engine.Engine SELECT task.id, task.user_id, task.title, task.description, task.completed, task.created_at, task.updated_at
FROM task
WHERE task.user_id = %(user_id_1)s
2026-02-08 21:43:21,353 INFO sqlalchemy.engine.Engine [cached since 1.856s ago] {'user_id_1': 1}
INFO:     127.0.0.1:55169 - "GET /api/tasks/ HTTP/1.1" 200 OK
2026-02-08 21:43:21,804 INFO sqlalchemy.engine.Engine ROLLBACK
INFO:     127.0.0.1:55169 - "POST /api/tasks HTTP/1.1" 307 Temporary Redirect
INFO:     127.0.0.1:55169 - "POST /api/tasks/ HTTP/1.1" 500 Internal Server Error
ERROR:    Exception in ASGI application
Traceback (most recent call last):
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\uvicorn\protocols\http\httptools_impl.py", line 416, in run_asgi
    result = await app(  # type: ignore[func-returns-value]
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        self.scope, self.receive, self.send
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\uvicorn\middleware\proxy_headers.py", line 60, in __call__    
    return await self.app(scope, receive, send)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\fastapi\applications.py", line 1138, in __call__
    await super().__call__(scope, receive, send)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starlette\applications.py", line 112, in __call__
    await self.middleware_stack(scope, receive, send)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starlette\middleware\errors.py", line 187, in __call__        
    raise exc
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starlette\middleware\errors.py", line 165, in __call__        
    await self.app(scope, receive, _send)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starlette\middleware\cors.py", line 93, in __call__
    await self.simple_response(scope, receive, send, request_headers=headers)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starlette\middleware\cors.py", line 144, in simple_response   
    await self.app(scope, receive, send)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starlette\middleware\exceptions.py", line 62, in __call__     
    await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app     
    raise exc
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app     
    await app(scope, receive, sender)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\fastapi\middleware\asyncexitstack.py", line 18, in __call__   
    await self.app(scope, receive, send)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starletteouting.py", line 714, in __call__
    await self.middleware_stack(scope, receive, send)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starletteouting.py", line 734, in app
    await route.handle(scope, receive, send)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starletteouting.py", line 288, in handle
    await self.app(scope, receive, send)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\fastapiouting.py", line 115, in app
    await wrap_app_handling_exceptions(app, request)(scope, receive, send)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app     
    raise exc
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app     
    await app(scope, receive, sender)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\fastapiouting.py", line 101, in app
    response = await f(request)
               ^^^^^^^^^^^^^^^^
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\fastapiouting.py", line 355, in app
    raw_response = await run_endpoint_function(
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ...<3 lines>...
    )
    ^
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\fastapiouting.py", line 245, in run_endpoint_function       
    return await run_in_threadpool(dependant.call, **values)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\starlette\concurrency.py", line 37, in run_in_threadpool      
    return await anyio.to_thread.run_sync(func)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\anyio	o_thread.py", line 56, in run_sync
    return await get_async_backend().run_sync_in_worker_thread(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        func, args, abandon_on_cancel=abandon_on_cancel, limiter=limiter
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\anyio\_backends\_asyncio.py", line 2461, in run_sync_in_worker_thread
    return await future
           ^^^^^^^^^^^^
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\anyio\_backends\_asyncio.py", line 962, in run
    result = context.run(func, *args)
  File "D:\Hackathon2\Hackathon2_Phase2_Todo_Application\backendoutes	asks.py", line 16, in create_task
    task = Task.from_orm(task_create)
  File "C:\Program Files\Python313\Lib\warnings.py", line 637, in wrapper
    return arg(*args, **kwargs)
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\sqlmodel\main.py", line 965, in from_orm
    return cls.model_validate(obj, update=update)
           ~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\sqlmodel\main.py", line 880, in model_validate
    return sqlmodel_validate(
        cls=cls,
    ...<4 lines>...
        update=update,
    )
  File "C:\Users\HP PROBOOOK 640 G2\AppData\Roaming\Python\Python313\site-packages\sqlmodel\_compat.py", line 300, in sqlmodel_validate
    cls.__pydantic_validator__.validate_python(
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        use_obj,
        ^^^^^^^^
    ...<3 lines>...
        self_instance=new_obj,
        ^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
pydantic_core._pydantic_core.ValidationError: 1 validation error for Task
user_id
  Field required [type=missing, input_value=TaskCreate(title='my task', description=''), input_type=TaskCreate]
    For further information visit https://errors.pydantic.dev/2.10/v/missing
```
