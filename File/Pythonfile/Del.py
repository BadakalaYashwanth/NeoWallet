class student:
    def __init__(self, name):
        self.name = name  # Initializing the instance variable 'name'
        
s1 = student("Alice")  # Creating an object 's1' with name "Alice"
print(s1.name)  # Output: Alice (Accessing the instance variable)

del s1.name  # Deleting the instance variable 'name' of object 's1'

print(s1.name)  # ❌ This will cause an AttributeError because 'name' is deleted
