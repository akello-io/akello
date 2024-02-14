import os
import aws_cdk as cdk
from aws_cdk import (    
    aws_s3 as s3,    
    aws_iam as iam,
    aws_s3_deployment as s3deploy,        
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins
)

from constructs import Construct

class DeployStaticSite(Construct):
    
    def __init__(        
        self, scope: Construct, id_: str, *, name: str
    ):
        super().__init__(scope, id_)
        #TODO: S3 Bucket should be private
                
        self.bucket = s3.Bucket(
            self, 
            f"StaticSiteBucket", 
            bucket_name=name,   
            # access_control=s3.BucketAccessControl.PUBLIC_READ,
            public_read_access=True,
            block_public_access=s3.BlockPublicAccess(block_public_policy=False),
            removal_policy=cdk.RemovalPolicy.DESTROY,                         
            website_index_document="index.html",             
            auto_delete_objects=True
        )      
        
        
        distribuiton = cloudfront.Distribution(
            self, 
            f"StaticSiteDistribution", 
            default_root_object="index.html",
            default_behavior=cloudfront.BehaviorOptions(origin=origins.S3Origin(self.bucket))
        )      
                            
        s3deploy.BucketDeployment(
            self, 
            f"DeployStaticSite", 
            sources=[s3deploy.Source.asset(os.path.join(os.getcwd(), "../apps/cocm-registry/dist"))], 
            destination_bucket=self.bucket
        )   