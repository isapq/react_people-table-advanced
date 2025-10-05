import { Person } from '../types';
import { NavLink, useLocation, Link } from 'react-router-dom';

const colunsNames = [
  { name: 'Name' },
  { name: 'Sex' },
  { name: 'Born' },
  { name: 'Died' },
  { name: 'Mother' },
  { name: 'Father' },
];

type PeopleTableProps = {
  peopleData: Person[];
};

export const PeopleTable = ({ peopleData }: PeopleTableProps) => {
  const location = useLocation();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {colunsNames.map(colun => (
            <th key={colun.name}>
              <span className="is-flex is-flex-wrap-nowrap">
                {colun.name}
                {colun.name !== 'Mother' && colun.name !== 'Father' && (
                  <Link to={`#/people?sort=${colun.name.toLocaleLowerCase()}`}>
                    <span className="icon">
                      <i
                        className={`fas ${
                          colun.name === 'Born' ? 'fa-sort-up' : 'fa-sort'
                        }`}
                      />
                    </span>
                  </Link>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {peopleData.map(person => {
          const mother = peopleData.find(p => p.name === person.motherName);
          const father = peopleData.find(p => p.name === person.fatherName);
          const isActive = location.hash.endsWith(person.slug);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={isActive ? 'has-background-warning' : ''}
            >
              <td>
                <NavLink
                  to={`/people/${person.slug}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </NavLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <NavLink
                      to={`/people/${mother.slug}`}
                      className={mother.sex === 'f' ? 'has-text-danger' : ''}
                    >
                      {mother.name}
                    </NavLink>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  father ? (
                    <NavLink to={`/people/${father.slug}`}>
                      {father.name}
                    </NavLink>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
