import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelectQuantity {
  selected: string | number;
  items: string[] | number[];
  onChange(item: string | number): void;
}

export function SelectQuantity({selected, items, onChange: onChangeProps}: ISelectQuantity) {
  const handleChange = (event: SelectChangeEvent) => {
    onChangeProps(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: '90%' }}>
        <InputLabel id="demo-simple-select-helper-label">Quantidade no estoque ({items.length})</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          onChange={handleChange}
          label={`Quantidade no estoque (${items.length})`}
          value={selected + ""}
        >

          {
            items.map((_, i) => {
              return (
                <MenuItem value={_} key={i}>{_}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}
