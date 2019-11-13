# Better_than_Amazon

## Walkthrough of the App

### Customer View
- First, the customer is given a list of all the available products
!()[images/customer-1.jpg]

- The customer can then choose which product they would like to buy using the __item id__, and they are asked for a __quantity__. If the item is in stock, they are given a total _(item price * quantity purchased)_. The customer can then choose to buy more products if they so choose
!()[images/customer-2.jpg]

- If the item is out of stock, the customer is told and they are prompted to purchase something else
!()[images/customer-3.jpg]

### Manager View
- Managers are first prompted with a few different functions, the first of which will show them all of the available products and their departments
!()[images/manager-1.jpg]

- Managers also have a view for low inventory, so that they can easily figure out what to restock on
!()[images/manager-2.jpg]

- Managers can add items to the inventory using the __item id__, and the __quantity__ being added
!()[images/manager-3.jpg]

- The inventory will be updated in the database
!()[images/manager-4.jpg]

- Finally, managers can add new products to inventory
!()[images/manager-5.jpg]

- Once finished, the new item will be added to the database
!()[images/manager-6.jpg]

### Supervisor view
- Supervisors have the ability to create new departments for organization purposes
!()[images/supervisor-2.jpg]

- Most importantly, supervisors are able to view department __overhead costs__ as well as __total sales__ per department. This view will also calculate total profits based on those values.
!()[images/supervisor-1.jpg]

## Technologies Used
- Node.JS
- MySQL
- Inquirer and mysql NPMs