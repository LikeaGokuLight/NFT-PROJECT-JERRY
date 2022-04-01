
export const sortByNameAZ = (array) => {
  return array.sort((a, b) => (a.name > b.name ? 1 : -1));
}

export const sortByNameZA = (array) => {
  return array.sort((a, b) => (a.name < b.name ? 1 : -1));
}

export const sortByPriceLowToHigh = (array) => {
  return array.sort((a, b) => (Math.floor(a.avg) > Math.floor(b.avg) ? 1 : -1));
}

export const sortByPriceHighToLow = (array) => {
  return array.sort((a, b) => (Math.floor(a.avg) < Math.floor(b.avg) ? 1 : -1));

}

export const sortByRarityRankLowToHigh = (array) => {
  return array.sort((a, b) => (a.rarity_rank > b.rarity_rank ? 1 : -1));
}

export const sortByRarityRankHighToLow = (array) => {
  return array.sort((a, b) => (a.rarity_rank < b.rarity_rank ? 1 : -1));
}