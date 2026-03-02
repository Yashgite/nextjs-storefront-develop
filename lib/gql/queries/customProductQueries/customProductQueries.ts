import { productCardFragment } from "../../fragments/customProduct";
 
export const productSearchQuery = /* GraphQL */ `
  query ProductSearch(
    $query: String
    $startIndex: Int
    $filter: String
    $pageSize: Int
    $sortBy: String
    $facet: String
    $facetHierValue: String
    $facetTemplate: String
    $facetValueFilter: String
  ) {
    products: productSearch(
      query: $query
      filter: $filter
      startIndex: $startIndex
      pageSize: $pageSize
      facet: $facet
      sortBy: $sortBy
      facetHierValue: $facetHierValue
      facetTemplate: $facetTemplate
      facetValueFilter: $facetValueFilter
    ) {
      totalCount
      items {
        ...ProductCard
      }
    }
  }
  ${productCardFragment}
`

// query ProductSearch($query: String, $pageSize: Int) {
//     productSearch(query: $query, pageSize: $pageSize) {
//         totalCount
//         items {
//           ...ProductCard
//         }
//     }
// }
// ${productCardFragment}