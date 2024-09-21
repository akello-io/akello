set .env
```
copy env.template .env
```

run the docker containers
```
git clone git@github.com:akello-io/akello.git
docker-compose up
```



### Cognito Local

setup local pool
```sh
aws --endpoint http://localhost:9229 cognito-idp create-user-pool --pool-name MyUserPool
```
