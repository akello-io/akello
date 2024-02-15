import aws_cdk as cdk
from constructs import Construct
from aws_cdk import (    
    aws_s3 as s3,
    aws_s3_notifications,
    aws_dynamodb as dynamodb
)
from aws_cdk import aws_healthlake as healthlake


class S3(Construct):
    def __init__(
        self, scope: Construct, id_: str, *, bucket_name: str, lambda_notification = None
    ):
        super().__init__(scope, id_)
        
        self.bucket = s3.Bucket(
            self, 
            bucket_name, 
            bucket_name=bucket_name, 
            versioned=False, 
            access_control=s3.BucketAccessControl.PRIVATE, 
            removal_policy=cdk.RemovalPolicy.DESTROY, 
            encryption=s3.BucketEncryption.KMS_MANAGED, 
            bucket_key_enabled=True,
            auto_delete_objects=True
        )
        
        if lambda_notification:
            self.bucket.add_event_notification(
                s3.EventType.OBJECT_CREATED, 
                lambda_notification,
                s3.NotificationKeyFilter(                      
                  suffix=".json",
                )
            )

class DynamoDB(Construct):
    def __init__(
        self, scope: Construct, id_: str, *, table_name: str, partition_key: str, sort_key: str = None
    ):
        super().__init__(scope, id_)
        self.table = dynamodb.TableV2(self, 'Table',
                table_name=table_name,
                partition_key=dynamodb.Attribute(name=partition_key, type=dynamodb.AttributeType.STRING),
                sort_key=dynamodb.Attribute(name=sort_key, type=dynamodb.AttributeType.STRING), 
                contributor_insights=True,
                table_class=dynamodb.TableClass.STANDARD_INFREQUENT_ACCESS,
                point_in_time_recovery=True,
                removal_policy=cdk.RemovalPolicy.DESTROY
            )        


"""
DO NOT USE THIS COMPONENT


class Healthlake(Construct):
    def __init__(
        self, scope: Construct, id_: str, *, healthlake_db_name: str
    ):
        super().__init__(scope, id_)
        
        self.cfn_fHIRDatastore = healthlake.CfnFHIRDatastore(
            self, 
            healthlake_db_name,
            identity_provider_configuration=healthlake.CfnFHIRDatastore.IdentityProviderConfigurationProperty(
                authorization_strategy="SMART_ON_FHIR_V1",
        
                # the properties below are optional
                fine_grained_authorization_enabled=False,
                idp_lambda_arn="idpLambdaArn",
                metadata="metadata"
            ),
            datastore_type_version="R4", 
            datastore_name=healthlake_db_name,
            removal_policy=cdk.RemovalPolicy.DESTROY
        )
        self.cfn_fHIRDatastore.apply_removal_policy(cdk.RemovalPolicy.DESTROY)        
"""