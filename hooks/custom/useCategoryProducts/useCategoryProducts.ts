// hooks/custom/useCategoryProducts/useCategoryProducts.ts
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { searchProductsQuery } from '@/lib/gql/queries'
import { buildProductSearchParams } from '@/lib/helpers/buildProductSearchParams'
import { productSearchResultKeys } from '@/lib/react-query/queryKeys'
import type { CategorySearchParams } from '@/lib/types'
import type { ProductSearchResult } from '@/lib/gql/types'
import { productSearchQuery } from '@/lib/gql/queries/customProductQueries/customProductQueries'

interface UseCategoryProductsParams {
  categoryCode?: string
  pageSize?: number
}

interface UseCategoryProductsResult {
  data?: ProductSearchResult
  isLoading: boolean
  isError: boolean
}

const fetchCategoryProducts = async (params: UseCategoryProductsParams) => {
  const searchParams: CategorySearchParams = {
    categoryCode: params.categoryCode,
    pageSize: params.pageSize ?? 20,
  } as CategorySearchParams

  const client = makeGraphQLClient()
  const variables = buildProductSearchParams(searchParams)

  const response = await client.request({
    //document: searchProductsQuery,
    document: productSearchQuery,
    variables,
  })

  return response?.products
}

export const useCategoryProducts = (
  params: UseCategoryProductsParams
): UseCategoryProductsResult => {
  const { categoryCode } = params

  const { data, isLoading, isError } = useQuery({
    queryKey: productSearchResultKeys.searchParams({
      categoryCode,
      pageSize: params.pageSize,
    } as CategorySearchParams),
    queryFn: () => fetchCategoryProducts(params),
  })

  return { data, isLoading, isError }
}