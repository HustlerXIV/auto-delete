import React, { useState, useEffect } from "react";
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
  const [fruitBasket, setFruitBasket] = useState<Item[]>([]);
  const [vegetBasket, setVegetBasket] = useState<Item[]>([]);
  const [mainList, setMainList] = useState<Item[]>(initialData);
  const [removeQueue, setRemoveQueue] = useState<Item[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (removeQueue.length > 0) {
      timer = setTimeout(() => {
        const itemToRemove = removeQueue[0];
        if (itemToRemove.type === FRUIT) {
          setMainList((prevMainList) => [...prevMainList, fruitBasket[0]]);
          setFruitBasket((prevFruit) =>
            prevFruit.filter((f) => f !== itemToRemove)
          );
        }
        if (itemToRemove.type === VEGETABLE) {
          setMainList((prevMainList) => [...prevMainList, vegetBasket[0]]);
          setVegetBasket((prevVeget) =>
            prevVeget.filter((v) => v !== itemToRemove)
          );
        }
        setRemoveQueue((prevQueue) => prevQueue.slice(1));
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [removeQueue, fruitBasket, vegetBasket]);

  const handleAdd = (item: Item) => {
    if (item.type === FRUIT) {
      setFruitBasket((prevFruit) => [...prevFruit, item]);
    }
    if (item.type === VEGETABLE) {
      setVegetBasket((prevVeget) => [...prevVeget, item]);
    }
    setMainList((prevMainList) => prevMainList.filter((d) => d !== item));
    setRemoveQueue((prevQueue) => [...prevQueue, item]);
  };

  const handleRemove = (type: string, item: Item) => {
    setRemoveQueue((prevQueue) => prevQueue.filter((q) => q !== item));
    if (type === FRUIT) {
      setFruitBasket((prevFruit) => prevFruit.filter((f) => f !== item));
    }
    if (type === VEGETABLE) {
      setVegetBasket((prevVeget) => prevVeget.filter((v) => v !== item));
    }
    setMainList((prevMainList) => {
      const originalItem = initialData.find((d) => d === item);
      return originalItem ? [...prevMainList, item] : prevMainList;
    });
  };

  const renderItems = (type: string, items: Item[]) => {
    return items.map((item: Item) => (
      <CustomBtn
        key={item?.name}
        text={item?.name}
        onClick={() =>
          type === MAINLIST ? handleAdd(item) : handleRemove(type, item)
        }
      />
    ));
  };

  const renderBasket = (type: string, basket: Item[]) => {
    return (
      <div className="responsive-container">
        <div className="listed-title">{type}</div>
        <div className="listed-box">
          <div className="button-box">{renderItems(type, basket)}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-container">
      <div className="button-box responsive-container">
        {renderItems(MAINLIST, mainList)}
      </div>
      {renderBasket(FRUIT, fruitBasket)}
      {renderBasket(VEGETABLE, vegetBasket)}
    </div>
  );
}

export default App;
