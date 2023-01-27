// import Image from 'next/image';
import styles from '@/styles/Home.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Main from '@/components/home/main';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';
import FlashDeals from '@/components/home/flashDeals';
import db from '@/utils/db';
import {
  women_dresses,
  women_shoes,
  women_accessories,
  women_swiper,
  gamingSwiper,
  homeImprovSwiper,
} from '@/data/home';
import Category from '@/components/home/category';

import { useMediaQuery } from 'react-responsive';
import ProductsSwiper from '../components/productsSwiper';
import Product from '../models/Product';
import ProductCard from '../components/productCard';
export default function Home({ country, products }) {
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: '(max-width:850px)' });
  const isMobile = useMediaQuery({ query: '(max-width:550px)' });
  console.log(session);
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header='Dresses'
              products={women_dresses}
              background='#5a31f4'
            />
            {!isMedium && (
              <Category
                header='Shoes'
                products={women_shoes}
                background='#3c811f'
              />
            )}
            {isMobile && (
              <Category
                header='Shoes'
                products={women_shoes}
                background='#3c811f'
              />
            )}
            <Category
              header='Accessories'
              products={women_accessories}
              background='#000'
            />
          </div>
          <ProductsSwiper products={women_swiper} />
          <ProductsSwiper
            products={homeImprovSwiper}
            header='House Improvements'
            bg='#2f82ff'
          />
          <ProductsSwiper
            products={gamingSwiper}
            header='For Gamers'
            bg='#3c811f'
          />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  console.log(products);
  let data = await axios
    .get('https://api.ipregistry.co/?key=6oeer6izje10kn27')
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      // country: {
      //   name: data.name,
      //   flag: data.flag.emojitwo,
      // },
      country: {
        name: 'Philippines',
        flag: 'https://www.clipartmax.com/png/middle/73-734242_philippine-flag-png-cliparts-flag-of-the-philippines.png',
      },
    },
  };
}
