"""
 Inheritance Type:

 1. Single Inheritance
 2. Multiple Inheritance
 3. Multilevel Inheritance

"""

class car:
    def __init__(self, name, color):
        self.name = name
        self.color = color
    
    def start(self):
        print(f"{self.name} started!")
    
    def stop(self):
        print(f"{self.name} stopped!")

class BMW(car):  # BMW class inherits from car class
    def __init__(self, name, color, model):
        # Inherit properties from the car class
        super().__init__(name, color)  # Calling the parent class constructor
        self.model = model  # Additional attribute for BMW

    def display_details(self):
        print(f"Car Model: {self.model}, Name: {self.name}, Color: {self.color}")

# Creating an instance of BMW
car1 = BMW("BMW M5", "Blue", "Competition")

# Calling methods from both BMW (child) and car (parent) classes
car1.start()  # Inherited from car
car1.display_details()  # Defined in BMW
car1.stop()  # Inherited from car
