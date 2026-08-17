# python program to create a simple calculator

# 3 steps to build a software program
# 1. functions for operations
# 2. user print
# 3. print result

# Function to add two numbers
def add(num1,num2):
    return num1 + num2

# Function to subtract two numbers
def subtract(num1,num2):
    return num1 - num2

# Function to multiply two numbers
def multiply(num1,num2):
    return num1 * num2

# Function to divide two numbers
def divide(num1,num2):
    return num1 / num2

# Function to calculate average of two numbers
def avg(num1,num2):
    return (num1 + num2)/2

    #Step2: user input
    print("please select a operation:\n " \
          "1. Add\n " \
          "2. Subtract\n " \
          "3. Multiply\n " \
          "4. Divide\n " \
          "5. Average\n ")

    select = int(input("Select operation from 1,2,3,4,5: "))

    number1 = int(input("Enter first number: "))
    number2 = int(input("Enter second number: "))

    #step3: print result
    if select == 1:
        print(number1, "+", number2, "=", add(number1, number2))
    elif select == 2:
        print(number1, "-", number2, "=", subtract(number1, number2))
    elif select == 3:
        print(number1, "*", number2, "=", multiply(number1, number2))
    elif select == 4:
        print(number1, "/", number2, "=", divide(number1, number2))
    elif select == 5:
        print("Average of", number1, "and", number2, "is", avg(number1, number2))
    else:
        print("Invalid input")