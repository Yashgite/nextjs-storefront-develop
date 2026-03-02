// src/pages/demo-category-products.tsx

import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useRef } from 'react'

import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button, 
  useTheme,
  useMediaQuery,
} from '@mui/material'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { productGetters } from '@/lib/getters'
import type { Product } from '@/lib/gql/types'
import { useCategoryProducts } from '@/hooks/custom/useCategoryProducts/useCategoryProducts'

const DemoCategoryProductsPage: NextPage = () => {
  const router = useRouter()
  const categoryCode = (router.query.categoryCode as string) || ''

  const { data, isLoading, isError } = useCategoryProducts({
    categoryCode,
    pageSize: 20,
  })

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    const containerWidth = scrollRef.current.clientWidth

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -containerWidth : containerWidth,
      behavior: 'smooth',
    })
  }

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product)
  }

  const handleViewProduct = (productCode: string) => {
    router.push(`/product/${productCode}`)
  }

  if (isLoading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !data) {
    return (
      <Box p={4}>
        <Typography variant="h5">
          Could not load products for this category.
        </Typography>
      </Box>
    )
  }

  const products = data.items ?? []

  return (
    <Box p={{ xs: 2, md: 6 }}>
      <Typography variant="h4" mb={3}>
        Products
      </Typography>

      <Box position="relative">
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            left: 0,
            top: '40%',
            zIndex: 2,
            background: '#fff',
            boxShadow: 2,
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            right: 0,
            top: '40%',
            zIndex: 2,
            background: '#fff',
            boxShadow: 2,
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>

        <Box
          ref={scrollRef}
          display="flex"
          gap={2}
          overflow="hidden"
        >
          {products.map((product) => {
            const typedProduct = product as Product
            const name = productGetters.getName(typedProduct)
            const imageUrl = productGetters.handleProtocolRelativeUrl(
              productGetters.getCoverImage(typedProduct)
            )
            const shortDescription =
              productGetters.getShortDescription(typedProduct)
            const price = productGetters.getPrice(typedProduct)

            return (
              <Box
                key={product?.productCode}
                flex={{
                  xs: '0 0 100%',
                  sm: '0 0 50%',
                  md: '0 0 24%',
                }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 1,
                    height: 380, // Slightly increased for buttons
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                    mb: 2,
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: 170,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#f5f5f5',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    {imageUrl && (
                      <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ p: 1, flexGrow: 1 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      noWrap
                    >
                      {name}
                    </Typography>

                    {shortDescription && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          fontSize: 13,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                        dangerouslySetInnerHTML={{
                          __html: shortDescription,
                        }}
                      />
                    )}

                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mt: 1 }}
                    >
                      $ {price.special || price.regular}
                    </Typography>
 
                    <Box
                      mt={2}
                      display="flex"
                      gap={1}
                      justifyContent="space-between"
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        onClick={() =>
                          handleViewProduct(product?.productCode as string)
                        }
                      >
                        View
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => handleAddToCart(typedProduct)}
                      >
                        Add
                      </Button>
                    </Box>

                  </CardContent>
                </Card>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default DemoCategoryProductsPage