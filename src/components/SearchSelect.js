/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  outlinedLabel: {
    fontSize: "14px",
    lineHeight: "1.43",
    color: 'green',
    fontWeight: "normal",
    marginTop: -3
  },
  shrink: {
    marginTop: -1,
    fontSize: "0.9rem",
    lineHeight: "1.23",
    letterSpacing: "0.17px",
    color: "#747474",
    fontWeight: "normal"
  },
  focused: {
    marginTop: 0,
    fontSize: "0.9rem",
    lineHeight: "1.23",
    fontWeight: "normal",
    letterSpacing: "0.17px",
    color: "#747474"
  },
  outlinedRoot: {
    height: 48,
    "& fieldset": {
      borderRadius: "3px",
      border: "solid 0.5px rgba(117, 117, 117, 0.5)"
    },
    "&:hover fieldset": {
      borderColor: "solid 0.5px #b0b0b0"
    },
    "&.Mui-focused fieldset": {
      borderColcoloror: "solid 0.5px #b0b0b0"
    }
  },
  listbox: {
    "& ul": {
      padding: 0,
      margin: 0
    }
  },
  searchIcon: {
    color: "#b0b0b0",
    cursor: "pointer",
    marginLeft: 20
  }
}));

export default function SearchSelect(props) {
  const {
    label,
    options,
    field,
    change,
    mandatory,
    selected,
    selectedValue,
    disabled,
    qrLoaded,
    qrValue
  } = props;
  const [value, setValue] = useState(selected ? selectedValue : null);
  const classes = useStyles();

  const labelProps = {
    classes: {
      outlined: classes.outlinedLabel,
      focused: classes.focused,
      shrink: classes.shrink
    }
  };

  const selectionChange = (e, selectedVal) => {
    setValue(selectedVal);
  };

  useEffect(
    () => {
      if (selected) {
        console.log(selectedValue);
        setValue(selectedValue);
      }
    },
    [selectedValue]
  );

  useEffect(
    () => {
     change(value);
    },
    [value]
  );

  useEffect(
    () => {
      //console.log(qrLoaded, qrValue);
      if (qrLoaded) {
        setValue(qrValue);
      } 
    },
    [qrLoaded]
  );

  return (
    <Autocomplete
      id="search-select"
      options={options}
      getOptionLabel={(option) => option[field]} 
      onChange={selectionChange}
      value={value}
      disabled={disabled}
      renderInput={params => (
        <TextField
          fullWidth
          {...params}
          label={
            <div>
              {mandatory ? <span className="star-for-label">*</span> : <span />}
              {label}
            </div>
          }
          className={classes.root}
          variant="outlined"
          InputLabelProps={labelProps}
          InputProps={{
            ...params.InputProps
          }}
        />
      )}
    />
  );
}
