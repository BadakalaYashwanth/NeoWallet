class Message(type):
    def __new__(cls, name, base, dtc):
        dtc['Message'] = lambda self: "Hello form the Class Message class"
        return super().__new__(cls, name, base, dtc)
    
class MyNewClass(metaclass=Message):
        pass

A = MyNewClass()
print(A.Message())
