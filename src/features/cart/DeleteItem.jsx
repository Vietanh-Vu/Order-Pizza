import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const distpatch = useDispatch();
  return (
    <Button type="small" onClick={() => distpatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
