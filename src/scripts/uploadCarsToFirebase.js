import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import carsData from '../data/cars.json';

const COLLECTION_NAME = 'cars';

// Function to upload cars to Firebase
async function uploadCars() {
  try {
    console.log('Starting to upload cars to Firebase...');
    console.log(`Total cars to upload: ${carsData.length}`);

    // Check if collection already has data
    const existingCars = await getDocs(collection(db, COLLECTION_NAME));
    if (existingCars.size > 0) {
      console.log(`Warning: Collection already has ${existingCars.size} documents.`);
      console.log('This will add duplicate data. Please clear the collection first if needed.');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    // Upload each car
    for (const car of carsData) {
      try {
        // Use the car's id from JSON as the document ID
        await addDoc(collection(db, COLLECTION_NAME), {
          ...car,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        successCount++;
        
        if (successCount % 100 === 0) {
          console.log(`Uploaded ${successCount} cars...`);
        }
      } catch (error) {
        console.error(`Error uploading car ${car.id}:`, error);
        errorCount++;
      }
    }

    console.log('\n=== Upload Complete ===');
    console.log(`Successfully uploaded: ${successCount} cars`);
    console.log(`Failed: ${errorCount} cars`);
    console.log('=======================\n');

  } catch (error) {
    console.error('Error in upload process:', error);
  }
}

// Run the upload
uploadCars();
