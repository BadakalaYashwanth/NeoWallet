'''
Definition: Methods that are defined inside a class but do not operate on the class or instances of the class.

Access to Instance Data: No.

Access to Class Data: No.

Decorator: @staticmethod

Use Case: Utility functions or methods that don't need access to class or instance data.

Final Answer:
Class → BuzzTheMessage
Object → None (not used here)
Method → buzz() (a static method)
'''
'''
A static method in Python is a method that belongs to the class but does not need an object to be called. It works like a regular function 
inside a class, but it is grouped under the class for better organization.
'''

class BuzzTheMessage:

    @staticmethod #This is the decorator that makes the method static
    def newbuzz():
        print("Buzzing the New Notification")
    
    @staticmethod #This is the decorator that makes the method static
    def buzz(): #Buzz is the Method
        print("Buzzing the message")

BuzzTheMessage.newbuzz()
BuzzTheMessage.buzz() # Calling the static method without creating an object
#Since buzz() is a static method, we can call it directly using the class name.
