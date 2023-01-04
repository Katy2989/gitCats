export function setDataRefresh(minutes, key) {
  const setTime = new Date(new Date().getTime() + minutes * 600);
  localStorage.setItem(key, setTime);
  console.log({
    setTime
  });
  return setTime;
}

export const printNumeric = (val, title) => {
  val = Math.abs(val);
  if (Number.isInteger(val)) {
    const cases = [2, 0, 1, 1, 1, 2];
    const text = title[val % 100 > 4 && val % 100 < 20 ? 2 : cases[val % 10 < 5 ? val % 10 : 5]];
    return `${text}`;
  }
  return `${title[1]}`;
};


export function rating(rate) {

  const rateElements = [];
  for (let item = 0; item < 10; item++) {
    if (item < rate) {
      rateElements.push('<i class="fa-solid fa-star"></i>');
    } else {
      rateElements.push('<i class="fa-regular fa-star"></i>');
    }
  }
  return "Рейтинг: " + rateElements.join("");
}