"""
In Object-Oriented Programming (OOP), a property is a special kind of attribute that allows you to control access to the attributes of a 
class. Properties provide a way to use getter, setter, and deleter methods to manage an attribute's value while keeping the interface clean 
and intuitive.

Key Points:

1. Encapsulation: Properties allow you to encapsulate the internal representation of an attribute while providing a way to access and modify 
    it through defined methods.

2. Control Access: You can control how an attribute is read, modified, or deleted by defining getter, setter, and deleter methods.

3. Maintain Compatibility: Properties enable you to change the internal implementation without affecting the external interface of the class.

"""

#Example code 1:
print("\nFirst example")
class Student:
    def __init__(self, phy, chem, math):
        self.phy = phy  # Public attribute
        self.chem = chem  # Public attribute
        self.math = math  # Public attribute

    @property
    def percentage(self):
        return (self.phy + self.chem + self.math) / 3

# Create an instance of Student
student1 = Student(98, 99, 100)

# Print the percentage
print(student1.percentage)  # Correctly access the percentage property

# Modify the chemistry score
student1.chem = 98

# Print the updated percentage
print(student1.percentage)  # Output the updated percentage

"""
Example in Python:
Here’s how you can define and use properties in Python

"""
print("\nSecond Example code")
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # Private attribute

    # Getter method
    @property
    def balance(self):
        return self._balance

    # Setter method
    @balance.setter
    def balance(self, amount):
        if amount >= 0:
            self._balance = amount
        else:
            raise ValueError("Balance cannot be negative")

    # Deleter method
    @balance.deleter
    def balance(self):
        del self._balance

# Example usage:
account = BankAccount(1000)
print(account.balance)  # Access using getter

account.balance = 2000  # Modify using setter
print(account.balance)  # Output: 2000

# account.balance = -500  # This will raise a ValueError

del account.balance  # Delete using deleter
