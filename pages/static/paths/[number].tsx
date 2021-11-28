import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import axios from 'axios';

import Head from 'next/head';
import styles from '../../../styles/Home.module.css';
import { useRouter } from 'next/dist/client/router';

const PathsDetail: NextPage = ({ pokemon }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const pokemonImage = pokemon?.sprites.front_shiny || '';
  const pokemonName = pokemon?.species.name || '';

  return (
    <div>
      <Head>
        <title>SSG: {pokemonName}</title>
        <meta property='og:title' content={`SSG:${pokemonName}`} />
        <meta property='og:description' content={`The information about ${pokemonName}`} />
        <meta property='og:image' content={pokemonImage} />
      </Head>

      <main className={styles.main}>
        <h2>{pokemonName}</h2>

        <img src={pokemonImage} alt={pokemonName} />

        <p className={styles.description}>
          This is page in
          <code className={styles.code}>pages/static/path/[number].tsx</code>
        </p>

        <ul>
          <li>
            The <code className={styles.code}>paths</code> key determines which paths will be
            pre-rendered.
          </li>
          <li>
            The object returned by getStaticPaths must contain a boolean{' '}
            <code className={styles.code}>fallback</code> key.
          </li>
        </ul>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Both have same results
  const numbers = ['1', '2', '3'];
  const paths = numbers.map((number) => ({
    params: { number },
  }));

  // const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=3`);
  // const numbers = res.data?.results || [];

  // const paths = numbers.map((_: any, index: number) => ({
  //   params: { number: (index + 1).toString() },
  // }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params || {};

  const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.number}`);

  if (!pokemon) {
    return {
      notFound: true,
    };
  }

  return { props: { pokemon: { sprites: pokemon.data.sprites, species: pokemon.data.species } } };
};

export default PathsDetail;
