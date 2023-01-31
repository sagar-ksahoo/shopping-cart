import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/FormatCurrency";
type cartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: cartItemProps) {
  const { removeFromCart } = useShoppingCart();

  const item = storeItems.find((i) => i.id === id);

  if (item === null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item?.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />

      <div className="me-auto">
        <div className="">
          {item?.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".85rem" }}>
          {formatCurrency(item?.price || 0)}
        </div>
      </div>
      <div>{formatCurrency((item?.price || 0) * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item?.id || 0)}
      >
        &times;
      </Button>
    </Stack>
  );
}
