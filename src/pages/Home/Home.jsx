import React from "react";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import CategoryNav from "../../components/CategoryNav/CategoryNav";
import FreshRecommendations from "../../components/FreshRecommendations/FreshRecommendations";

const Home = () => {
    return (
        <div className="pt-24">
            <CategoryNav />
            <Banner />
            <Categories />
            <FreshRecommendations />
        </div>
    )
}

export default Home;