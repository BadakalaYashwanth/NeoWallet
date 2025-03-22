class Students:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.college = "Andhra University"
       

    def details(self):  # Properly define the method at the class level
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"College: {self.college}")


# Creating instances of the Students class
student1 = Students("Ravi", 20)
student2 = Students("Raju", 21)

# Printing student details
student1.details()
print("\n")
student2.details()
