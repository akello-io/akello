import os
import ssl
from smtplib import SMTP

def send_email_with_ses(sender,reciever,message) :

    # getting the credentials fron evironemnt
    host = os.environ.get("SES_HOST_ADDRESS")
    user = os.environ.get("SES_USER_ID")
    password = os.environ.get("SES_PASSWORD")

    # setting up ssl context
    context = ssl.create_default_context()

    # creating an unsecure smtp connection
    with SMPT(host,port) as server :

        # securing using tls
        server.starttls(context=context)

        # authenticating with the server to prove our identity
        server.login(user=user, password=password)

        # sending a plain text email
        server.sendmail(sender, reciever, message)


if __name__ == "__main__" :

    # testing our function .
    message = "testing email"
    send_email_with_ses("aadbid@some_mail.com","reciever@some_mail.com",message)
