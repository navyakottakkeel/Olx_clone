import React from "react";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import CategoryNav from "../../components/CategoryNav/CategoryNav";

const Home = () => {
    return (
        <div className="pt-24">
            <CategoryNav />
            <Banner />
            <Categories />
        </div>
    )
}

export default Home;