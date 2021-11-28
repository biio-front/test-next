import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import axios from 'axios';

import Head from 'next/head';
import styles from '../../styles/Home.module.css';

const SsrDetail: NextPage = ({
  pokemon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const pokemonImage = pokemon?.sprites.front_shiny || '';
  const pokemonName = pokemon?.species.name || '';

  return (
    <div>
      <Head>
        <title>SSR:{pokemonName}</title>
        <meta property='og:title' content={`SSR:${pokemonName}`} />
        <meta property='og:description' content={`The information about ${pokemonName}`} />
        <meta property='og:image' content={pokemonImage} />
      </Head>

      <main className={styles.main}>
        <h2>{pokemonName}</h2>

        <img src={pokemonImage} alt={pokemonName} />

        <p className={styles.description}>
          This is page in
          <code className={styles.code}>pages/ssr/[number].tsx</code>
        </p>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params || {};

  const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.number}`);

  if (!pokemon) {
    return {
      notFound: true,
    };
  }

  return { props: { pokemon: { sprites: pokemon.data.sprites, species: pokemon.data.species } } };
};

export default SsrDetail;
