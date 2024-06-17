from fastapi import APIRouter, HTTPException

from account.adapters import dynamodb_unit_of_work
from account.domain.command_handlers.user.add_user_command_handler import handle_add_user_command
from account.domain.command_handlers.user.get_user_command_handler import handle_get_user_command
from account.domain.command_handlers.user.update_user_command_handler import handle_update_user_command
from account.domain.commands.user.add_user_command import AddUserCommand
from account.domain.commands.user.get_user_command import GetUserCommand
from account.domain.commands.user.update_user_command import UpdateUserCommand
from account.entrypoints.api import config
from infra.dynamodb import dynamodb as dynamodb_client
from account.entrypoints.api.v1.models.create_user import CreateUser

# TODO : no logger here


router = APIRouter()
app_config = config.AppConfig(**config.config)
unit_of_work = dynamodb_unit_of_work.DynamoDBUnitOfWork(
    config.AppConfig.get_table_name(), dynamodb_client.meta.client
)


@router.get("/{user_id}")
async def get(user_id: str):
    try:
        command = GetUserCommand(user_id=user_id)
        user = handle_get_user_command(
            command=command,
            unit_of_work=unit_of_work
        )
        return user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Handle generic exception
        raise HTTPException(status_code=500, detail=e)


@router.post("/")
async def create(user: CreateUser):
    try:
        command = AddUserCommand(
            name=user.name,
            email=user.email
        )
        ret = handle_add_user_command(
            command=command,
            unit_of_work=unit_of_work)
        return ret

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Handle generic exception
        raise HTTPException(status_code=500, detail=e)


@router.put("/{user_id}")
async def update(update_user: CreateUser,user_id: str):
    command = UpdateUserCommand(
        user_id=user_id,
        name=update_user.name,
        email=update_user.email
    )
    try:
        ret = handle_update_user_command(
            command=command,
            unit_of_work=unit_of_work
        )
        return ret
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:

        raise HTTPException(status_code=500, detail=e)
