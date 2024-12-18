export const formattedPrice = (price: number | undefined): string => {
  if (typeof price !== "number") {
    return "Giá không xác định";
  }
  return price.toLocaleString("vi-VN");
};
