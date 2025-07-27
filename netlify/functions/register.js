const { MongoClient } = require("mongodb");

// This is where your secret connection string will be accessed
const mongoUri = process.env.MONGODB_URI;

exports.handler = async function(event) {
  // Create a new client inside the handler for each invocation
  const client = new MongoClient(mongoUri);

  try {
    const data = JSON.parse(event.body);

    // Connect to the database
    await client.connect();
    
    // Choose the database and collection
    const collection = client.db("spaceapps").collection("registrations");
    
    // Insert the form data
    await collection.insertOne(data);

    // Send back a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success! Your registration has been saved." })
    };
    
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error saving your registration." })
    };
  } finally {
    // Ensure the connection is closed
    await client.close();
  }
};