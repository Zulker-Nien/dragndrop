import { DragDropContext } from "react-beautiful-dnd";
import { useState, useContext, useRef, useEffect } from "react";
import "./Board.scss";
import Column from "./Component/Column";
import Modal from "./Component/Modal";
import Store from "./Store";
import { observer } from "mobx-react-lite";

import emailjs, { send } from "@emailjs/browser";
// import axios from "axios";

const projects = [
  { id: "1", content: "Project 1" },
  { id: "2", content: "Project 2" },
  { id: "3", content: "Project 3" },
  { id: "4", content: "Project 4" },
  { id: "5", content: "Project 5" },
];

const projectStatus = {
  Created: {
    name: "Created",
    items: projects,
  },
  Processed: {
    name: "Processed",
    items: [],
  },
  Finished: {
    name: "Finished",
    items: [],
  },
  All: {
    name: "All",
    items: [],
  },
};

// This is the Basic Auth of the API
// const username = "test-api"
// const password =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6IlpoZ3RSOHpCMU8iLCJhcGlLZXlOYW1lIjoidGVzdC1hcGkxIiwiaWF0IjoxNjQ3NDI2MTAwLCJleHAiOjE2NDgwMzA5MDB9.WHvAqrNBYVMqnRAiqYG0QxpqN076_Vx7VGR0S9371bM";

// const url = "https://www.insidemaps.com/api/v2";

// const authAxios = axios.create({
//   baseURL: url,
//   headers: {
//     auth: {
//       username: username,
//       password: password,
//     },
//   },

// });

const Board = () => {
  const store = useContext(Store);
  const { modal, sendMail, dest, projectItem } = store;
  const form = useRef();
  var templateParams = {
    message: `${projectItem} has been changed to state ${dest}`
};
  const sendEmail = () => {
    emailjs
      .send(
        "service_o0b7a4d",
        "template_td16s95",
        templateParams,
        "iSePaylbdYm0JL5Ty"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  
  const onDragEnd = (result, columns, setColumns) => {

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      
      destItems.splice(destination.index, 0, removed);
      sendMail(destColumn.name,destItems[destItems.length - 1].content)

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
      
      
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  
  // This is the Axios API Connection point
  // const [product, setProduct] = useState(null);

  // const fetchData = useCallback(async () => {
  //   try {
  //     const resul = await authAxios.get('/projects');
  //     setProduct(JSON.stringify(resul.data[0].name));
  //   } catch (err) {
  //     console.log(err.message)
  //   }
  // });

  // useEffect(()=>{
  //   fetchData()
  // })
  
  const [columns, setColumns] = useState(projectStatus);
  console.log(dest)
  console.log(projectItem)

  useEffect(()=>{
    sendEmail()
  },[projectItem])
  return (
    
    <div className="mainContainer">
      <h1>DragNDrop Board</h1>
      <div className="columnContainer">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <>
                <Column columnId={columnId} column={column} key={index} />
              </>
            );
          })}
        </DragDropContext>
      </div>

      {modal && <Modal />}

    </div>
  );
}

export default observer(Board);
