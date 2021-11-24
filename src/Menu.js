import React, { useEffect, useState, createContext } from "react";
import Location from "./Location";
import Product from "./Product";
import { useLocation, Switch, Route, useHistory, Link, NavLink } from "react-router-dom";
import SearchSelect from "./components/SearchSelect";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Chip, Paper, Button, Divider } from '@material-ui/core';
import { ChevronRight, ExpandMore, Close as CloseIcon, ChevronLeft } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

export const RoutesContext = createContext({});


const useStyles = makeStyles((theme) => ({
  PaperRoot: {
    backgroundColor: "#C1E1C1",
    width: 18,
    margin: 6,
    padding: 5
  },

  filter: {
    height: 35,
    padding: 20,
    fontWeight: 500,
    fontSize: 'x-large'
  },
  filtersection: {
    color: 'green',
    fontSize: 'large',
    float: 'right',
    display: "inline-flex"
  },
  selected: {
    backgroundColor: "#DBE6E0 !important",
    height: 46
  },
  fade: {
    height: 46
  },
  mobileflex: {
    display: 'block'
  },
  rightPane: {
    flexBasis: "66%",
    backgroundColor: '#fafafa'
  },
  locationnav:{
color:'green',
width:'100%'
  },
  filterMobile:{
float:'right',
width:'48%'
  },
  leftPane: {
    width: '30%',
  },
  flexdiv: {
    display: 'flex'
  },
  flexCards: {
    display: 'flex',
    justifyContent: "space-between",
    margin: 20,

  },
  Chip: {
    float:'left',
    position: 'relative',
    backgroundColor: 'green',
    color: 'white'
  }
}))
export default function Menu() {
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = useState(1);
  const [filterLocation, setFilterLocation] = useState([]);
  const [locId, setLocationId] = useState(0);
  const [locationData, setLocationData] = useState([]);
  const [filterLocationData, setFilterLocationData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([]);
  const [showfilter, setshowfilter] = useState(false);
  const [productfilterData, setProductfilterData] = useState([]);


  useEffect(
    () => {
      if (locationData.length == 0) { getLocations() }
      if (productData.length == 0) { getProducts() }
    });





  const getLocations = async () => {
    let response = [];
    let error;
    let property;
    try {
      const data = await fetch("http://localhost:3001/locations", {
        method: "GET",
        credentials: "same-origin",
        mode: 'cors',
        SameSite: 'Lax',
        SameOrigin: '',
        headers: {

          Accept: "application/json",

          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",

        },
      }
      );

      if (data.status === 401 && data.statusText === "Unauthorized") {
        return { response: "unAuthorized", error: null };
      }
      if (data.status === 403 && data.statusText === "Forbidden") {
        return { response: "No Access", error: null };
      }
      if (!data.ok) {
        throw new Error(data);
      }
      else {
        response = await data.json();
        if (response) {
          setLocationData(response)
          setFilterLocationData(response);
        };
      }
      return { response, error, property };
    }
    catch (err) {
      error = err;
      return { response, error, property };
    }

  }


  const getProducts = async () => {
    let response;
    let error;
    let property;
    try {
      const data = await fetch("http://localhost:3001/products", {
        method: "GET",
        credentials: "same-origin",
        mode: 'cors',
        SameSite: 'Lax',
        SameOrigin: '',
        headers: {

          Accept: "application/json",

          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",

        },
      }
      );

      if (data.status === 401 && data.statusText === "Unauthorized") {
        return { response: "unAuthorized", error: null };
      }
      if (data.status === 403 && data.statusText === "Forbidden") {
        return { response: "No Access", error: null };
      }
      if (!data.ok) {
        throw new Error(data);
      }
      else {
        response = await data.json();
        setProductData(response);
        setProductfilterData(response.find(o => { return o.locationId == "1"}).products)
      }
      return { response, error, property };
    }
    catch (err) {
      error = err;
      return { response, error, property };
    }
  }

  const handleFilterLocation = (val) => {
    if(val){
    setFilterLocationData(locationData.filter(i => { return i.id === val.id }))
    }
    else{
      setFilterLocationData(locationData)
    }
  }

  const handleProductFilter = (val) => {
    setshowfilter(true);
  }


  const handleFilterProduct = (val) => {
    if(val){
      setProductfilterData(products.filter(i => { return i.name === val.name }))
      //setshowfilter(false);
    }
  }

  const hoverActions = (a, item, e) => {
    setSelected(item.id);
    setProductfilterData(productData.find(o => { return o.locationId === item.id }).products);
    setProducts(productData.find(o => { return o.locationId === item.id }).products);
    history.push({
      pathname: '/locations'
    });
    setLocationId(item.id);
  }

 


  const handleBack = () => {
    history.push({
      pathname: '/'
    });
    setFilterLocationData(locationData);
    setshowfilter(false)
  }

  const clientRoutes = [
    {
      name: "Locations",
      configName: "HOME_PAGE",
      path: "/locations",
      type: "root",
      isMandatory: true,
      component: Product,
    }];
  let matches = useMediaQuery('(min-width:600px)');

  return (<div className={matches ? classes.flexdiv : classes.mobileflex}>


{matches ? <Paper variant="outlined" square className={matches ? classes.leftPane : ""}>
      <nav >
        <RoutesContext.Provider value={{ clientRoutes }}>
          <Location filterLocation={filterLocation} 
          selected={selected} hoverActions={hoverActions} 
          locationData={filterLocationData} 
          handleFilterLocation={handleFilterLocation}/>
        </RoutesContext.Provider> 
      </nav>
    </Paper>:
    
    <Route
                  key={locId}
                  exact
                  path="/"
                  render={props => (
                    <Location filterLocation={filterLocation} 
                    selected={selected} hoverActions={hoverActions}
                     locationData={locationData} 
                     handleFilterLocation={handleFilterLocation}/>
                  )}
                /> }


    <div className={classes.rightPane}>
      {matches ? <div className={classes.filter}>{locationData.map(o => {
        if (o.id == selected) {
          return (<div>{`${o.name} Self Authorizations`}
            <span className={classes.filtersection} onClick={handleProductFilter}>
              {!showfilter ? <span>Filters{<ExpandMore />}</span> : 
              <SearchSelect
                id="filter"
                label="Filter Products"
                options={products}
                field="name"
                change={(val) => handleFilterProduct(val)}
                selectedValue={filterLocation}
                selected={true}
              />}

              <Chip className={classes.Chip} variant="outlined" label={"New Authorizations"}></Chip>
            </span> </div>)
        }

      })}</div> : 
      <div>
        <Button className={classes.Chip} variant="outlined" label={"New Authorizations"}>+ New Authorizations</Button>
        {!showfilter ? 
      <Button className={classes.filterMobile} onClick={handleProductFilter}>Filters{<ChevronRight />}</Button> : 
      <SearchSelect
        id="filter"
        label="Filter Products"
        options={products}
        field="name"
        change={(val) => handleFilterProduct(val)}
        selectedValue={filterLocation}
        selected={true}
      />}
       <span onClick={handleBack} className={classes.locationnav}>{`< Location`}</span>
      </div>}
     
      <div className={matches ? classes.flexCards : ""}>

        <Switch>
          
              <>
                <Route
                  key={locId}
                  exact
                  path="/locations"
                  render={props => (
                    <Product
                      products={productfilterData}
                      selected={selected}

                    />
                  )}
                />
              </>
            );
          )

        </Switch>
      </div>
    </div>
  </div>


  )
}
