import strawberry
import requests
from models.organization import Organization

class OrganizationMutations:


    @strawberry.mutation
    def create_organization(self, id: str, name: str) -> Organization:
        organization =  Organization(id=id, name=name)

        response = requests.post('http://host.docker.internal:8011', json=organization.__dict__)

        return organization
