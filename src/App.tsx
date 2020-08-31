import React from "react";
import "./App.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

/* Use with network by React*/

interface food {
  id: number;
  food_name: string;
  price: number;
}

function App() {
  const [foods, setFoods] = React.useState([]);
  React.useEffect(() => {
    fetch("https://5f4c778eea007b0016b1e0de.mockapi.io/api/v1/foods")
      .then((response) => response.json())
      .then((response) => setFoods(response))
      .catch((error) => console.log(error));
  }, []);

  const onAdd = () => {
    const item = {
      id: 20,
      food_name: "Thịt Heo",
      price: 20000,
    };

    fetch("https://5f4c778eea007b0016b1e0de.mockapi.io/api/v1/foods", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (response.status === 201 && response.ok === true) {
          let temp: any = [...foods, item];
          setFoods(temp);
        }
      })
      .catch((error) => alert(error));
  };

  const onUpdate = (item: food) => {
    fetch(
      `https://5f4c778eea007b0016b1e0de.mockapi.io/api/v1/foods/${item?.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          food_name: "Chicken meet",
          price: 175000,
        }),
      },
    )
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.ok === true) {
          const temp: any = [...foods];
          const index: number = temp.indexOf(item);
          temp.splice(index, 1, {
            id: item.id,
            food_name: "Chicken meet",
            price: 175000,
          });
          setFoods(temp);
        }
      })
      .catch((error) => alert(error));
  };

  const onDelete = (idItem: number) => {
    fetch(
      `https://5f4c778eea007b0016b1e0de.mockapi.io/api/v1/foods/${idItem}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.ok === true) {
          const temp: any = foods.filter((item: food) => item?.id !== idItem);
          setFoods(temp);
          console.log("update Success");
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <Table responsive variant="dark">
      <thead>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Price</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {foods.map((item, index) => {
          const { id, food_name, price } = item;
          return (
            <tr key={index}>
              <td>{id}</td>
              <td>{food_name}</td>
              <td>{price}</td>
              <td>
                <Button
                  onClick={() => onUpdate(item)}
                  style={{ marginRight: 6 }}
                >
                  Update
                </Button>
                <Button onClick={() => onDelete(id)}>Remove</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <Button onClick={onAdd}>Add</Button>
    </Table>
  );
}

export default App;
