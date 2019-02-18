const parsePerson = (person) => {
  const splitPersonUrl = person.url.split('/');
  const id = splitPersonUrl[splitPersonUrl.length - 2];
  return {
    ...person,
    id
  };
};

const parsePersonList = (persons) => {
  return persons.map(person => parsePerson(person));
};

export default parsePersonList;
