/**
 * @returns {Object} - returns the content of data.json in a parsed form
 */

export async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/data");
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return error.message;
    }  
}
/** 
* @param {Object} getUpdatedData - expects an object wich will !!REPLACE!! the data.json file content 
*/

export async function changeData(getUpdatedData) {
  try {
    const response = await fetch("http://localhost:3000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getUpdatedData),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}