// Utility functions for car data processing

export const createCarSlug = (carBrand, carName, carModel) => {
    const brandSlug = carBrand
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim();

    const nameSlug = carName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim();

    const modelSlug = carModel
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim();

    return `${brandSlug}/${nameSlug}/${modelSlug}`;
};

export const findCarBySlug = (carsData, slug) => {
    return carsData.find(car => createCarSlug(car.brand, car.name, car.model) === slug);
};