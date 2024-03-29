import RestaurantCard from "./ResturantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
    // Local State Variable - Super powerful variable (Hook)
    const [listOfResturants, setListOfResturant] = useState([]);
    
    const [searchText, setSearchText] = useState("");

    // whenever state variable update, react triggers a reconcilation cycle(re-renders the component).
    console.log("Body Rendered");

    // useEffect is a react hooks which takes two arguement a arrow function and second arguement is a dependency array.
    
    useEffect( () => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // this fetch super power is given to us by browser(JS enginer)
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9580044&lng=77.7089009&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();

        // Optional Chaining
        setListOfResturant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };
   

    // Normal JS Variable
    // let listOfResturants = resList;
    return listOfResturants.length === 0 ? <Shimmer/> : (
        <div className="body">
            <div className="filter">
            <div className="search">
                <input type="text" className="search-box" value={searchText} onChange={ (e) => {
                    setSearchText(e.target.value);
                }}/>
                <button onClick={ () => {
                    // Filter the resturant cards and update the UI
                    // search Text
                    console.log(searchText);

                    const filteredList = listOfResturants.filter(res =>
                        res.info.name.toLowerCase().includes(searchText.toLowerCase()));

                    // const filteredResturant = listOfResturants.filter( (res) => res.info.name.includes(searchText));
                    
                    console.log(filteredList);

                    setListOfResturant(filteredList);


                }}>Search</button>
            </div>
                <button className="filter-btn" onClick={ () => {
                    // filter logic here using Stata Hook.
                    
                    const filteredListofResturant = listOfResturants.filter(
                        (res) => parseFloat(res.info.avgRatingString) >= 4.5
                    );
                    setListOfResturant(filteredListofResturant);
                    console.log(listOfResturants);
                }} >
                    Top Rated Resturant
                </button>
            </div>
            <div className="resturant-container">
                {listOfResturants.map(resturant => 
                <RestaurantCard key={resturant.info} resturantData={resturant}
                />)}
            </div>
        </div>
    );
};

export default Body;