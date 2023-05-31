export const ColumnSpans: { [cardsInRow: number]: string } = {
  1: 'md:col-span-12',
  2: 'md:col-span-6',
  3: 'md:col-span-4',
  4: 'md:col-span-3',
};

export const getLayoutClasses = (
  totalCards: number,
  currentIndex: number,
  maxCardsPerRow: number
): string => {
  let currentRow = 1; // currentRow will be used for grid display for dynamic column span calculation

  const totalRows = Math.ceil(totalCards / maxCardsPerRow);

  //If total cards are less than max cards per row
  if (totalCards <= maxCardsPerRow) return ColumnSpans[totalCards];
  //If all rows have equal cards
  else if (totalCards % maxCardsPerRow === 0) return ColumnSpans[maxCardsPerRow];
  else {
    // If row is filled with max cards than increase current row
    if (currentIndex > 0 && currentIndex % maxCardsPerRow === 0) currentRow++;

    // If current row is last row
    if (currentRow === totalRows) {
      const startCol = (12 / maxCardsPerRow) * (currentIndex % maxCardsPerRow) + 1;
      return `${ColumnSpans[maxCardsPerRow]} md:col-start-${startCol}`;
    } else {
      return ColumnSpans[maxCardsPerRow];
    }
  }
};
