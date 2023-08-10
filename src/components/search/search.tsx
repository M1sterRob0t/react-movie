import { Input } from 'antd';
import { useState } from 'react';

interface ISearch {
  changeHandler: (searchQuery: string) => void;
  searchQuery: string;
}

function Search({ changeHandler, searchQuery }: ISearch) {
  const [value, setValue] = useState(searchQuery);

  return (
    <Input
      value={value}
      placeholder="Type to search..."
      onChange={(evt) => {
        setValue(evt.target.value);
        changeHandler(evt.target.value);
      }}
    />
  );
}

export default Search;
