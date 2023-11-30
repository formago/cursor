export const getModifiedName = (
  currencyCode: string,
  currencyName: string,
): string => {
  switch (currencyCode) {
    case 'USD':
      return 'Dolar';
    // Добавьте дополнительные случаи для других валют по необходимости
    default:
      return currencyName.replace(
        currencyName[0],
        currencyName[0].toUpperCase(),
      );
  }
};
