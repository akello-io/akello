from typing import Optional

from pydantic import BaseModel


class Policy(BaseModel):
    Version: str = "2012-10-17"
    Statement: list

class DynamoDBAccessStatement(BaseModel):
    Sid: str
    Effect: str
    Principal: dict
    Action: list
    Resource: list
    Condition: dict

    def __init__(
            self,
            sid,
            account,
            region,
            username,
            table_name,
            partition_keys=[],
            action=["dynamodb:GetItem"]):
        self.Sid = sid
        self.Effect = "Allow"
        self.Principal = {
            "AWS": f"arn:aws:iam::{account}:user/{username}"
        }
        self.Action = action
        self.Resource = [f"arn:aws:dynamodb:{region}:{account}:table/{table_name}"]
        self.Condition = {
            "ForAnyValue:StringEquals": {
                "dynamodb:LeadingKeys": partition_keys
            }
        }

    def add_partition_key_access(self, partition_key: str):
        self.Condition['ForAnyValue:StringEquals']['dynamodb:LeadingKeys'] = partition_key
