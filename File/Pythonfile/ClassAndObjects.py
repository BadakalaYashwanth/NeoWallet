# Creating a Class
class Student:
    name = [
        "Yashwanth", 
        "Gowthami", 
        "Sai", 
        "Srikanth", 
        "Sai Kiran", 
        "Sai Prasad", 
        "Sai Teja", 
        "Sai Krishna", 
        "Sai Kumar", 
        "Sai Praveen", 
        "Sai Charan", 
        "Sai Sumanth", 
        "Sai Suman"
    ]
    sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"]
    roll_no = [1, 2, 3, 4, 5, 6]

# Creating an object (instance)
# The objects are called Instances or Class Instances of the class
Callingtheclass = Student()
print(type(Callingtheclass))  # Print the type of the object
print(Callingtheclass.name)   # Accessing the 'name' attribute
print(Callingtheclass.sections)  # Accessing the 'sections' attribute
print(Callingtheclass.roll_no)   # Accessing the 'roll_no' attribute
