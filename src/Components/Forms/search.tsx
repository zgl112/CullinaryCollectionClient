import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';

export interface SearchFormProps {
  handleSearch: (searchKeyword: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ handleSearch }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchKeyword = (event.currentTarget.elements.namedItem(
          'searchKeyword'
        ) as HTMLInputElement).value;
        handleSearch(searchKeyword);
      };

  return (
    <Form onSubmit={handleSubmit} size="tiny">
      <Input name="searchKeyword" placeholder="Search ingredients..." action>
        <input />
        <Button icon="search" color="grey" />
      </Input>
    </Form>
  );
};

export default SearchForm;
