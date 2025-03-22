class _BankSecurity:  # Private Class (Not meant to be accessed outside)
    def __init__(self, security_code):
        self.security_code = security_code  # Private class attribute

    def _verify_code(self, input_code):
        """Private method to verify security code"""
        return self.security_code == input_code


class BankAccount:
    def __init__(self, account_holder, balance, security_code):
        self.account_holder = account_holder  # Public attribute
        self._balance = balance  # Private attribute
        self._security = _BankSecurity(security_code)  # Private class instance

    def deposit(self, amount):
        """Public method to deposit money"""
        if amount > 0:
            self._balance += amount
            return f"Deposited {amount}. New balance: {self._balance}"
        return "Invalid deposit amount"

    def withdraw(self, amount, input_code):
        """Public method to withdraw money after verifying security"""
        if self._security._verify_code(input_code):  # Using private method from private class
            if 0 < amount <= self._balance:
                self._balance -= amount
                return f"Withdrawn {amount}. New balance: {self._balance}"
            return "Insufficient funds or invalid amount"
        return "Security code incorrect"

    def show_details(self):
        """Public method to safely access private attributes"""
        return f"Account Holder: {self.account_holder}, Balance: {self._balance}"


# Creating a bank account
account = BankAccount("Alice", 500, "1234")

# Public attribute access
print(account.account_holder)  # Output: Alice

# Public method access
print(account.deposit(200))  # Output: Deposited 200. New balance: 700

# Attempt to withdraw with correct security code
print(account.withdraw(100, "1234"))  # Output: Withdrawn 100. New balance: 600

# Attempt to withdraw with incorrect security code
print(account.withdraw(100, "0000"))  # Output: Security code incorrect

# Show details using public method
print(account.show_details())  # Output: Account Holder: Alice, Balance: 600
