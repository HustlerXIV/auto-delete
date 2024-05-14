import React from "react";
import "./App.css";
import { data as initialData } from "./utils/data";
import CustomBtn from "./components/common/CustomBtn/CustomBtn";
import { get } from "./middleware/apiService";
import { GroupedByDepartment } from "./utils/user";

const MAINLIST = "Mainlist";
const FRUIT = "Fruit";
const VEGETABLE = "Vegetable";

interface Item {
  type: string;
  name: string;
}

interface TimeoutItem {
  item: Item;
  id: NodeJS.Timeout;
}

function App() {
  const [data, setData] = React.useState<any>(null);
  const [fruitBasket, setFruitBasket] = React.useState<Item[]>([]);
  const [vegetBasket, setVegetBasket] = React.useState<Item[]>([]);
  const [mainList, setMainList] = React.useState<Item[]>(initialData);
  const timeoutsRef = React.useRef<TimeoutItem[]>([]);

  const handleRemove = (item: Item) => {
    clearTimeouts(item);
    if (item.type === FRUIT) {
      setFruitBasket((prevFruit) =>
        prevFruit.filter((f) => f.name !== item.name)
      );
    }
    if (item.type === VEGETABLE) {
      setVegetBasket((prevVeget) =>
        prevVeget.filter((v) => v.name !== item.name)
      );
    }
    setMainList((prevMainList) => {
      const existingItem = prevMainList.find((d) => d === item);
      return existingItem ? prevMainList : [...prevMainList, item];
    });
  };

  const handleAdd = (item: Item) => {
    clearTimeouts(item);
    if (item.type === FRUIT) {
      setFruitBasket((prevFruit) => [...prevFruit, item]);
    }
    if (item.type === VEGETABLE) {
      setVegetBasket((prevVeget) => [...prevVeget, item]);
    }
    setMainList((prevMainList) => prevMainList.filter((d) => d !== item));

    const timeoutId = setTimeout(() => {
      handleRemove(item);
    }, 5000);
    timeoutsRef.current.push({ item, id: timeoutId });
  };

  const clearTimeouts = (item?: Item) => {
    if (item) {
      const index = timeoutsRef.current.findIndex((t) => t.item === item);
      if (index !== -1) {
        clearTimeout(timeoutsRef.current[index].id);
        timeoutsRef.current.splice(index, 1);
      }
    } else {
      timeoutsRef.current.forEach((t) => {
        clearTimeout(t.id);
      });
      timeoutsRef.current = [];
    }
  };

  const renderItems = (items: Item[], catalog: string) => {
    return items.map((item: Item) => (
      <CustomBtn
        key={item?.name}
        text={item?.name}
        onClick={() =>
          catalog === MAINLIST ? handleAdd(item) : handleRemove(item)
        }
      />
    ));
  };

  const renderBasket = (basket: Item[], catalog: string) => {
    return (
      <div className="responsive-container">
        <div className="listed-title">{catalog}</div>
        <div className="listed-box">
          <div className="button-box">{renderItems(basket, catalog)}</div>
        </div>
      </div>
    );
  };

  const fetchUser = async () => {
    try {
      const responseData: any = await get("users");
      const formatedData = GroupedByDepartment(responseData);
      setData(formatedData);
    } catch (error) {
      console.log("Error:", error);
    }

    alert("ดูข้อมูล Users ได้ที่ Console");
  };

  React.useEffect(() => {
    console.log("Users:", data);
  }, [data]);

  return (
    <>
      <div className="button-container">
        <CustomBtn text="Fetch User" onClick={fetchUser} />
      </div>
      <div className="main-container">
        <div className="button-box responsive-container">
          {renderItems(mainList, MAINLIST)}
        </div>
        {renderBasket(fruitBasket, FRUIT)}
        {renderBasket(vegetBasket, VEGETABLE)}
      </div>
    </>
  );
}

export default App;
