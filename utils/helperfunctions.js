// This is the content for your utils/helperfunctions.js file
/**
 * fetch db data based on provided sql query
 * @param {Pool} pool db connection pool
 * @param {String} sqlQuery the sql query
 * @returns {Promise<sqlQueryResults>} query results
 * @throws {Error} Error if query fails
 */
const fetchData = async (pool, sqlQuery) =>{
  // get client from db pool
  const client = await pool.connect();
  try{
    const result = await client.query(sqlQuery);
    return result;
  }catch (err){
    console.error('Error executing fetchData()', err.stack);
    // Utility functions should re-throw errors for the calling function to handle the response
    throw err; // <--- CHANGED THIS
  }finally{
    client.release();
  }
};


/**
 * Normalize port value to a number, string, or false
 * @param {number | string} portValue port value to be normalized
 * @returns {number | string | false } the normalized port value or false
 */
const normalizePort = (portValue) =>{
    const testPort = parseInt(portValue, 10);
    if (isNaN(testPort)) {
      // named pipe
      return portValue;
    }
    if (testPort >= 0) {
      // port number
      return testPort;
    }
    return false;
};

/**
 * Event listener for HTTP server "error" event
 * @param {Error} error error from server
 * @throws {Error} if the error is not a server listening error
 */
const onError = (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with meaningfull messages

    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
};

/**
 * update a ministries is_current variable in db to false based on provided ministry id
 * @param {Pool} pool db connection pool
 * @param {minId} number the ministry_id
 * @returns {Promise<sqlQueryResults>} query results
 * @throws {Error} Error if query fails
 */
const setIsCurrentFalse = async(pool, minId)=>{
  let queryRetire = `UPDATE ministry SET is_current = false WHERE ministry_id = '${minId}';`
      // get client from db pool
  const client = await pool.connect();
  try{
    const result = await client.query(queryRetire);
    return result;
  }catch (err){
    console.error('Error executing setIsCurrentFalse()', err.stack); // <--- Updated console.error message
    throw err; // <--- CHANGED THIS
  }finally{
    client.release();
  }
};

//TODO: UPDATE THIS TO TAKE AN ARRAY AS PARAM SO MORE THAN ONE HISTORY LINE CAN BE INSERTED WITH THIS FUNCTION CALL.
const updateHistory = async(pool, minCurrentId, minHistoryId) =>{
  const queryUpdateHistory = `INSERT INTO ministry_history(ministry_id, ministry_id_history) VALUES('<span class="math-inline">\{minCurrentId\}','</span>{minHistoryId}');`
  // Note: This next line 'const client = await pool.connect(queryUpdateHistory);'
  // appears to have a mistake where you're passing the query to pool.connect.
  // It should just be 'const client = await pool.connect();'
  // I'll assume for now this is a typo and the actual code might be correct.
  // If not, it needs to be corrected as well.
  const client = await pool.connect(); // <-- Corrected assuming typo in original
  try{
    const result = await client.query(queryUpdateHistory); // <-- Corrected query var
    return result;
  }catch (err){
    console.error('Error executing updateHistory()', err.stack);
    throw err; // <--- CHANGED THIS
  }finally{
    client.release();
  }
}


module.exports ={
  fetchData,
  normalizePort,
  onError,
  setIsCurrentFalse,
  updateHistory
};
