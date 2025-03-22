"""
Class Methods
Definition: Methods that are defined inside a class and operate on the class itself.

Access to Instance Data: No.

Access to Class Data: Yes, through cls.

Decorator: @classmethod

Use Case: Modify class state or behavior shared among all instance

"""


class MyClass:
    class_variable = "class level variable"

    @classmethod
    def class_method(cls):
        return f'class variable: {cls.class_variable}'

print(MyClass.class_method())