// src/pages/demo-category-products.tsx
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import { productGetters } from '@/lib/getters'
import type { Product } from '@/lib/gql/types'
import { useCategoryProducts } from '@/hooks/custom/useCategoryProducts/useCategoryProducts'

const DemoCategoryProductsPage: NextPage = () => {
  const [wishlist, setWishlist] = useState<string[]>([])

  const router = useRouter()
  const categoryCode = (router.query.categoryCode as string) || ''

  const { data, isLoading, isError } = useCategoryProducts({
    categoryCode,
    pageSize: 20,
  })

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const handleWishlistToggle = (productCode: string) => {
    setWishlist((prev) =>
      prev.includes(productCode)
        ? prev.filter((code) => code !== productCode)
        : [...prev, productCode]
    )
  }

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
  }

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product)
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

  const products = data.items ?? []

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Products</h1>

      <div className="relative">
        <button
          type="button"
          onClick={() => scroll('left')}
          className="absolute left-0 top-[40%] z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
        >
          <HiChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          type="button"
          onClick={() => scroll('right')}
          className="absolute right-0 top-[40%] z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
        >
          <HiChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
        >
          {products.map((product) => {
            const typedProduct = product as Product
            const name = productGetters.getName(typedProduct)
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

            return (
              <div
                key={product?.productCode}
                className="flex-shrink-0 w-full md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)] min-w-0 snap-start"
              >
                <div className="relative rounded-3xl shadow-lg border border-gray-100 flex flex-col p-3 my-2 bg-white transition-all duration-100 ease-out  hover:shadow-xl">

                  
                  <div className="relative w-full h-[190px] flex justify-center items-center bg-gray-200 rounded-xl overflow-hidden">

                    {isOnsale && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-[2px] rounded-md font-semibold">
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
                      onClick={() =>
                        handleWishlistToggle(product?.productCode as string)
                      }
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:scale-110 transition"
                    >
                      {wishlist.includes(product?.productCode as string) ? (
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
                        onClick={() => handleAddToCart(typedProduct)}
                        className="flex-1 py-2 px-3 text-sm font-medium bg-orange-500 text-white rounded-3xl hover:bg-orange-600"
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

export default DemoCategoryProductsPage