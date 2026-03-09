import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import { useProductCardActions } from '@/hooks/custom/useProductCardActions/useProductCardActions'
import { productGetters } from '@/lib/getters'
import type { Product } from '@/lib/gql/types'
import { FulfillmentOptions } from '@/lib/constants'
import { useGetAllProducts } from '@/hooks/custom/useGetAllProducts/useGetAllProducts'

const CustomHomePage: NextPage = () => {
  const router = useRouter()
  // const categoryCode = (router.query.categoryCode as string) || ''

  const { handleAddToCart, handleWishList, checkProductInWishlist, isATCLoading } =
    useProductCardActions()

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  //Fetch products from API
  const { data, isLoading, isError } = useGetAllProducts({
    // categoryCode,
    pageSize: 20,
  })

//This stores reference of div element so js can control scrolling
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const products = data?.items ?? []

  function updateScrollButtons() {
    const el = scrollRef.current
    if (!el) return

    const maxScrollLeft = el.scrollWidth - el.clientWidth
    const current = el.scrollLeft
    const epsilon = 1

    setCanScrollLeft(current > epsilon)
    setCanScrollRight(maxScrollLeft - current > epsilon)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ left: 0 })

    const id = window.requestAnimationFrame(updateScrollButtons)
    return () => window.cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length])

  useEffect(() => {
    updateScrollButtons()
    const handleResize = () => updateScrollButtons()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const firstCard = container.children[0] as HTMLElement

    if (!firstCard) return

    const cardWidth = firstCard.offsetWidth
    const gap = 16
    const scrollAmount = cardWidth + gap

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })

    // smooth scroll may not settle immediately; re-evaluate after it progresses
    window.requestAnimationFrame(updateScrollButtons)
    window.setTimeout(updateScrollButtons, 250)
  }

  const handleViewProduct = (productCode: string) => {
    router.push(`/product/${productCode}`)
  }

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <div
          className="w-10 h-10 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"
          aria-label="Loading"
        />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-medium">
          Could not load products for this category.
        </h2>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">
          Discover Trendy <span className="text-amber-500">Shoes</span> and
          <span className="text-amber-500"> Fashion</span> for Every Style
        </h1>

        <p className="text-gray-500 text-sm md:text-base">
          Explore our latest collection of comfortable shoes and stylish clothing designed
          to elevate your everyday look. From casual wear to standout pieces, find the
          perfect combination of comfort, quality, and modern fashion.
        </p>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-disabled={!canScrollLeft}
          className="absolute left-0 top-[40%] z-10 bg-white shadow-md rounded-full p-2 hover:bg-amber-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
        >
          <HiChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          type="button"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-disabled={!canScrollRight}
          className="absolute right-0 top-[40%] z-10 bg-white shadow-md rounded-full p-2 hover:bg-amber-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
        >
          <HiChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
        >
          {products.map((product) => {
            const typedProduct = product as Product
            const name = productGetters.getName(typedProduct)             //Extract product details
            const imageUrl = productGetters.handleProtocolRelativeUrl(
              productGetters.getCoverImage(typedProduct)
            )
            const shortDescription =
              productGetters.getShortDescription(typedProduct)

            const price = productGetters.getPrice(typedProduct) || {
              regular: '',
              special: '',
            }

            const isOnsale = price.special && price.special !== price.regular
            const productCode = productGetters.getProductId(typedProduct) as string
            const variationProductCode = productGetters.getVariationProductCode(typedProduct) as string
            const isInWishlist = checkProductInWishlist({
              productCode,
              variationProductCode,
            })
            const isVariationProduct = productGetters.isVariationProduct(typedProduct)

            return (  
              <div
                key={product?.productCode}
                className="flex-shrink-0 w-full md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)] min-w-0 snap-start"
              >
                <div className="relative rounded-3xl shadow-lg border-none flex flex-col p-3 my-4 bg-white transition-all duration-300 ease-out hover:cursor-pointer hover:shadow-2xl hover:shadow-amber-200">


                  <div className="relative w-full h-[190px] flex justify-center items-center bg-gray-200 rounded-xl overflow-hidden">

                    {isOnsale && (
                      <span className="absolute top-4 left-2 bg-red-600 text-white text-[10px] px-3 py-[3px] rounded-lg font-semibold">
                        SALE
                      </span>
                    )}

                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-contain p-3"
                      />
                    )}

                    {/* Wishlist */}
                    <button
                      type="button"
                      onClick={() => handleWishList(typedProduct as any)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:scale-110 transition"
                      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      {isInWishlist ? (
                        <HiHeart className="w-5 h-5 text-red-500" />
                      ) : (
                        <HiOutlineHeart className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="mt-3 flex flex-col flex-1">

                    <h3 className="text-sm font-semibold text-gray-800">
                      {name}
                    </h3>

                    {shortDescription && (
                      <div
                        className="mt-2 text-xs text-gray-500 line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: shortDescription,
                        }}
                      />
                    )}

                    {/* PRICE */}
                    <div className="mt-2 flex items-center gap-2">
                      {isOnsale ? (
                        <>
                          <span className="text-base font-bold text-red-600">
                            $ {price.special}
                          </span>

                          <span className="text-sm text-gray-500 line-through">
                            $ {price.regular}
                          </span>
                        </>
                      ) : (
                        <span className="text-base font-bold">
                          $ {price.regular}
                        </span>
                      )}
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleViewProduct(product?.productCode as string)
                        }
                        className="flex-1 py-2 px-3 text-sm font-medium border border-gray-300 rounded-3xl hover:bg-gray-50"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          if (isVariationProduct) return handleViewProduct(productCode)
                          await handleAddToCart({
                            product: {
                              productCode,
                              variationProductCode,
                              fulfillmentMethod: typedProduct?.fulfillmentTypesSupported?.includes(
                                FulfillmentOptions.DIGITAL
                              )
                                ? FulfillmentOptions.DIGITAL
                                : FulfillmentOptions.SHIP,
                              purchaseLocationCode: '',
                              options: (typedProduct?.options as any) || [],
                            },
                            quantity: 1,
                          })
                        }}
                        disabled={isATCLoading}
                        className="flex-1 py-2 px-3 text-sm font-medium bg-orange-500 text-white rounded-3xl hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CustomHomePage