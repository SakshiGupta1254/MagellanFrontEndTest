import React from 'react' ;
import SearchSelect from "./components/SearchSelect";
import {Paper,List,ListItemText,ListItem,Divider, Typography} from '@material-ui/core';
import { ChevronRight, ExpandMore, Close as CloseIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    PaperRoot: {
      backgroundColor: "#C1E1C1",
      width:18,
      margin:6,
      padding:5
    },

    filter:{
        height:35,
        padding:20,
        fontWeight:500,
        fontSize:'x-large'
    },
    filtersection:{
        color:'green',
       fontSize:'large',
       float:'right',
        display:"inline-flex"
    },
    selected :{
        backgroundColor: "#DBE6E0 !important",
        height:46
    },
    fade:{
        height:46
    },
    rightPane: {
        flexBasis: "66%",
        backgroundColor:'#fafafa'
      },
      leftPane:{
        width:'30%',
      },
      flexdiv: {
          display: 'flex'
      },
      flexCards:{
          display: 'flex',
          justifyContent:"space-between",
          margin:20,
         
      },
      Chip:{
        left:'15%',
        position:'relative',
        backgroundColor:'green',
        color:'white'
      },
      FadeChip:{
        left:'35%',
        position:'relative',
        backgroundColor:'green',
        color:'white'
      },
      ActiveChip:{
        color:'green',
        left:'35%',
        position:'relative',
      },
      CardUi:{
        width: '32%',
        textAlign:'center',

        boxShadow:"0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important"
      }
    })) 
    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
      }


export default function Location(props) {
    const{locationData, selected, hoverActions, filterLocation, handleFilterLocation} =props;
    const classes = useStyles();
   
  return(<><div className={classes.filter}>
    <SearchSelect
      id="filter"
      label="Filter Location"
      options={locationData}
      field="name"
      change={(val) => handleFilterLocation(val)}
      selectedValue={filterLocation}
      selected={true}
    />
  </div>
  <Divider />
  <List component="nav" aria-labelledby="nestedItem-list-subheader">
  {locationData.map((item, key) => {
    return (
      <>

        <ListItemLink className={selected === item.id ? classes.selected :classes.fade} selected={selected === item.id ? true : false}  key={key} onClick={(e) => hoverActions("enter", item,e)}>
     <ListItemText primary={item.name} />
          {<ChevronRight /> }
          
        </ListItemLink>
        <div>
          <ListItem component="span"  className={selected === item.id ? classes.selected :classes.fade} selected={selected === item.id ? true: false}>
          <Paper square className={classes.PaperRoot} >{item.productCounts.base}</Paper><Typography>Base Products</Typography>
          </ListItem>
          <ListItem component="span" className={selected === item.id ? classes.selected :classes.fade} selected={selected === item.id ? true : false}>
          <Paper square className={classes.PaperRoot} >{item.productCounts.custom}</Paper><Typography>Custom Products</Typography>
          </ListItem>
          <ListItem component="span" className={selected === item.id ? classes.selected :classes.fade} selected={selected === item.id ? true : false}>
          <Paper square className={classes.PaperRoot} >{item.productCounts.sdb}</Paper><Typography>Supplier Direct Blends</Typography>
          </ListItem>
          
          </div>
       
        <Divider /></>)})}
        </List>
        </>)
}  