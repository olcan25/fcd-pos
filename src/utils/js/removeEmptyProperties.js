export const removeEmptyProperties = (array) => {
  array.forEach((item) => {
    for (let key in item) {
      if (item[key] === '' || item[key] === undefined) {
        delete item[key];
      }
    }
  });

  return array.filter((item) => Object.keys(item).length !== 0);
};
