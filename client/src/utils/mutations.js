import gql from 'graphql-tag';

export const BUY_SODA = gql`
  mutation buyProduct ($name: String!){ 
    buyProduct (name: $name) { 
      _id 
      name 
      description 
      price 
      maximumQuantity 
      quantity 
      category{
        _id 
        name
      } 
    } 
  }
`