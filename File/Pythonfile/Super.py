"""
What is super()
In Python, super() is a built-in function used to call methods from a parent (or superclass) within a child (or subclass) that inherits 
from it. It is particularly useful in the context of multiple inheritance, as it helps to resolve the "diamond problem" by ensuring the 
proper method resolution order (MRO).

Here’s a quick rundown of its benefits:

Access Parent Class Methods: Allows you to call methods from the parent class within the child class.

Avoid Repetition: Prevents the need to explicitly name the parent class, making your code more maintainable and reducing the chance of errors.

Multiple Inheritance: Ensures the correct method resolution order when dealing with multiple inheritance scenarios.

"""
class A:
    def display(self):                          
        print("This is Class A")

#Class A:
#This is the base class.
#It has a method display that prints "This is Class A".


class B(A):
    def display(self):
        print("This is Class B")  
        super().display() 

#Class B (Inherits from A):
#Class B is derived from Class A.
#It overrides the display method to print "This is Class B".
#It calls the display method of Class A using super().display().

class C(A):
    def display(self):
        print("This is Class C")
        super().display

#Class C (Inherits from A):
#Class C is derived from Class A.
#It overrides the display method to print "This is Class C".
#It calls the display method of Class A using super().display()


class D(B, C):
    def display(self):
        print("This is Class D")
        super().display()

#Class D (Inherits from B and C):
#Class D is derived from both Class B and Class C (multiple inheritance).
#It overrides the display method to print "This is Class D".
#It calls the display method using super().display(), which follows the method resolution order (MRO)
 
d_instance = D()
d_instance.display()