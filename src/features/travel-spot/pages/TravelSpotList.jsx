"use client";

import { TravelSpotModal } from "@/features/travel-spot/components";
import TravelSpotService from "@/services/TravelSpotService";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

const TravelSpotList = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSpot, setCurrentSpot] = useState(null);
  const [isOpenSpotModal, setIsOpenSpotModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const cols = isMobile ? 2 : 3;
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const travelSpots = await TravelSpotService.getAllTravelSpots();
        setSpots(travelSpots);
        console.log(travelSpots);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  const handleClickSpot = (spot) => {
    setCurrentSpot(spot);
    setIsOpenSpotModal(!isOpenSpotModal);
  };

  return (
    <div className="p-2">
      <ImageList variant="masonry" cols={cols} gap={8}>
        {spots.map((spot) => (
          <ImageListItem
            key={spot.createdAt}
            onClick={() => handleClickSpot(spot)}
            className="cursor-pointer inset-0 hover:inset-1 transition-all duration-200 ease-in-out"
          >
            <img
              srcSet={`${spot.image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${spot.image.url}?w=248&fit=crop&auto=format`}
              alt={spot.title}
              loading="lazy"
            />
            <ImageListItemBar position="below" title={spot.title} />
          </ImageListItem>
        ))}
      </ImageList>
      <TravelSpotModal
        spot={currentSpot}
        open={isOpenSpotModal}
        handleCloseModal={() => setIsOpenSpotModal(false)}
      />
    </div>
  );
};

export default TravelSpotList;
