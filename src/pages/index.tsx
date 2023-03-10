import Image from "next/image";
import { GetStaticProps } from "next";
import { HomeContainer, Products } from "../styles/pages/home";
import { stripe } from "../lib/stripe";


import 'keen-slider/keen-slider.min.css'
import {useKeenSlider} from 'keen-slider/react'


import Stripe from "stripe";
import Head from "next/head";
import { Handbag } from "phosphor-react";

interface HomeProps {
  products:{
    id: string, 
    name: string,
    imageUrl: string,
    price: number
  }[]
}

export default function Home({products}: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

    <HomeContainer ref={sliderRef} className='KeenSlider'>
      {products.map(reponse => {
        return(
          <Products 
            href={`/product/${reponse.id}`} 
            key={reponse.id} 
            className="keen-slider__slide"
            prefetch={false}
          >
            <Image src={reponse.imageUrl} alt='' width={520} height={480}/>
            <footer>
              <div>
                <strong>{reponse.name}</strong>
                <span>{reponse.price}</span>
              </div>
              <button>
                <Handbag size={32} weight='bold' />
              </button>
            </footer>
          </Products>
        )
      })}
    </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const reponse = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = reponse.data.map(product => {

    const price = product.default_price as Stripe.Price

    return{
      id: product.id,
      imageUrl: product.images[0],
      name: product.name, 
      price: new Intl.NumberFormat('pt-BR',{
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
    }
  })


  return{
    props: {
      products
    },
    revalidate: 60 * 60 * 2
  }
}