import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";


const Column = (props) => {
  const columnId = props.columnId;
  return (
    <div className="columnWrapper" key={columnId}>
      <h2 style={{textAlign:"center"}}>{props.column.name}</h2>
      <div style={{ margin: 8 }}>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  borderRadius: "4px",
                  boxShadow: "1px 1px 5px #000",
                  background: snapshot.isDraggingOver ? "darkgray" : "lightgray",
                  padding: 4,
                  width: 250,
                  minHeight: 500,
                }}
              >
                {props.column.items.map((item, index) => {
                  // console.log(columnId)
                  return (
                    <Card
                      item={item}
                      index={index}
                      columnId={Droppable}
                      color={columnId}
                      key={index}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
