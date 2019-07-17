# amazonstore_mySQL
This is an Amazon-like storefront using MySQL database. If you wish to run this app on your terminal, please install the following commands:
- npm init
- npm install my-sql
- npm install inquirer

The first part of the app is located on bamazonCustomer.js file:
It shows a table with all the products available in the store. The user inputs the ID and the quantity of the desired item. If there is enough quantity, the app fullfits the customer's order and shows the total amount of their purchase. 
(PLEASE SEE showNewOrderandPrice.png screenshot)

The second part of the app is located on bamazonManager.js file:
It shows a list of options:
-View Products for Sale
-View Low Inventory
-Add to Inventory
-Add New Product

If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
(PLEASE SEE 1_viewProductsforSale.png SCREENSHOT)

If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
(PLEASE SEE 2_viewLowInventory.png SCREENSHOT)

If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
(PLEASE SEE 3_addProductQuantity.png SCREENSHOT)

If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
(PLEASE SEE 4_addingNewProduct.png SCREENSHOT)
