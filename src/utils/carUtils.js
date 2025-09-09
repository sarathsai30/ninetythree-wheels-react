// Utility functions for car data processing

export const createCarSlug = (carName) => {
  return carName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

export const findCarBySlug = (carsData, slug) => {
  return carsData.find(car => createCarSlug(car.name) === slug);
};