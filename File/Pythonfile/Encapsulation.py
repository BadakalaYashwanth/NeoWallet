"""
Encapsulation in Python OOP
What is Encapsulation?
1️⃣ Encapsulation is the concept of hiding data within a class and allowing access through methods.
2️⃣ It protects data from accidental modification.
3️⃣ Uses private (__variable) and protected (_variable) attributes to restrict direct access.

"""
class BankAccount:
    # Step 1: Define the constructor (__init__) to initialize account details
    def __init__(self, account_holder, balance):
        self.account_holder = account_holder  # Public attribute (Account holder's name)
        self.balance = balance  # Public attribute (Initial balance)

    # Step 2: Define the deposit method to add money to the account
    def deposit(self, amount):
        if amount > 0:  # Ensuring deposit amount is valid (greater than 0)
            self.balance += amount  # Add deposit amount to the balance
            print(f"Deposit of {amount} successful. New balance is {self.balance}.")
        else:
            print("Invalid deposit amount.")  # If deposit amount is negative, show an error message
        
    # Step 3: Define the withdraw method to withdraw money from the account
    def withdraw(self, amount):
        if amount <= self.balance:  # Check if the balance is sufficient for withdrawal
            self.balance -= amount  # Deduct the withdrawal amount from the balance
            print(f"Withdrawal of {amount} successful. New balance is {self.balance}.")
        else:
            print("Invalid withdraw amount.")  # If withdrawal amount exceeds balance, show an error message
    
    # Step 4: Define a method to get the current balance
    def get_balance(self):
        return self.balance  # Return the current balance of the account

# Step 5: Create an account object for "Alice" with an initial balance of 500
account = BankAccount("Alice", 500)

# Step 6: Get and print the initial balance
print("Balance:", account.get_balance())  # Output: Balance: 500

# Step 7: Deposit 1000 into Alice's account
account.deposit(1000)  # Output: Deposit of 1000 successful. New balance is 1500.

# Step 8: Get and print the balance after deposit
print("Balance after deposit:", account.get_balance())  # Output: Balance after deposit: 1500

# Step 9: Withdraw 200 from Alice's account
account.withdraw(200)  # Output: Withdrawal of 200 successful. New balance is 1300.

# Step 10: Get and print the balance after withdrawal
print("Balance after withdrawal:", account.get_balance())  # Output: Balance after withdrawal: 1300
