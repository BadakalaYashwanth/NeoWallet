#When the same opretor is allowed to have different meanings according to the context
class Complex:
    def __init__(self, real, img):
        self.real = real   
        self.img = img
    
    def showNumber(self):
        print(self.real, "i +", self.img, "j")
    
    def __add__(self, other):
        print("\n The is the addition opretor")
        newReal = self.real + other.real
        newImg = self.img + other.img
        return Complex(newReal, newImg)
    
    def __sub__(self, other):
        print("\n This is the subtraction of opretor")
        newReal = self.real - other.real
        newImg = self.img - other.img
        return Complex(newReal, newImg) 

# Taking user input correctly
real1 = float(input("Enter the real part of num1: "))
img1 = float(input("Enter the imaginary part of num1: "))
num1 = Complex(real1, img1)

real2 = float(input("Enter the real part of num2: "))
img2 = float(input("Enter the imaginary part of num2: "))
num2 = Complex(real2, img2)

num1.showNumber()
num2.showNumber()


print("\n")
num3 = num1 + num2 
num3.showNumber()


print("\n")
num3 = num1 - num2
num3.showNumber()