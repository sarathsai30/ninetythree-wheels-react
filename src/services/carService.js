import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'cars';

export const carService = {
  // Get all cars
  async getCars() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  },

  // Get cars by brand
  async getCarsByBrand(brand) {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('brand', '==', brand));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching cars by brand:', error);
      throw error;
    }
  },

  // Get unique brands
  async getBrands() {
    try {
      const cars = await this.getCars();
      const brands = [...new Set(cars.map(car => car.brand))];
      return brands.sort();
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  },

  // Find car by brand and name slug
  async findCarBySlug(brandSlug, nameSlug) {
    try {
      const cars = await this.getCars();
      return cars.find(car => {
        const carBrandSlug = car.brand
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        const carNameSlug = car.name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        return `${carBrandSlug}/${carNameSlug}` === `${brandSlug}/${nameSlug}`;
      });
    } catch (error) {
      console.error('Error finding car by slug:', error);
      throw error;
    }
  }
};
