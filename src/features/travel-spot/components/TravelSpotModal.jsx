import { Modal } from "@mui/material";

const TravelSpotModal = ({
  spot,
  open = false,
  handleCloseModal = () => {},
}) => {
  if (!spot) return;
  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div className="rounded-lg gap-4 p-4 flex flex-col h-3/4 w-4/5 absolute top-1/2 left-1/2 md:w-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 dark:bg-blue-950/95">
        <div className="h-1/2 w-full">
          <img
            src={spot.image.url}
            className="w-full h-full object-contain object-center"
          />
        </div>
        <div className="flex flex-col gap-4">
          {/* <div>建立者：{spot.creator.displayName}</div> */}
          <div>標題：{spot.title}</div>
          <div>敘述：{spot.description}</div>
        </div>
      </div>
    </Modal>
  );
};

export default TravelSpotModal;
