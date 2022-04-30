import React from 'react';
import { FilterLabel, FilterInput } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { changeFilter } from 'components/redux/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();

  // сохраняем в стейт данные фильтра
  const onChange = event => {
    const { value } = event.currentTarget;
    dispatch(changeFilter(value));
  };
  return (
    <FilterLabel>
      <FilterInput name="filter" type="text" onChange={onChange}></FilterInput>
      Find contacts by name
    </FilterLabel>
  );
};

export default Filter;
