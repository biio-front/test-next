import { NextPage } from 'next';
import { useEffect } from 'react';

import { Button, Form, Spinner } from 'react-bootstrap';

import Table, { Content } from '../components/Table';

import { useGetPokemon } from '../query/pokemon';

import useInput from '../hooks/useInput';
import styles from '../styles/Home.module.css';

type Props = {
  tableContents: Content[];
  setTableContents: Function;
  alias: string;
};

const TableForm: NextPage<Props> = ({ tableContents, setTableContents, alias }) => {
  const input = useInput('');

  const { mutate, data, isLoading, isError, isSuccess } = useGetPokemon();
  const pokemonName = data?.species.name || '';
  const onSubmit = () => mutate({ search: input.value });

  useEffect(() => {
    if (isSuccess) {
      const newContent = {
        number: input.value,
        name: pokemonName,
      };
      const contents = [...tableContents, newContent];
      const parsedContents = JSON.stringify(contents);

      setTableContents(contents);
      localStorage.setItem(`table-${alias}-contents`, parsedContents);
      input.setValue('');
    }
  }, [pokemonName]);

  return (
    <>
      <h2>Lets make dynamic page!</h2>
      <Form
        className={styles.form}
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Form.Control
          value={input.value}
          onChange={input.onChange}
          placeholder='숫자를 입력해주세요.'
          type='number'
        />
        <Button type='submit'>{isLoading ? <Spinner animation='border' /> : '만들기'}</Button>
      </Form>
      <p>The page made here is saved on your browser only.</p>

      <Table tableContents={tableContents} isError={isError} alias={alias} />
    </>
  );
};

export default TableForm;
