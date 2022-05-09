import React from "react";
import Nav from "./components/Nav.js";
import Hero from "./components/Hero.js";
import Card from "./components/Card.js";
import DataArray from "./data.js"

export default function App() {

    const newDataArray = DataArray.map(item => {
        return (
                <Card
                    key={item.id}
                    {...item}
                    // img={item.coverImg}
                    // rating={item.stats.rating}
                    // reviewCount={item.stats.reviewCount}
                    // location={item.location}
                    // title={item.title}
                    // price={item.price}
                    // openSpots={item.openSpots}
                />
        )
    })

    return (
        <div>
            <Nav />
            <Hero />
            <section className="cards-list">
                {newDataArray}
            </section>
            
        </div>
    )
}