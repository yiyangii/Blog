import Heading from "components/Heading/Heading";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import Button from "../Button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import {AppDispatch, RootState} from "../../store";
import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTopCommunities} from "../../slices/communitySlice";
import {useNavigate} from "react-router-dom";

export interface HeaderFilterProps {
  heading: string;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
                                               heading = "🎈 Latest Articles",
                                             }) => {
  const dispatch : AppDispatch = useDispatch();
  const communities = useSelector((state:RootState) => state.community.communities); // Adjust the state path as needed
  const [tabActive, setTabActive] = useState<string>(communities.length ? communities[0].communityName : '');
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchTopCommunities());
  }, [dispatch]);

  useEffect(() => {
    if (communities.length && !tabActive) {
      setTabActive(communities[0].communityName);
    }
  }, [communities, tabActive]);

  const handleClickTab = (communityName: string) => {
    if (communityName === tabActive) {
      return;
    }
    setTabActive(communityName);
  };

  const handleClick = () => {
    history('/view-all-communities');
  };




  if (!communities.length) return <div>Loading communities...</div>;

  return (
      <div className="flex flex-col mb-8 relative">
        <Heading>{heading}</Heading>
        <div className="flex justify-between">
          <Nav
              className="sm:space-x-2"
              containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
          >
            {communities.map((community, index) => (
                <NavItem
                    key={index}
                    isActive={tabActive === community.communityName}
                    onClick={() => handleClickTab(community.communityName)}
                >
                  {community.communityName}
                </NavItem>
            ))}
          </Nav>
          <Button className="!hidden md:!flex" pattern="white" sizeClass="px-6" onClick={handleClick}>
            <span>View all</span>
            <ArrowRightIcon className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </div>
  );
};

export default HeaderFilter;
