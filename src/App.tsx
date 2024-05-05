import React from "react";
import "./App.css";
import { data as initialData } from "./utils/data";
import CustomBtn from "./components/common/CustomBtn/CustomBtn";

const MAINLIST = "Mainlist";
const FRUIT = "Fruit";
const VEGETABLE = "Vegetable";

interface Item {
  type: string;
  name: string;
}

function App() {
  const [fruitBasket, setFruitBasket] = React.useState<Item[]>([]);
  const [vegetBasket, setVegetBasket] = React.useState<Item[]>([]);
  const [mainList, setMainList] = React.useState<Item[]>(initialData);
  let timeoutId: NodeJS.Timeout | null = null;

  const handleRemove = (item: Item) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
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
    if (item.type === FRUIT) {
      setFruitBasket((prevFruit) => [...prevFruit, item]);
    }
    if (item.type === VEGETABLE) {
      setVegetBasket((prevVeget) => [...prevVeget, item]);
    }

    setMainList((prevMainList) => prevMainList.filter((d) => d !== item));

    timeoutId = setTimeout(() => {
      handleRemove(item);
    }, 5000);
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

  return (
    <div className="main-container">
      <div className="button-box responsive-container">
        {renderItems(mainList, MAINLIST)}
      </div>
      {renderBasket(fruitBasket, FRUIT)}
      {renderBasket(vegetBasket, VEGETABLE)}
    </div>
  );
}

export default App;
