import React from "react";
import Banner from "../../components/Banner/Banner";
import CategoryNav from "../../components/CategoryNav/CategoryNav";

const Home = () => {
    return (
        <div className="pt-24">
            <CategoryNav />
            <Banner />
        </div>
    )
}

export default Home;