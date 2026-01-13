
import CategoryCard from "./DashBoardhome/CategoryCard";
import DashboardSummaryCards from "./DashBoardhome/DashboardSummaryCards";
import DashboardSummaryPie from "./DashBoardhome/DashboardSummaryPie";

const DashHomeLayout = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 ">
            
            <div className="col-span-12 mb-10">
                <DashboardSummaryCards />
            </div>

            <div className="col-span-8">
                <CategoryCard />
            </div>
            <div className="col-span-4 place-items-center">
                <DashboardSummaryPie />
            </div>

        </div>
    )
};

export default DashHomeLayout;
