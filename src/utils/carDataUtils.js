import carsData from '../data/cars.json';
import baseModelsData from '../data/baseModels.json';

/**
 * Merges base model data with variant data
 * @param {Object} variant - The car variant object
 * @returns {Object} - Complete car object with base + variant data
 */
export const mergeCarData = (variant) => {
  const baseModel = baseModelsData[variant.carName];
  if (!baseModel) {
    console.warn(`No base model found for: ${variant.carName}`);
    return variant;
  }
  
  return {
    ...baseModel,
    ...variant,
    name: baseModel.name // Ensure name comes from base model
  };
};

/**
 * Returns all cars with merged data (base + variant)
 * @returns {Array} - Array of complete car objects
 */
export const getAllCars = () => {
  return carsData.map(mergeCarData);
};

/**
 * Returns cars data (variants only, not merged)
 * @returns {Array} - Array of car variants
 */
export const getCarsData = () => {
  return carsData;
};

/**
 * Returns base models data
 * @returns {Object} - Object with car names as keys
 */
export const getBaseModels = () => {
  return baseModelsData;
};
