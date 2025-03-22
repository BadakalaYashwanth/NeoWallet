"""
Understanding Classes, Attributes, and Methods
In object-oriented programming, methods are essentially functions that are associated with an object (an instance of a class). They define 
the behaviors or actions that the object can perform.

Classes Are Composed of Two Main Components:
Attributes (Data): These are variables that store information about an object. They describe the properties or characteristics of the object. 
For example, in a Car class, attributes could include color, size, length, and wheel size.

Methods (Functions): These are functions defined inside the class, which describe how the object behaves or interacts with its environment. 
For example, methods in a Car class could include start(), stop(), or accelerate(), which represent the car's actions.

"""
class Car:
    def __init__(self, color, size, wheel_size, length):
        # Define attributes
        self.color = color
        self.size = size
        self.wheel_size = wheel_size
        self.length = length

    # Define methods outside of __init__
    def start(self):
        print("The car is started.")

    def stop(self):
        print("The car is stopped.")

    def accelerate(self, speed):
        print(f"The car is accelerating to {speed} km/h.")

    def display_info(self):
        print(f"Car Details:\nColor: {self.color}, Size: {self.size}, Length: {self.length}, Wheel Size: {self.wheel_size}")


# Create an instance of the Car class
car_details = Car("Red", "Sedan", 21, 10)

# Access methods and attributes
car_details.display_info()  # Displays car details
car_details.start()         # Starts the car
car_details.accelerate(100) # Accelerates the car to 100 km/h
car_details.stop()          # Stops the car