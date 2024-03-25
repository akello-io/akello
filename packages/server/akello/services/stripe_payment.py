import stripe
from akello.services import BaseService


class StripePaymentService(BaseService):

    @staticmethod
    def get_active_stripe_subscriptions(stripe_customer_id: str):
        customer = stripe.Customer.retrieve(
            stripe_customer_id,
            expand=['subscriptions']
        )
        subscriptions = customer['subscriptions']
        active_subscriptions = [
            subscription for subscription in subscriptions if subscription['status'] in ['active', 'trialing']
        ]
        return active_subscriptions


    @staticmethod
    def get_product(stripe_product_id: str):
        return stripe.Product.retrieve(stripe_product_id)

    @staticmethod
    def get_price(stripe_price_id: str):
        return stripe.Price.retrieve(
            stripe_price_id,
        )

    @staticmethod
    def get_customer(stripe_customer_id: str = None, email: str = None):
        if stripe_customer_id:
            return stripe.Customer.retrieve(stripe_customer_id)

        if email:
            return stripe.Customer.search(
                query=f"email:'{email}'",
            )