# Better_than_Amazon

## Walkthrough of the App

### Customer View
- First, the customer is given a list of all the available products

![customer-1](https://user-images.githubusercontent.com/51139272/68810289-cd92ab80-063b-11ea-8b97-38503b528a36.JPG)

- The customer can then choose which product they would like to buy using the __item id__, and they are asked for a __quantity__. If the item is in stock, they are given a total _(item price * quantity purchased)_. The customer can then choose to buy more products if they so choose

![customer-2](https://user-images.githubusercontent.com/51139272/68810357-f6b33c00-063b-11ea-9459-c7fc8143621d.JPG)

- If the item is out of stock, the customer is told and they are prompted to purchase something else

![customer-3](https://user-images.githubusercontent.com/51139272/68810367-f87cff80-063b-11ea-8cb1-a8896bf3d4a4.JPG)

### Manager View
- Managers are first prompted with a few different functions, the first of which will show them all of the available products and their departments

![manager-1](https://user-images.githubusercontent.com/51139272/68810418-1b0f1880-063c-11ea-83ec-570ccc7b6450.JPG)

- Managers also have a view for low inventory, so that they can easily figure out what to restock on

![manager-2](https://user-images.githubusercontent.com/51139272/68810421-1e0a0900-063c-11ea-9d4f-ebaebbeae9ed.JPG)

- Managers can add items to the inventory using the __item id__, and the __quantity__ being added

![manager-3](https://user-images.githubusercontent.com/51139272/68810427-206c6300-063c-11ea-9438-781236ff0beb.JPG)

- The inventory will be updated in the database

![manager-4](https://user-images.githubusercontent.com/51139272/68810434-22362680-063c-11ea-8b6c-465012f49a5e.JPG)

- Finally, managers can add new products to inventory

![manager-5](https://user-images.githubusercontent.com/51139272/68810435-23ffea00-063c-11ea-87a5-0ba8769a2326.JPG)

- Once finished, the new item will be added to the database

![manager-6](https://user-images.githubusercontent.com/51139272/68810439-26fada80-063c-11ea-9fdf-f3a2a8d9adda.JPG)

### Supervisor view
- Supervisors have the ability to create new departments for organization purposes

![supervisor-1](https://user-images.githubusercontent.com/51139272/68810536-57db0f80-063c-11ea-8add-fee2fc0b5bed.JPG)

- Most importantly, supervisors are able to view department __overhead costs__ as well as __total sales__ per department. This view will also calculate total profits based on those values.

![supervisor-2](https://user-images.githubusercontent.com/51139272/68810538-590c3c80-063c-11ea-8f5c-718412c077c6.JPG)

## Technologies Used
- Node.JS
- MySQL
- Inquirer and mysql NPMs
