import requests


class BaseAPIClient(object):


    def __init__(self, api_key, base_url):
        self.base_url = base_url        
        self.headers = {"x-api-key": api_key, "Content-Type": "application/json"}

    def get(self, endpoint, params=None):        
        return requests.request("GET", self.base_url + '/' + endpoint, headers=self.headers)
        
    def post(self, endpoint, data=None):              
        return requests.request("POST", self.base_url + '/' + endpoint, headers=self.headers, data=data)

    def put(self, endpoint, data=None):
        return requests.request("PUT", self.base_url + '/' + endpoint, headers=self.headers, data=data)
