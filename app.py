# class Password:
#     def __init__(self, password):
#         self.__password = password

#     def check_password(self, guess):
#        if guess == self.__password:
#             return True
#        else:
#             return False


# my_password = Password("secret123")
# guess = input("Enter your password guess: ")
# if my_password.check_password(guess):
#     print("true.")
# else:
#     print("false.")

# Create a Temperature class with a private __celsius attribute. Add a set_temperature() method that only accepts values between -273.15 and 1000





class temperature:
    def __init__(self, celsius):
        self.__celsius = celsius

    def set_temperature(self, temp):
        if temp >= -273.15 and temp <= 1000:
            self.__celsius = temp
            print(f'Temperature set to: {self.__celsius}°C')
        else:
            print('Invalid. Please enter between -273.15 and 1000.')


temp1 = temperature(25)
ask = float(input('Enter a temperature in Celsius: '))
temp1
