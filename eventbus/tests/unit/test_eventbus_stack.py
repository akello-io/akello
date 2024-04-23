import aws_cdk as core
import aws_cdk.assertions as assertions

from eventbus.eventbus_stack import EventbusStack

# example tests. To run these tests, uncomment this file along with the example
# resource in eventbus/eventbus_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = EventbusStack(app, "eventbus")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
