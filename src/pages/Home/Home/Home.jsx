import React from 'react';
import Banner from '../Banner/Banner';
import PopularContests from '../PopularContests/PopularContests';
import WinnerAdvertisement from '../WinnerAdvertisement/WinnerAdvertisement';
import ExtraSection from './ExtraSection/ExtraSection';
import Highlights from '../../../Components/Highlights';
import Stats from '../../../Components/Stats';
import Categories from '../../../Components/Categories';
import HowItWorks from '../../../Components/HowItWorks';
import Leaderboard from '../../../Components/Leaderboard';
import Testimonials from '../../../Components/Testimonials';
import Blogs from '../../../Components/Blogs';
import FAQ from '../../../Components/FAQ';
import Newsletter from '../../../Components/Newsletter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularContests></PopularContests>
            <WinnerAdvertisement></WinnerAdvertisement>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <Highlights />
                <Stats />
                <Categories />

                <Leaderboard />
                <Testimonials />
                <Blogs />
                <FAQ />
                <Newsletter />
                <ExtraSection></ExtraSection>
            </div>
        </div>
    );
};

export default Home;