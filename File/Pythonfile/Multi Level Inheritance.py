"""
1. Base (Parent class parameters)
    |
    |
    |
2. Derived (Child class parameters) -- Inherits from Base
    |
    |
    |
3. Further Derived (Grandchild class parameters) -- Inherits from Derived

Corrected Definition:
1. Base (Parent Class): The parent class, also known as the base class, defines common attributes and methods that can be inherited by 
    other classes.

2. Derived (Child Class): The child class, also known as the derived class, inherits the attributes and methods from the parent class. 
    It can also have its own additional attributes or methods.

3. Further Derived (Grandchild Class): This class inherits from the derived class and can add or modify its own attributes and methods.
    In multilevel inheritance, each child class can pass its attributes to the next level (grandchild class).

Multilevel Inheritance: A type of inheritance where a class is derived from another class, which itself is derived from yet another 
class, forming a multi-level chain of inheritance. This type of inheritance builds a linear class hierarchy.

"""

class car:
    @staticmethod
    def start():
        print(" Car is Starting, vroom vroom vroom vroom vroom vroom vroom")
    
    @staticmethod
    def stop():
        print("Stopping car")   
    
class BMW(car):
    def __init__(self, brand):

        self.brand = brand

class M5(BMW):
    def __init__(self, brand, model, type):
        super().__init__(brand)
        self.brand = brand
        self.model = model
        self.type = type

car1 = M5("BMW", "M5", "Sedan")
print(car1)
car1.start()

