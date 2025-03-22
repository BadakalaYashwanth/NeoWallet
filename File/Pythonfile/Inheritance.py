""""
Inheritance 

Inheritance is when one class (child) gets the features (attributes and methods) of another class (parent).

It’s like how a child can inherit traits from their parents, like having the same eye color or height. 
In coding, a child class can inherit methods and properties from a parent class, saving time and making code easier to reuse and extend.
"""

class car:
    color = "Black"
    @staticmethod
    def start():
        print("Car Started!")
        print("\nVroom Vroom")
    
    def stop(self):  # Add self to make it an instance method
        print("Car Stopped!")

class BMW(car):  # BMW is a child class inheriting from car class
    def __init__(self, name):
        self.name = name

car1 = BMW('BMW M5 Competition F90///')
car2 = BMW('BMW X5 Msport///')

print(car1.name)

print(car1.color)
car1.start()  # Calling the static method
car1.stop()   # Calling the instance method

# print(car2.name)  # Uncomment if you want to print the second car's name

print("\n", car2.name)