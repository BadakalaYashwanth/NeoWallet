"""
Definition: Methods that are defined inside a class and operate on instances of the class.

Access to Instance Data: Yes, through self.

Access to Class Data: Yes, but indirectly through the instance.

Use Case: Modify object state or instance-specific behavior.



"""

class MyClass:
    def __init__(self, value):
        self.value = value

    def instance_method(self):
        return f"Instance value: {self.value}"

obj = MyClass(10)
print(obj.instance_method())  # Output: Instance value: 10
