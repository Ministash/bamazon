# Bamazon
##### A CLI Application

This application allows Users To shop through a Database of Items Available for Sale. Database is Updated Accordingly with every Transaction. Below are steps for basic Use / Navigation of Bamazon. 
(**Video Example Below as well**).

| Steps       | Prompts           | Possible Actions  |
| ------------- |:-------------:| --------------:|
| __**1.**__ User Presented with List of Items For Sale      | User Prompted to Select desired Item By ID_NUMBER | Invalid Item_ID Selected *or* Move to Step Two|
| __**2.**__ User Is alerted what Item they have Selected     | User is prompted, asking how many of the chosen item they would like to purchase.      |   IF (desired quantity <= INstock) && (desired quantity > 0) then Allow Purchase. Move to Step Three |
| __**3.**__ After Quantity is Confirmed User is shown thier Receipt [Product Name, Quantity, Total] | User is Prompted, asking if they would like to continue shopping. {Yes/No}      |    **Continue Shopping:** User is provided Updated Item List. Return to Step One  **"DO NOT" Continue Shopping:** User is thanked for using Bamazon & connection is ended. |

- [Bamazon Video Demo Link](https://youtu.be/sOY9tGSllxI "Bamazon Video Demo Link")



