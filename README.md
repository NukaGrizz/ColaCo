# ColaCo
ColaCo virtual vending machine for their new line of virtual sodas

## Server Info
### Queries
#### graphql

##### getAllCategories

GraphQL
```GraphQL
query categories { categories { _id name } }
```

##### getAllProducts

GraphQL
```GraphQL
query products { products {_id,name,description,price,maximumQuantity,maximumQuantity,category{_id,name}} }
```

##### getProductsByCategory

GraphQL
```GraphQL
query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      category {
        _id
        name
      }
    }
  }
```

##### getProductsByName

query products ($name: String){ products (name: $name) { _id name description price maximumQuantity quantity category{_id name} } }

##### addProduct

GraphQL
```GraphQL
mutation addProduct($name: String!, $description: String!, $price: Float!, $maximumQuantity: Int!, $quantity: Int!, $category: ID!) { addProduct(name: $name, description: $description, price: $price, maximumQuantity: $maximumQuantity, quantity: $quantity, category: $category) {_id,name,description,price,maximumQuantity,maximumQuantity,category{_id,name}}
}
```

Query Variables
```JSON
{
	"name": "GrizzCola",
	"description": "Drink the Grizz",
	"price": 1,
	"maximumQuantity": 100,
	"quantity": 100,
	"category": "6243788a85b848b7961d9369"
}
```

##### updateProduct
##### deleteProduct

