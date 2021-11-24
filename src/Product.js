import React from 'react' ;
import {Card,CardActions,CardContent,
    TextField,Chip,Paper,List,ListItemText,ListItem,Divider, Typography} from '@material-ui/core';
import { ChevronRight, ExpandMore, Close as CloseIcon } from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
      },
      CardUiMobile:{
        textAlign:'center',
        margin:20,
        boxShadow:"0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important"
      }
    })) 
export default function Product(props) {
    const{products} =props;
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');

    return(products && products.map((item, key) => {
        return (<div className={matches? classes.CardUi: classes.CardUiMobile}> <Card >
            <CardContent>
            <Typography sx={{ fontSize: 14, alignText:'center' }} color="text.secondary" gutterBottom>
             {item.name}
            </Typography>
            <Divider/>
            <span>Suppliers</span>
            <Typography variant="h5" component="div">
            {item.suppliers}
            </Typography>
            
            
          </CardContent>
          <CardActions>
            <Chip className={item.active?classes.ActiveChip: classes.FadeChip}  variant="outlined" label={item.active? "Trun Off" : "Turn ON"}></Chip>
          </CardActions>
          </Card>
        </div>  )})
    )  
}