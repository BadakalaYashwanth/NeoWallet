"""
Multiple Inheritance:
Multiple inheritance is when a class (child class) can inherit attributes and methods from more than one parent class. This means that the 
child class gets features from multiple base classes, allowing it to reuse code from more than one class.

"""
"""
Example Explanation:
Imagine you have two classes, Person and Employee. Now, a Manager can inherit from both of them, getting the features of both classes.

Multiple Inheritance: A type of inheritance where a single class is derived from more than one base class, thus combining the attributes 
and behaviors of multiple parent classes.

By using these structures, you can create complex class relationships and design more flexible and reusable code

"""

class Account:
    def __init__(self, balance):
        self.balance = balance

    def get_balance(self):
        return self.balance

class SavingsAccount(Account):
    def __init__(self, balance, interest_rate):
        super().__init__(balance)
        self.interest_rate = interest_rate

    def get_interest_rate(self):
        return self.interest_rate

class PremiumSavingsAccount(SavingsAccount):
    def __init__(self, balance, interest_rate, premium_benefits):
        super().__init__(balance, interest_rate)
        self.premium_benefits = premium_benefits

    def get_premium_benefits(self):
        return self.premium_benefits

# Example usage:
premium_account = PremiumSavingsAccount(10000, 0.05, ["Priority Support", "Higher Withdrawal Limits"])
print(premium_account.get_balance())  # Access from Account
print(premium_account.get_interest_rate())  # Access from SavingsAccount
print(premium_account.get_premium_benefits())  # Access from PremiumSavingsAccount

