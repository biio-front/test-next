import { NextPage } from 'next';
import { Table as BootstrappedTable } from 'react-bootstrap';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export type Content = { number: string; name: string };

type Props = {
  tableContents: Content[];
  alias: string;
  isError?: boolean;
};

const Table: NextPage<Props> = ({ tableContents, alias, isError = false }) => {
  return (
    <>
      {tableContents.length !== 0 && (
        <BootstrappedTable striped className={styles.table}>
          <thead>
            <tr>
              <th>number</th>
              <th>title</th>
              <th>link</th>
            </tr>
          </thead>
          <tbody>
            {tableContents.map((content: Content, index) => (
              <tr key={`${content.number}-${index}`}>
                <td>{content.number}</td>
                <td>{content.name}</td>
                <td>
                  <Link href={`/static/${alias}/${content.number}`}>
                    <a>Go to the page</a>
                  </Link>
                </td>
              </tr>
            ))}

            {isError && (
              <tr>
                <td colSpan={100}>😵‍💫 Error occurred</td>
              </tr>
            )}
          </tbody>
        </BootstrappedTable>
      )}
    </>
  );
};

export default Table;
