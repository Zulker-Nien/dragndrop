import { useContext,useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import Store from "../Store";
import { observer } from "mobx-react-lite";
import "./card.scss"


const Card = (props) => {

  const columnNumber = props.color;
  const store = useContext(Store);
  const { setModal, setContent } = store;
  const handleClick = () => {
      setModal()
      setContent(props.item.content)
      // sendEmail() Sends Email upon uncommenting
  };
  return (
    <Draggable
      key={props.item.id}
      draggableId={props.item.id}
      index={props.index}
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...provided.isDragging}
            style={{
              userSelect: "none",
              padding: 16,
              margin: "0 0 8px 0",
              minHeight: "100px",
              boxShadow: "1px 1px 3px #000",
              borderRadius: "4px",
              border: snapshot.isDragging
                ? "#263B4A"
                : columnNumber === "Processed"
                ? "4px solid #6B4F4F"
                : columnNumber === "Created"
                ? "4px solid #F0E9D2"
                : columnNumber === "Finished"
                ? "4px solid #678983"
                : columnNumber === "All"
                ? "4px solid #B91646"
                : "lightgray",
              backgroundColor: snapshot.isDragging ? "#B5DEFF" : "white",
              color: "orange",
              ...provided.draggableProps.style,
            }}
          >
            <div className="cardInfoContainer">
              {props.item.content}
            <button onMouseDown={handleClick}>View More</button>
            </div>
            
          </div>
        );
      }}
      
    </Draggable>
  );
};

export default observer(Card);
