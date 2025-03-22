"""Abstraction in Python OOP
What is Abstraction?

1. Abstraction is hiding complex details and showing only the necessary parts of an object.
2. It helps simplify code and improves security by restricting access to certain parts of an object.
3. In Python, abstraction is implemented using abstract classes (classes that cannot be instantiated).

Hiding the implementation details of a class and only showing the necessary parts of an object is called abstraction.
"""
from abc import ABC, abstractmethod
class Vehicle(ABC):  # Abstract class
    @abstractmethod
    def start(self):
        pass  # Force subclasses to implement this method

class Car(Vehicle):  # Concrete class
    def __init__(self):
        self.__acc = False  # Private attribute
        self.__brake = False
        self.__clutch = False
        self.__gear = 0

    def start(self):  # Abstract method implemented
        self.__acc = True
        self.__brake = False
        self.__clutch = True
        self.__gear = 1
        print("Car has started!")

car1 = Car()
car1.start() 