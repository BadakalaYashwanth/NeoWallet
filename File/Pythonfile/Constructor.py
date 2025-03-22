"""
1. The constructor method in Python is named __init__.

2. Imagine This Context:
Think of a class like a blueprint for a car, and the constructor is the part where the car is assembled. When you "build" (create) a car
(object) from the blueprint (class), the constructor decides:
    
    The car's color
    The model
    The engine type, etc.

Similarly, in Python, when you create an object, the __init__ method sets the initial values (like "color" or "model") for that object.

3. A constructor in Python is a special method used to create (or "construct") an object and initialize its attributes. It is called 
automatically when you create an object from a class.

In Python, the constructor is always named __init__, and it sets up the starting state of an object.


4. self:

    Refers to the specific object being created.
    Allows each object to have its own unique data.

5. Objects:

    student1 and student2 are objects created using the constructor. Each has its own unique details.

"""
class Student:

    # Constructor method to initialize attributes
    def __init__(self, name, age, section):
        self.name = name
        self.age = age
        self.section = section

    # Method to print details
    def display_details(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Section: {self.section}")

# Creating objects
student1 = Student("John Doe", 18, "Mathematics")
student2 = Student("Jane Smith", 17, "Science")
student3 = Student("James Bond", 7, "Aerospace")

# Printing details of each student
student1.display_details()
print("\n")
student2.display_details()
print("\n")
student3.display_details()