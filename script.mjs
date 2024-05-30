// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.mjs";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };
    try {
      // Get which database contains the user info
      const dbKey = await central(id);
  
      // Fetch basic information from the identified database
      const basicInfo = await dbs[dbKey](id);
  
      // Fetch personal information from the vault
      const personalInfo = await vault(id);
  
      // Combine the data into a single object
      const userInfo = {
        id: id,
        name: personalInfo.name,
        username: basicInfo.username,
        email: personalInfo.email,
        address: personalInfo.address,
        phone: personalInfo.phone,
        website: basicInfo.website,
        company: basicInfo.company
      };
  
      return userInfo;
    } catch (error) {
      // Handle errors and indicate which database failed
      return Promise.reject(`Error accessing database: ${error.message}`);
    }
  
}